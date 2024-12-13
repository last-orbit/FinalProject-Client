import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.errorMessage);
    }
  }

  return (
    <>
      <h1 className="mb-10 text-2xl mt-20">Login Page </h1>

      <form
        className="flex flex-col gap-5 items-center"
        // onSubmit={handleSubmit}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="button" onClick={handleSubmit}>
          Login
        </Button>
      </form>
      <p className="mt-4">
        Don&#39;t have an account?{" "}
        <a href="/i'm-going-on-an-adventure">Sign Up</a>
      </p>
    </>
  );
};

export default LoginPage;
