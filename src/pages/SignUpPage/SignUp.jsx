import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/apiUrl.config';



    const SignUp = () => {
      const [image, setImage] = React.useState('');
      const [username, setUsername] = React.useState('');
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');
      const nav = useNavigate();
      function handleSignup(e) {
        e.preventDefault();
        const UserSignup = {
          image,
          username,
          email,
          password,
        };
        axios
          .post(`${API_URL}/signup`, UserSignup)
          .then((res) => {
            console.log(res.data);
            nav('/you-shall-not-pass');
          });
      }

      return (
        <div className='min-h-screen'>
          <h1 className='mt-5 text-2xl'>Sign Up</h1>
          <form
            className='flex flex-col gap-5 items-center mt-8'
            onSubmit={handleSignup}
          >
            {/* <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label>Image</Label>
              <Input
                type='text'
                id='image'
                placeholder='Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div> */}
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label>Username</Label>
              <Input
                type='text'
                id='username'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label>Email</Label>
              <Input
                type='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label>Password</Label>
              <Input
                type='Password'
                id='password'
                placeholder='Password'
                minlength='4'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button>Sign Up</Button>
            </div>
          </form>
          <p className='mt-4'>
            Already have an account?{' '}
            <a className='underline font-medium' href='/you-shall-not-pass'>
              Login
            </a>
          </p>
        </div>
        // Add alert if email already exist or alert of
      );
    };

export default SignUp;
