import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/apiUrl.config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Siren } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const nav = useNavigate();
  // get the token in the local storage
  const { storeToken, authenticateUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const userToLog = {
      email,
      password,
    };

    //posting the request to the server
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userToLog);
      console.log(response.data);
      //get the token back from the login
      storeToken(response.data.authToken); //CHECK THE NAME
      //put the token in the LS
      await authenticateUser();
      nav("/");
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(true);
    }
  }

  return (
    <div className="min-h-screen m-auto flex flex-col items-center justify-center overflow-hidden  -mt-9">
      <h1 className="mb-10 text-2xl ">Login Page </h1>

      <form
        className="flex flex-col w-2/3 md:w-1/3 gap-5 items-center"
        onSubmit={handleSubmit}
      >
        <div className="grid w-full items-center gap-1.5">
          <Input
            className="w-full"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Input
            className="w-full"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="w-full">Login</Button>
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
        Don&#39;t have an account?{" "}
        <a className="underline font-medium" href="/i'm-going-on-an-adventure">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
