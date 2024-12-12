import React, { useEffect,useState, } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { API_URL } from '../../../config';
import { data, useParams } from 'react-router-dom';
import {Skeleton} from '@/components/ui/skeleton'
import {
  Headphones,
  Pencil,
  Send,
  CirclePlus,
  CircleMinus,
  CircleX,
  SendHorizontal
} from 'lucide-react';




const ImagePage = () => {
  const { imageId } = useParams();
  const [currentImage, setCurrentImage] = useState(null);
  const [comment, setComment] = useState('');
  const [isInCollection, setIsInCollection] = useState(false);

// Gets the image
  useEffect(() => {
    // const foundImage = images.find((oneImage) => oneImage.id == imageId);
    // setCurrentImage(foundImage);
    axios
      .get(`${API_URL}/image/${imageId}`)
      .then((res) => {
         const foundImage = res.data;
        setCurrentImage(foundImage);
        // console.log(foundImage);
      })
    .catch((error) => {
      console.log(error);
    });
  }, [imageId]);

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
      <div className='mt-10 flex flex-col gap-2 m-0 w-7/12 justify-self-center '>
        <div >
          <img
            className='h-1/3 w-96 object-contain justify-self-center drop-shadow'
            src={currentImage.photo_image_url}
            alt='The Image goes here'
          />
        </div>
        <div>
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

          {/* Add/Remove Comment */}
          <div className='grid w-full gap-2 mb-15'>
            <Textarea placeholder='Type your comment here.' />
            <Button className='w-fit justify-self-end'>
              Send comment
              <SendHorizontal />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePage;
