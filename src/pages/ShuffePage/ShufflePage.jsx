import axios from "axios";
import { API_URL } from "../../../config";
import React from "react";
import { useEffect, useState, useRef, useMemo } from "react";

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
const ShufflePage = () => {
  //Setters
  const [imageSample, setImageSample] = useState([]);
  const [loading, setLoading] = useState(false);

  //------- Tinder Card Set up -----------------//
  const [currentIndex, setCurrentIndex] = useState(imageSample.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(imageSample.length)
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
    console.log("swipe");
    if (canSwipe && currentIndex < imageSample.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const goBack = async () => {
    console.log("back");
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };
  //------- END OF - Tinder Card Set up - END OF ------------------//

  //Getting 10 random images

  //Hooks
  useEffect(() => {
    const getImageSample = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/image/random`);
        console.log("image sample =", response.data);
        setImageSample(response.data);
      } catch (error) {
        console.log("Error getting image sample:", error);
      } finally {
        setLoading(false);
      }
    };
    getImageSample();
  }, []);

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
      {/* SwapContainer */}
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
    </div>
  );
};

export default ShufflePage;
