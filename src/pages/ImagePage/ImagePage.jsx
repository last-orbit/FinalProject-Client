import React, { useEffect,useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { API_URL } from '../../../config';



const ImagePage = () => {
  useEffect(() => {
    const getImageInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/image/${somethinghere.imgageid}`);
        console.log("Full response:", response.data.image);
        SetIImage(response.data.oneImage.image);
        console.log(response.data.oneImage.image);
      } catch (error) {
        console.log("Couldn't get the image info",error);
      }
    }
  }, []);
  return (
    <>
      <div className='mt-10 flex flex-col gap-2 m-0 w-7/12 justify-self-center'>
        <div>
          <img src={somethinghere.photo_image_url}alt='The Image goes here' />
        </div>
        <div >
          <h1>Title </h1> {/*Title*/}
          <p>Description</p> {/*Description*/}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores,
            necessitatibus vitae eos consequatur atque debitis natus quae dolore
            temporibus voluptatibus repudiandae unde neque consequuntur ad ut
            deleniti. Esse, dolore in. {somethinghere.ai_description}
          </p>
          <Button className='w-fit my-5'>Add/Remove</Button> {/*Add/remove button*/}
          <div className='grid w-full gap-2'>
            <Textarea placeholder='Type your message here.' />
            <Button className='w-fit justify-self-end'>Send message</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePage;
