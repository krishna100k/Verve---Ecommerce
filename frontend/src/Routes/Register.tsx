import styled from "styled-components";
import {mobile} from "../responsive"
import axios from "axios"
import url from "../url";
import { useState } from "react";
import { FormEvent } from "react";
// import { useDispatch } from "react-redux";
// import { loginFailure, loginRequest, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 25%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  border-radius: 5px;
  width: 35rem;
  height: 25rem;
  padding: 20px;
  background-color: white;
  ${mobile({width: "100%", height: "auto"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  max-width: 100%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 35%;
  height: 2.7rem;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.p`
color: #d9b4b4;
padding-bottom: 10px;
`

const Register = () => {

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const fetch = async (e: FormEvent) => {
    e.preventDefault()


    if(password !== confirmPassword){
      setError("Password doesn't match !")
      setPassword("")
      return
    }else if(email === ""){
      setError("Email is required !")
      setEmail("")
      return
    }else if(password === ""){
      setError("Password is required !")
      setPassword("")
      return
    }else if (username === ""){
      setError("Username is required !")
      setUsername("")
      return
    }

    // dispatch(loginRequest())

    const options = {
      username,
      password,
      email
    }
    try{
      const response = await axios.post(`${url}/auth/register`, options);
      console.log(response.data)

      // dispatch(loginSuccess({user: response.data}))
      setError("Resistration successful, please login !")
      navigate("/login")


    }catch(err: unknown){
      console.log(err)
      setError("Username or Email already exists !")
      // dispatch(loginFailure({error: err.message}))
    }

  }


  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>SIGN UP</Title>
        <Form onSubmit={fetch}>
          <Input onChange = {(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
          <Input onChange = {(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
          <Input onChange = {(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
          <Input onChange = {(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirm password" />
          <Error>{error}</Error>
          <Button type="submit">SIGN UP</Button>
          <Link onClick={() => navigate("/login")} >ALREADY HAVE AN ACCOUNT? SIGN IN</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;