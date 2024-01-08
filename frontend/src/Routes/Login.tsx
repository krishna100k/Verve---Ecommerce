import styled from "styled-components";
import { mobile } from "../responsive";
import { FormEvent, useState } from "react";
import axios from "axios";
import url from "../url";
import { useDispatch } from "react-redux";
import { loginFailure, loginRequest, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar";
// import { changeHandler } from "../redux/cartSlice";
// import { useSelector } from "react-redux";
// import { State } from "../redux/cartSlice";

// interface Change{
//   cart: State
// }

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
  ${mobile({ width: "100%", height: "auto" })}
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

const Login = () => {
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const change = useSelector((state:Change) => state.cart.change);

  const fetch = async (e: FormEvent) => {
    e.preventDefault();

    if(username === ""){
      setError("username is required!");
    }else if(password === ""){
      setError("Password is required!");
    }

    dispatch(loginRequest());

    const options = {
      username,
      password,
    };

    try {
      const response = await axios.post(`${url}/auth/login`, options);
      console.log(response.data.user);
      dispatch(loginSuccess({user: response.data.user}))
      setError("Login Successful!");
      localStorage.setItem('token', response.data.token);
      navigate("/")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      console.log(err)
      dispatch(loginFailure(err.message))
      setError("Login Failed !")
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={fetch}>
          <Input
          value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <Input
          value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <Error>{error}</Error>
          <Button>LOGIN</Button>
          <Link>FORGOT PASSWORD ?</Link>
          <Link onClick={() => navigate("/register")}>CREATE A NEW ACCOUNT !</Link>
        </Form>
      </Wrapper>
    </Container>

  );
};

export default Login;
