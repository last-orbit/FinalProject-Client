import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { format, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@/config/apiUrl.config";
import { decode } from "blurhash";
//Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus, CircleMinus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeedBlock = ({
  post,
  addImageToCollection,
  deleteImageToCollection,
  isLoading,
  setIsLoading,
}) => {
  const { user } = useContext(AuthContext);
  const [isInCollection, setIsInCollection] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState([]);

  const [open, setOpen] = React.useState(false);

  //Functions

  //Check if is in collection
  const checkIfInCollection = async () => {
    // const body = { data: { userId: user._id, imageId: imageId } };
    try {
      const { data } = await axios.get(`${API_URL}/collection/isincollection`, {
        params: { userId: user._id, imageId: post.imageId._id },
      });
      //   console.log(data);
      setIsInCollection(data.isInCollection);
    } catch (error) {
      console.log(error);
    }
  };

  //Decoding BlurHash to URL data
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

  //Get the 3 last comments for this post
  const getComments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/comment/${post.imageId._id}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.log("Din't mange to get the comments", error);
    }
  };

  //Send a comment
  const handleSubmitComment = async () => {
    if (newComment) {
      const newCommentData = {
        user_id: user._id,
        comment: newComment,
        image_id: post.imageId._id,
      };

      try {
        const { data } = await axios.post(
          `${API_URL}/comment/create`,
          newCommentData
        );
        const addedComment = data;
        console.log("added Comment ", addedComment);
        setNewComment(""); // Clears the text area
      } catch (error) {
        console.log("failed to get comments", error);
      }
    }
  };

  useEffect(() => {
    checkIfInCollection();
    getComments();
  }, []);

  return (
    <div className="md:max-w-xl mx-auto">
      <Card className="m-2">
        <CardHeader className="pb-3 pt-3">
          <Link to={`/a-boromir-to-trust/${post.userId._id}`}>
            <CardTitle className="flex items-center">
              <Avatar>
                <AvatarImage
                  className=""
                  src={post.userId.image}
                  alt={post.userId.username}
                />
                <AvatarFallback>??</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center items-start ml-2">
                <h2 className="text-l ">{post.userId.username} </h2>
                <p className="text-xs font-thin">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </CardTitle>
          </Link>
        </CardHeader>
        <Link to={`/for-frodo/${post.imageId._id}`}>
          <CardContent>
            <img
              className=" inset-0 w-full h-full object-cover rounded-2xl"
              onLoad={() => setIsLoading(false)}
              src={
                isLoading
                  ? decodeBlurHashImage(post.imageId.blur_hash)
                  : post.imageId.photo_image_url
              }
              alt={post.imageId.ai_description}
            />
          </CardContent>
        </Link>
        <CardFooter>
          <Button
            onClick={() => {
              isInCollection
                ? (deleteImageToCollection(post.imageId._id),
                  setIsInCollection(false))
                : (addImageToCollection(post.imageId._id),
                  setIsInCollection(true));
            }}
            variant={isInCollection ? "secondary" : "default"}
          >
            {isInCollection ? <CircleMinus /> : <CirclePlus />}
            {isInCollection ? " Remove from collection" : "Add to collection"}
          </Button>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button className="ml-2">See Comments</Button>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col mx-2 p-4 h-2/3">
              <DrawerHeader>
                <DrawerTitle>See Comments</DrawerTitle>
                <DrawerDescription>
                  See what others think about this image...
                </DrawerDescription>
              </DrawerHeader>

              <div className="flex flex-col flex-grow">
                <hr className="my-4" />
                <Tabs
                  defaultValue="comments"
                  className="flex flex-col flex-grow"
                >
                  <TabsList className="mb-4">
                    <TabsTrigger value="comments">See Comments</TabsTrigger>
                    <TabsTrigger value="send">Send a Comment</TabsTrigger>
                  </TabsList>

                  {/* "See Comments" */}
                  <TabsContent
                    value="comments"
                    className="h-[calc(70%)] flex flex-col flex-grow"
                  >
                    <div className="flex-grow overflow-y-auto">
                      {comments &&
                        comments.map((comment) => (
                          <Card key={comment._id} className="my-2">
                            <div className="flex items-center m-4">
                              <Avatar>
                                <AvatarImage
                                  src={comment.user_id.image}
                                  alt={comment.user_id.username}
                                />
                                <AvatarFallback>??</AvatarFallback>
                              </Avatar>
                              <h2 className="text-l font-semibold ml-2">
                                {comment.user_id.username}{" "}
                                <span className="text-xs font-thin">
                                  {formatDistanceToNow(
                                    new Date(comment.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </span>
                              </h2>
                            </div>
                            <p className="m-4">{comment.comment}</p>
                          </Card>
                        ))}
                    </div>
                    <Button className="my-4" onClick={() => setOpen(false)}>
                      Close
                    </Button>
                  </TabsContent>
                  {/* "Send a Comment" */}
                  <TabsContent
                    value="send"
                    className=" h-full flex flex-col flex-grow"
                  >
                    <p>Sharing is giving...</p>
                    <form
                      className="h-[calc(100%)] flex flex-col flex-grow"
                      onSubmit={handleSubmitComment}
                    >
                      <Textarea
                        className="h-80 flex-grow resize-none mt-2"
                        id="comment"
                        placeholder="Don't troll, send nice things ❤️"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <div className="mt-4 flex justify-between">
                        <Button className="w-full md:w-48">Send Comment</Button>
                        <Button
                          className="hidden md:block"
                          onClick={() => setOpen(false)}
                        >
                          Close
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeedBlock;
