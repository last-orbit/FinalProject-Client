import React from 'react'
import memeImage from '../../assets/404 Meme.jpg'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Card className='w-[85vw] max-w-[500px] h-[350px] bg-white rounded-2xl shadow-lg overflow-hidden m-auto mt-5 '>
        <img
          className='w-full h-full '
          src={memeImage}
          alt='The Image goes here'
        />
      </Card>
      <div className='flex flex-col items-center mt-5'>
        <p className='text-2xl font-bold text-inherit mb-2'>
          The Eagles are coming to return to your little hobbit hole{' '}
        </p>
        <Button className='text-2xl font-bold mb-6 p-5  bg-slate-400 hover:text-emerald-700'>
          <Link to='/'>Fly you Fools</Link>
        </Button>
      </div>
    </>
  );
}

export default NotFound