import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AboutUs = () => {
  return (
    <div className='min-h-screen'>
      <h2 className='text-2xl mt-5'>Welcome to the fellowship</h2>
      <h3 className='text-xl mt-2'>About Us</h3>
      <div className='grid grid-cols-2 mt-4 w-11/12 mx-auto'>
         <Card>
          <CardHeader>card header</CardHeader>
        </Card>
        <Card>text 2</Card>
      </div>
    </div>
  );
};

export default AboutUs;
