import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/apiUrl.config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Siren } from "lucide-react";
const SignUp = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const nav = useNavigate();

  // function handleSignup(e) {
  //   e.preventDefault();
  //   const UserSignup = {
  //     image,
  //     username,
  //     email,
  //     password,
  //   };
  //   axios.post(`${API_URL}/auth/signup`, UserSignup).then((res) => {
  //     console.log(res.data);
  //     nav("/you-shall-not-pass");
  //   });
  // }

  const handleSignup = async (e) => {
    e.preventDefault();
    const UserSignup = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, UserSignup);
      nav("/you-shall-not-pass");
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center -mt-9">
      <h1 className="mt-5 text-2xl">Sign Up</h1>
      <form
        className="flex flex-col w-2/3 md:w-1/3  gap-5 items-center mt-8"
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
        <div className="grid w-full items-center gap-1.5">
          <Label>Username</Label>
          <Input
            type="text"
            id="username"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Email</Label>
          <Input
            type="email"
            id="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Password</Label>
          <Input
            type="Password"
            id="password"
            required
            placeholder="Password"
            minLength="4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Button className="w-full">Sign Up</Button>
        </div>
      </form>

      {errorMessage && (
        <Alert className="w-2/3 md:w-1/3 m-4" variant="destructive">
          <Siren className="h-4 w-4" />
          <AlertTitle className="text-left"> Heads up!</AlertTitle>
          <AlertDescription className="text-left">
            Your credentials took a wrong turn—double-check and try again!
          </AlertDescription>
        </Alert>
      )}

      <p className="mt-4">
        Already have an account?{" "}
        <a className="underline font-medium" href="/you-shall-not-pass">
          Login
        </a>
      </p>
    </div>
    // Add alert if email already exist or alert of
  );
};

export default SignUp;
