import axios from "axios";
import { API_URL } from "../../../config";
import React from "react";
import { useEffect, useState, useRef, useMemo, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import TinderCard from "react-tinder-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ShufflePage = ({ addImageToCollection, deleteImageToCollection }) => {
  //Setters
  //user infos for api requests
  const { user } = useContext(AuthContext);
  const [imageSample, setImageSample] = useState([]);
  //storing images sent to collection
  const [addedImages, setAddedImages] = useState([]);
  const [myLoading, setMyLoading] = useState(true);
  // console.log("addedImages", addedImages);
  //------- Tinder Card Set up -----------------//
  const [currentIndex, setCurrentIndex] = useState(imageSample.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      //set to 10 as the imageSample should be
      Array(10)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < imageSample.length - 1;
  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    // console.log("swipe", { canSwipe, currentIndex, imageSample });
    if (canSwipe && currentIndex < imageSample.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
    //Adding card to the collection
    if (dir === "right") {
      console.log(
        "add image to users collection",
        imageSample[currentIndex]._id
      );
      addImageToCollection(imageSample[currentIndex]._id);
      console.log({
        userId: user._id,
        imageId: imageSample[currentIndex]._id,
      });

      addedImages.push(imageSample[currentIndex]._id);
    }
  };

  const goBack = async () => {
    console.log("back");
    if (!canGoBack) return;
    const imageToRemove = imageSample[currentIndex + 1]._id;

    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();

    //Remove the image from the collection
    console.log(
      "image to remove",
      imageToRemove,
      "-----to remove from Array----",
      addedImages
    );
    if (canGoBack && addedImages.includes(imageToRemove)) {
      console.log({
        userId: user._id,
        imageId: imageToRemove,
      });
      deleteImageToCollection(imageToRemove);
      addedImages.splice(
        addedImages.findIndex((image) => image === imageToRemove),
        1
      );
      console.log(
        "image has been removed from collection. Here is the new array : ",
        addedImages
      );
    }
  };
  //------- END OF - Tinder Card Set up - END OF ------------------//

  //Getting 10 random images
  //Hooks
  useEffect(() => {
    const getImageSample = async () => {
      try {
        setAddedImages([]);
        // console.log(myLoading);
        // Calling for 10 images
        const response = await axios.get(`${API_URL}/image/random`);
        console.log("image sample =", response.data);
        setImageSample(response.data);
        // update the CurrentIndex for the Tinder card
        updateCurrentIndex(response.data.length - 1);
        // update the loading state to display the cards
        setMyLoading(false);
      } catch (error) {
        console.log("Error getting image sample:", error);
      }
    };
    getImageSample();
  }, []);

  //if the cards are not loaded in imageSample
  if (myLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex  flex-col justify-center items-center">
      <h1 className="text-3xl p-7 font-semibold uppercase">
        Curate Your World
      </h1>

      <h3 className="text-center text-base w-3/5">
        Discover Your Next Favorite Artwork! 🎨 Swipe right to add stunning
        creations to your collection or left to pass. Let your taste shape your
        unique gallery!"
      </h3>
      {/* Loding container */}
      {(myLoading || imageSample.length < 10) && (
        <h3 className="text-center text-base w-3/5">Loading...</h3>
      )}
      {/* SwapContainer */}
      {/* Wait for loading image is finished */}
      {!myLoading && imageSample.length === 10 && (
        <div className="flex flex-col">
          <div className=" m-9 w-[90vw] max-w-[260px] h-[300px] flex flex-col items-center">
            {imageSample &&
              imageSample.map((image, index) => {
                return (
                  <TinderCard
                    ref={childRefs[index]}
                    className=" absolute"
                    key={image._id}
                    onSwipe={(dir) => swiped(dir, image._id, index)}
                    onCardLeftScreen={() => outOfFrame(image._id, index)}
                  >
                    <Card className="relative w-[80vw] max-w-[300px] h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden">
                      <img
                        src={image.photo_image_url}
                        alt="Card image"
                        className="w-full h-full object-cover"
                      />
                    </Card>
                  </TinderCard>
                );
              })}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Button className="w-24" onClick={() => swipe("left")}>
                Ouuuh
              </Button>
            </div>
            <div>
              <Button onClick={() => goBack()}>Undo</Button>
            </div>
            <div>
              <Button className="" onClick={() => swipe("right")}>
                Love it!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShufflePage;
