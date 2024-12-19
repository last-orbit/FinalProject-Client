import React, { useEffect, useState } from "react";

import axios from "axios";
import { API_URL } from "../../config/apiUrl.config";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Blurhash } from "react-blurhash";
import { format, formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CirclePlus,
  CircleMinus,
  CircleX,
  SendHorizontal,
  ChevronsUpDown,
  House,
} from "lucide-react";

const ImagePage = ({ deleteImageToCollection, addImageToCollection }) => {
  const { user } = useContext(AuthContext);
  const { imageId } = useParams();
  /******************* States **************/
  // grabs the image
  const [currentImage, setCurrentImage] = useState(null);
  // grabs the comments
  const [comments, setComments] = useState([]);
  // Edits the comment
  const [editComment, setEditComment] = useState('');
  // For New Comments
  const [newComment, setNewComment] = useState('');
  // For Loading Comments
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  // Loader for Images
  const [myLoading, setMyLoading] = useState(true);
  // Checks if Image is in Collection
  const [isInCollection, setIsInCollection] = useState(false);
  //gets user image for avatar
  const [userImage, setUserImage] = useState(null);
  //checks if collection has likes
  const [imageHasLikes, setImageHasLikes] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  /******************* Functions **************/
  const getLikes = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/collection/likes/${imageId}`
      );
      setImageHasLikes(data);
      // console.log(data);
    } catch (error) {
      console.log('did not find other users', error);
    }
  };

  const visibleLikes = imageHasLikes.slice(0, 5);
  const hiddenLikes = imageHasLikes.slice(5);

  //gets the image by id
  const getImage = async () => {
    try {
      setMyLoading(true);
      const response = await axios.get(`${API_URL}/image/${imageId}`);
      const foundImage = response.data;
      setCurrentImage(foundImage);
      setMyLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //gets the comments from the image
  const getComments = async () => {
    setIsLoadingComments(true);
    try {
      const { data } = await axios.get(`${API_URL}/comment/${imageId}`);
      setComments(data.comments);
      // console.log(data.comments);
    } catch (error) {
      console.log('Error fetching comments ', error);
    } finally {
      setIsLoadingComments(false);
    }
  };
  // Handles New Comment
  const handleNewComment = async () => {
    if (newComment) {
      const newCommentData = {
        user_id: user._id,
        comment: newComment,
        username: user.username,
        image_id: imageId,
      };

      try {
        const { data } = await axios.post(
          `${API_URL}/comment/create`,
          newCommentData
        );
        const addedComment = data;
        console.log('added Comment ', addedComment);
        setComments([data, ...comments]);
        setNewComment(''); // Clears the text area
      } catch (error) {
        console.log('failed to get comments', error);
      }
    }
  };

  // handles Deleting Comments
  const handleDeleteComment = async (commentId) => {
    try {
      const deletedComment = await axios.delete(
        `${API_URL}/comment/delete/${commentId}`
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
      console.log('deleted comment', deletedComment);
    } catch (error) {
      console.log('error with deleting the comment', error);
    }
  };

  // // Handles updating comments if we wanted to add it
  // const handleUpdateComment = async (commentId) => {
  //   try {
  //     const updatedComment = await axios.put(`${API_URL}/comment/update/${commentId}`, {
  //       comment: editcomment
  //     });
  //     setComments(comments.map((comment) => comment._id === commentId ? updatedComment.data : comment));
  //   } catch (error) {
  //     console.log('error with updating the comment', error);
  //   }
  // }

  // Hook
  useEffect(() => {
    getImage();
    getLikes();
    // checkCollection();
    /******************* Functions inside of UseEffect **************/

    //Checks if current image is in collection
    const checkIfInCollection = async () => {
      // const body = { data: { userId: user._id, imageId: imageId } };
      try {
        const { data } = await axios.get(
          `${API_URL}/collection/isincollection`,
          { params: { userId: user._id, imageId: imageId } }
        );
        // console.log(data);
        setIsInCollection(data.isInCollection);
      } catch (error) {
        console.log(error);
      }
    };
    //Function gets user image
    const getUserImage = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/${user._id}`);
        // console.log("Full response:", response.data.image);
        setUserImage(response.data.oneUser.image);
        // console.log(response.data.oneUser.image);
      } catch (error) {
        console.log("Didn't manage to get user image", error);
      }
    };
    //wait for the user to be defined
    if (user) {
      getUserImage();
      checkIfInCollection(); //this will see if image is in collection or not
    }

    // handleNewComment();
    getComments(); //Fetches Comments if any
  }, [user, imageId]);
  /******************* Loader screen **************/
  // console.log(comments[0].comment);
  if (!currentImage || !user) {
    return (
      <div className='flex flex-col space-y-3 justify-self-center align-self-center mt-10'>
        <Skeleton className='h-[250px] w-[300px] rounded-xl' />
        <div className='space-y-4 justify-self-end'>
          <Skeleton className='h-4 w-[250px] mt-7 justify-self-end' />
          <Skeleton className='h-4 w-[200px] justify-self-end' />
          <Skeleton className='h-4 w-[200px] justify-self-end' />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Back Home Button */}
      <div className='flex justify-end w-11/12'>
        <Link
          className='w-fit mt-5 mb-2 bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out flex items-center gap-2'
          to='/'
        >
          <House />
          Home
        </Link>
      </div>

      {/* Image */}
      <div className='mt-10  gap-2 m-0 w-7/12 justify-self-center  h-auto'>
        <div className='mb-5 justify-self-center'>
          <Card className='relative w-[80vw] max-w-[300px] h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden '>
            <Blurhash
              hash={currentImage.blur_hash}
              width={400}
              height={300}
              resolutionX={32}
              resolutionY={32}
              punch={1}
              className='absolute inset-0 w-full h-full object-cover blur-md'
            />
            <img
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                myLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setMyLoading(false)}
              src={currentImage.photo_image_url}
              alt='The Image goes here'
            />
          </Card>
        </div>
        {/* Image details */}
        <div className='pb-20'>
          <div className='flex gap-2 justify-between'>
            <p className='text-2xl font-semibold capitalize'>
              {currentImage.ai_description}{' '}
            </p>{' '}
            <p>
              {' '}
              Photo By : {currentImage.photographer_first_name}{' '}
              {currentImage.photographer_last_name}
            </p>{' '}
          </div>
          {/* Add to Collection Section */}
          <div className='flex gap-2 justify-self-end h-24 '>
            <Button
              className='w-fit my-5 '
              variant={isInCollection ? 'secondary' : ''}
              onClick={() => {
                isInCollection
                  ? (deleteImageToCollection(imageId), setIsInCollection(false))
                  : (addImageToCollection(imageId), setIsInCollection(true));
              }}
            >
              {' '}
              {isInCollection ? <CircleMinus /> : <CirclePlus />}{' '}
              {isInCollection ? 'Remove from Collection' : 'Add to Collection'}
            </Button>{' '}
          </div>
          {/* Like Section */}
          {/* Visible Likes */}
          <div className='flex justify-between items-center mb-5'>
            <h3 className='text-2xl font-semibold'>Liked By : </h3>
            <div className='flex flex-wrap gap-2'>
              {imageHasLikes &&
                visibleLikes.map((image) => {
                  return (
                    <Link
                      key={image._id}
                      to={
                        image._id === user._id
                          ? '/the-shire'
                          : `/a-boromir-to-trust/${image._id}`
                      }
                    >
                      <Avatar>
                        <AvatarImage
                          src={
                            image.image ||
                            'https://www.creativefabrica.com/wp-content/uploads/2022/09/15/Black-ink-drop-mark-Paint-stain-splatte-Graphics-38548553-1-1-580x387.png'
                          }
                          alt='user'
                          className='w-10 h-10 rounded-full object-cover cursor-pointer'
                          to={'/the-shire/' + image.user_id}
                        />
                        <AvatarFallback>??</AvatarFallback>
                      </Avatar>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className='flex justify-end'>
            {/* rest of likes */}
            {hiddenLikes.length > 0 && (
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className='mt-4 space-y-2 justify-items-end'
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='flex items-center'
                  >
                    <ChevronsUpDown className='h-4 w-4 mr-2 flex' />
                    {isOpen ? 'Show less' : `Show ${hiddenLikes.length} more`}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className='flex flex-wrap gap-4 my-2'>
                    {hiddenLikes.map((friend) => (
                      <Avatar key={friend._id}>
                        <AvatarImage src={friend.image} alt={friend.username} />
                        <AvatarFallback>
                          {friend.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
          {/* Like Section */}

          {/* Comment Section */}
          <div className='grid w-full gap-2 '>
            <h3 className='text-2xl font-semibold'>Add your comment below</h3>

            <Textarea
              placeholder='Type your comment here.'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className='h-28'
            />
            <Button
              className='w-fit justify-self-end my-3'
              // disabled={!newComment.trim()}
              onClick={handleNewComment}
            >
              Send comment
              <SendHorizontal />
            </Button>
            <div className='flex flex-col gap-4'>
              {comments &&
                user &&
                comments.map((comment) => {
                  return (
                    <div key={comment._id}>
                      <Card className='flex gap-2 shadow-md shadow-slate-300 h-24 rounded-lg items-center pl-4'>
                        <Avatar>
                          <AvatarImage
                            src={
                              userImage ||
                              'https://www.creativefabrica.com/wp-content/uploads/2022/09/15/Black-ink-drop-mark-Paint-stain-splatte-Graphics-38548553-1-1-580x387.png'
                            }
                            alt='user'
                            className='w-10 h-10 rounded-full '
                          />
                          <AvatarFallback>??</AvatarFallback>
                        </Avatar>
                        <div className='flex justify-between w-11/12'>
                          <div>
                            <div className='flex gap-2'>
                              <p className='font-semibold'>{user.username}:</p>
                              <p className='text-start'>{comment.comment}</p>
                            </div>
                            <div className='text-start'>
                              {formatDistanceToNow(
                                new Date(comment.createdAt),
                                { addSuffix: true }
                              )}
                              {/* {' (' +
                                format(
                                  new Date(comment.createdAt),
                                  'MMMM do, yyyy h:mm a'
                                ) +
                                ')'} */}
                            </div>
                          </div>
                          {/* Actions Buttons */}
                          <div className='flex items-center'>
                            {/* <Dialog>
                          <DialogTrigger>
                            <Button>
                              <Pencil />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Comment</DialogTitle>
                              <DialogDescription>
                                <Textarea
                                  placeholder='Edit your comment.'
                                  value={editComment.comment}
                                  onChange={(e) => setEditComment(e.target.value)}
                                />
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                onClick={() => handleUpdateComment(comment._id)}
                              >
                                Save
                              </Button>
                            </DialogFooter>
                            </DialogContent>
                        </Dialog> */}
                            {/* Delete Button */}
                            {user._id === comment.user_id ? (
                              <Button
                                variant='destructive'
                                onClick={() => handleDeleteComment(comment._id)}
                                className='w-fit justify-center'
                              >
                                {/* 675afdcf85211af984b3b54e */}
                                <CircleX />
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePage;
