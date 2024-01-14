import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { State, Product, addProduct, changeHandler } from "../redux/cartSlice";
import { UserState, User, logout } from "../redux/userSlice";


interface UserSlice extends UserState {
  user: User;
}

interface CartSlice extends State {
  cart: Product;
}

const Container = styled.div`
  width: 100%;
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 25px 0px 10px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.7rem;
`;

const Center = styled.div`
  flex: 1;
`;

const Language = styled.p`
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchButton = styled.button`
  height: 100%;
  width: 2rem;
  border: none;
  background: none;
  cursor: pointer;
`;

const SearchBar = styled.div`
  width: 15rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  border: solid 1px lightgray;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Input = styled.input`
  height: 100%;
  width: 90%;
  border: none;
  padding: 0.5rem;
  background-color: #f5fafd;
`;

const Logo = styled.h1`
  font-weight: bolder;
  text-align: center;
  ${mobile({ fontSize: "1.5rem" })}
  cursor: pointer;
`;

const RightButton = styled.button`
  background: none;
  border: none;
  font-size: medium;
  cursor: pointer;
  ${mobile({ width: "100%", fontSize: ".9rem" })}
`;

// Style Ends

const Navbar = () => {
  const cart = useSelector((state: CartSlice) => state?.cart);
  const userState = useSelector((state: UserSlice) => state?.user);
  const isLoggedIn = userState.user;
  const user = userState?.user?.user;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutFunc = () => {
    localStorage.removeItem("token");
    dispatch(addProduct({product: [], total: 0, quantity: 0}))
    dispatch(changeHandler({change: 0}))
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchBar>
            <Input />
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchBar>
        </Left>
        <Center>
          <Logo onClick={() => navigate("/")}>HibernationCave.</Logo>
        </Center>
        {isLoggedIn === null ? (
          <Right>
            <RightButton onClick={() => navigate("/register")}>
              REGISTER
            </RightButton>
            <RightButton onClick={() => navigate("/login")}>LOGIN</RightButton>
          </Right>
        ) : (
          <Right>
            <RightButton>{user?.username}</RightButton>
            <RightButton onClick={logoutFunc}>LOGOUT</RightButton>
            <RightButton>
              <Badge
                onClick={() => navigate("/cart")}
                badgeContent={cart.quantity}
                color="primary"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </RightButton>
          </Right>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
