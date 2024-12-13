import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { Gallery } from "react-grid-gallery";
import { useNavigate } from "react-router-dom";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [userCollection, setUserCollection] = useState([]);
  const [page, setPage] = useState(1);
  const nav = useNavigate();

  console.log(user);
  //Functions
  //Call to the server to get the user collection
  const getUserCollection = async (limit) => {
    console.log("url", `${API_URL}/${user._id}?page=${page}&limit=${limit}`);
    try {
      const response = await axios.get(
        `${API_URL}/collection/${user._id}?page=${page}&limit=${limit}`
      );
      setUserCollection(
        response.data.images.map((image) => ({
          src: image.imageId.photo_image_url,
          width: image.imageId.photo_width,
          height: image.imageId.photo_height,
          id: image.imageId._id,
        }))
      );
      console.log("response", response.data.images);
    } catch (error) {
      console.log("did not manage to get the user's collection", error);
    }
  };

  //Redirect the user to the image page
  const handleImageClick = (index) => {
    const imgId = userCollection[index].id;
    nav(`/for-frodo/${imgId}`);
  };

  useEffect(() => {
    getUserCollection(10);
  }, [page]);

  if (!userCollection) {
    return (
      <div>
        <h1 className="text-3xl p-7 font-semibold uppercase">My Collection</h1>
        <p>add images to your collection</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-3xl p-7 font-semibold uppercase">My Collection</h1>
        <Gallery images={userCollection} onClick={handleImageClick} />
      </div>
    );
  }
};

export default MyCollection;
