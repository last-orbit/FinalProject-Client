import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { Gallery } from "react-grid-gallery";
import { useNavigate } from "react-router-dom";
import { decode } from "blurhash";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userCollection, setUserCollection] = useState([]);
  const [hashCollection, setHashCollection] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const nav = useNavigate();

  // console.log(user);
  //Functions
  //Call to the server to get the user collection
  const getUserCollection = async (limit) => {
    console.log("url", `${API_URL}/${user._id}?page=${page}&limit=${limit}`);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/collection/${user._id}?page=${page}&limit=${limit}`
      );
      setTotalPage(response.data.totalPages);
      setHashCollection(
        response.data.images.map((image) => ({
          src: decodeBlurHashImage(image.imageId.blur_hash),
          width: image.imageId.photo_width,
          height: image.imageId.photo_height,
          id: image.imageId._id,
        }))
      );
      setUserCollection(
        response.data.images.map((image) => ({
          src: `${image.imageId.photo_image_url}?q=30`,
          width: image.imageId.photo_width,
          height: image.imageId.photo_height,
          id: image.imageId._id,
        }))
      );
      setIsLoading(false);
      console.log("response", response.data);
    } catch (error) {
      console.log("did not manage to get the user's collection", error);
    }
  };

  //decoding BlurHash to URL data
  const decodeBlurHashImage = (blurHash, width = 32, height = 32) => {
    const pixels = decode(blurHash, width, height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  };

  //Redirect the user to the image page
  const handleImageClick = (index) => {
    const imgId = userCollection[index].id;
    nav(`/for-frodo/${imgId}`);
  };

  //Move to the previous/next page of the collection
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  // //Display the page index in the pagination depending on the current page desplayed
  // const handlePageIndex = () => {
  //   if (page === 1) {
  //     previousPage = Number(page);
  //   } else if (page === totalPages) {
  //     previousPage = Number(totalPages) - 2;
  //   } else {
  //     previousPage = Number(page) - 1;
  //   }
  // };

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
        <div className="min-h-screen">
          <h1 className="text-3xl p-7 font-semibold uppercase text-center">
            My Collection
          </h1>
          <div className="w-full">
            <div className="max-w-screen-md md:min-h-[75vh] mx-auto">
              <Gallery
                images={isLoading ? hashCollection : userCollection}
                onClick={handleImageClick}
                rowHeight={window.innerWidth >= 768 ? 250 : 180}
              />
            </div>
          </div>
          {/* PAGINATION  */}
          <div className=" m-3 pb-14">
            <Pagination>
              <PaginationContent>
                {/* Previous button */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  />
                </PaginationItem>

                {/* Display page 1 to 3 */}
                {page <= 3 && (
                  <>
                    {[1, 2, 3].map((pageNumber) => (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={() => handlePageChange(pageNumber)}
                          isActive={page === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                {/* Display pages > 3 to < totalPages - 2  */}
                {page > 3 && page < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(page - 1)}
                      >
                        {page - 1}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                {/* Display last pages */}
                {page > totalPages - 3 && page <= totalPages && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    {[totalPages - 2, totalPages - 1, totalPages].map(
                      (pageNumber) => (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            onClick={() => handlePageChange(pageNumber)}
                            isActive={page === pageNumber}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                  </>
                )}

                {/* Next button */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages} // Désactiver si on est déjà sur la dernière page
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    );
  }
};

export default MyCollection;
