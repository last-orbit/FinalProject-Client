import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from "../../../config";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const nav = useNavigate();
  // get the token in the local storage
  const { storeToken, authenticateUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault()
    const userToLog = {
        email,
        password,
    }

    //posting the request to the server
        try {
            const response = await axios.post(`${API_URL}/auth/login`, userToLog)
            console.log(response.data)
            //get the token back from the login
            storeToken(response.data.authToken)//CHECK THE NAME
            //put the token in the LS
            await authenticateUser()
            nav("/")

        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.errorMessage)
        }
    }

  return (
    <>
      <h1>Login Page </h1>

      <form onSubmit={handleSubmit}>
        <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <Button>Login</Button>

      </form>
    </>
  );
};

export default LoginPage;
