import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/apiUrl.config";

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
import { Button } from "@/components/ui/button";

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
    // console.log("url", `${API_URL}/${user._id}?page=${page}&limit=${limit}`);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/collection/${user._id}?page=${page}&limit=${limit}`
      );
      if (!response.data.images) {
        return setUserCollection(null);
      }
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
      // console.log("response", response.data);
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
    getUserCollection(20);
  }, [page]);

  if (!userCollection) {
    return (
      <div className="min-h-screen">
        <h1 className="text-3xl p-7 font-semibold uppercase">My Collection</h1>
        <div className="flex flex-col h-1/5 justify-center items-center">
          <h2 className="text-2xl p-5">It's empty here 🥺...</h2>
          <p>It seems that you have no image in your collection</p>
          <Button className="m-8">Add images to my collection</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-svh">
        <div className="min-h-svh ">
          <h1 className="text-3xl p-7 font-semibold uppercase text-center">
            My Collection
          </h1>

          <div className="w-full h-full">
            <div className="max-w-screen-md md:min-h-[75vh] mx-auto">
              <Gallery
                images={isLoading ? hashCollection : userCollection}
                onClick={handleImageClick}

                // rowHeight={}
              />
            </div>
            {/* PAGINATION */}
            <div className=" w-full bottom-14">
              <div className="flex justify-center items-center pb-14 ">
                {totalPages > 1 && (
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

                      {/* Case: totalPages <= 4 */}
                      {totalPages <= 4 && (
                        <>
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                              <PaginationItem key={pageNumber}>
                                <PaginationLink
                                  href="#"
                                  onClick={() => handlePageChange(pageNumber)}
                                  isActive={page === pageNumber}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                        </>
                      )}

                      {/* Case: totalPages > 4 and page <= 3 */}
                      {totalPages > 4 && page <= 3 && (
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

                      {/* Case: totalPages > 4 and page in the middle */}
                      {totalPages > 4 && page > 3 && page < totalPages - 2 && (
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

                      {/* Case: totalPages > 4 and page near the end */}
                      {totalPages > 4 && page >= totalPages - 2 && (
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
                          disabled={page === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyCollection;
