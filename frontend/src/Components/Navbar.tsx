import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {mobile} from "../responsive"

const Container = styled.div`
  width: 100%;
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({  padding: "10px 25px 0px 10px"})}
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
  gap: .5rem;
`;

const Center = styled.div`
  flex: 1;
`;

const Language = styled.p`
  cursor: pointer;
  ${mobile({display: "none"})}
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
  ${mobile({width: "100%"})}
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
  ${mobile({fontSize: "1.5rem"})}
`;

const RightButton = styled.button`
  background: none;
  border: none;
  font-size: medium;
  cursor: pointer;
  ${mobile({width: "100%", fontSize: ".9rem"})}
`;

const Navbar = () => {
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
          <Logo>Verve.</Logo>
        </Center>
        <Right>
          <RightButton>REGISTER</RightButton>
          <RightButton>SIGNIN</RightButton>
          <RightButton>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </RightButton>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
