import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { API_URL } from '../../../config';
import { data, useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Headphones,
  Pencil,
  Send,
  CirclePlus,
  CircleMinus,
  CircleX,
  SendHorizontal,
} from 'lucide-react';

const ImagePage = () => {
  const { imageId } = useParams();
  /******************* States **************/
  // grabs the image
  const [currentImage, setCurrentImage] = useState(null);
  // grabs the comments
  const [comments, setComments] = useState();
  // Edits the comment
  const [editComment, setEditComment] = useState('');
  // For New Comments
  const [newComment, setNewComment] = useState('');
  // Checks if Image is in Collection
  const [isInCollection, setIsInCollection] = useState(false);


  /******************* Functions **************/
  const getImage = async () => {
    try {
      const response = await axios.get(`${API_URL}/image/${imageId}`);
      const foundImage = response.data;
      setCurrentImage(foundImage);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const reponse = await axios.get(`${API_URL}/comment/${imageId}`);
      const foundComments = reponse.data;
      setComments(foundComments);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNewComment = async () => {
    try {
      const response = await axios.post(`${API_URL}/comment/${imageId}`, { comment: newComment });
      console.log(response);
      setNewComment('');
    } catch (error) {
      console.log(error);
    }
  }

  /******************* Use Effect for getting the Images **************/
  // useEffect(() => {
  //   // const foundImage = images.find((oneImage) => oneImage.id == imageId);
  //   // setCurrentImage(foundImage);
  //   /***** API Call for the Images *****/
  //   // axios
  //   //   .get(`${API_URL}/image/${imageId}`)
  //   //   .then((res) => {
  //   //     const foundImage = res.data;
  //   //     setCurrentImage(foundImage);
  //   //     // console.log(foundImage);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  //   getImage();
  //   getComments();
  // }, [imageId]);

  useEffect(() => {
    getImage();
    getComments();
  })
  /******************* If there are no images, show a loading screen **************/
  if (!currentImage) {
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
      {/* Image */}
      <div className='mt-10  gap-2 m-0 w-7/12 justify-self-center  h-auto'>
        <div className='mb-5'>
          <img
            className='h-1/3 w-96 object-contain justify-self-center drop-shadow bg-white rounded-2xl shadow-lg relative'
            src={currentImage.photo_image_url}
            alt='The Image goes here'
          />
        </div>
        {/* <Card className='relative w-[80vw] max-w-[300px] h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden align-self-center'>
          <img
            src={currentImage.photo_image_url}
            alt='Card image'
            className='w-full h-full object-cover '
          />
        </Card> */}
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
          {/* Bottom Section */}
          <div className='flex gap-2 justify-self-end h-48 '>
            <Button className='w-fit my-5 '>
              {' '}
              {isInCollection ? <CircleMinus /> : <CirclePlus />}{' '}
              {isInCollection ? 'Remove from Collection' : 'Add to Collection'}
            </Button>{' '}
          </div>
          {/* Add/Remove Image from Collection */}

          {/* Add/Remove Comment This is what Robert wrote */}
          <div className='grid w-full gap-2 mb-15'>
            <h4>Add your comment below</h4>
            <Textarea placeholder='Type your comment here.' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <Button className='w-fit justify-self-end'>
              Send comment
              <SendHorizontal />
            </Button>
          </div>
          {/* This is what Bruno wrote/fab wrote */}
          <div className='tabs'>
            <Tabs className='w-full'>
              <TabsList>
                <TabsTrigger value='comments'>Comments</TabsTrigger>
              </TabsList>
              {/* --------------------------------------------------------------------------- */}
              {/* -----------------------Tracks Table TAB---------------------*/}
              <TabsContent value='tracks'>
                {/* --------------------------------------------------------------------------- */}
                {/* -----------------------Tracks Table---------------------*/}

                {/* --------------------------------------------------------------------------- */}
                {/* -----------------------Comments Tab---------------------*/}
              </TabsContent>
              <TabsContent value='comments'>
                {/* --------------------------------------------------------------------------- */}
                {/* -----------------------Comment Input container---------------------*/}
                <h4>Add a comment...</h4>
                <div className='comment-box'>
                  <div className='text-area'>
                    <Textarea
                      placeholder='Type your comment here.'
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>
                  {/* <Button className='btn' onClick={handleNewComment}>
                    <Send />
                    Send
                  </Button> */}
                </div>
                {/* --------------------------------------------------------------------------- */}
                {/* -----------------------All comments container---------------------*/}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePage;
