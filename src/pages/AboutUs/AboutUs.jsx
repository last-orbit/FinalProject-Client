import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import fabImage from '../../assets/Fab-Image.png';
import robImage from '../../assets/2ndProfile.jpg';
import { Link, NavLink } from 'react-router-dom';
// Linkedin & Github are deprecated so they may have to be change later or write a ternanry instead
import { Linkedin, Github, Mail } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className='min-h-screen'>
      <h2 className='text-2xl mt-5 capitalize'>Welcome to the fellowship</h2>
      <h3 className='text-xl mt-2'>About Us</h3>
      <div className='grid grid-cols-2 mt-4 w-11/12 mx-auto gap-10'>
        <Card>
          <CardTitle className='mt-2'>Fab</CardTitle>
          <CardContent>
            <Avatar className='w-32 h-32 mt-4 mx-auto'>
              <AvatarImage
                className='rounded-full border-2  border-gray-100 object-cover'
                src={fabImage}
              />
              <AvatarFallback>??</AvatarFallback>
            </Avatar>
            <CardDescription className='mt-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              non.
            </CardDescription>
            <h4>Here are my links below : </h4>
            <div className='flex gap-4 justify-center mt-3'>
              <Link
                to='https://www.linkedin.com/in/fabien-dubin-46ab121b/'
                title='Fabs LinkedIn'
              >
                {' '}
                <Linkedin />
              </Link>
              <Link to='https://github.com/FabienDubin' title='Fabs Github'>
                {' '}
                <Github />
              </Link>
              <a
                href='mailto: fabien.dubin@gmail.com'
                title='fabien.dubin@gmail.com'
              >
                {' '}
                <Mail />
              </a>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardTitle className='mt-2'>Rob</CardTitle>
          <CardContent>
            <Avatar className='w-32 h-32 mt-4 mx-auto'>
              <AvatarImage
                className='rounded-full border-2  border-gray-100 object-cover'
                src={robImage}
              />
              <AvatarFallback>??</AvatarFallback>
            </Avatar>
            <CardDescription className='mt-2'>
              Former Theatre Technical Director turned Web Developer
            </CardDescription>
            <h4>Here are my links below : </h4>

            <div className='flex gap-4 justify-center mt-3'>
              <Link
                className='underline'
                to='https://www.linkedin.com/in/dev-ro/'
                title='Robs Linkedin'
              >
                {' '}
                <Linkedin />
              </Link>
              <Link
                className='underline'
                to='https://github.com/last-orbit'
                title='Robs Github'
              >
                {' '}
                <Github />
              </Link>
              <a
                href='mailto: lastorbit1@gmail.com'
                title='lastorbit1@gmail.com'
              >
                {' '}
                <Mail />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
      <h3 className='text-xl mt-4'>Github Repos</h3>
      <div className='flex gap-4 w-11/12 justify-center mx-auto mt-4'>
        <p>
          The Front End Repo <Link className='underline'>Here</Link>
        </p>
        <p>
          The Back End Repo <Link className='underline'>Here</Link>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
