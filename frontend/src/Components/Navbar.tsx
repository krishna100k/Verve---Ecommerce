import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Container = styled.div`
  width: 100%;
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  gap: 1rem;
`;

const Center = styled.div`
  flex: 1;
`;

const Language = styled.p``;

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
`;

const Input = styled.input`
  height: 100%;
  width: 90%;
  border: none;
  padding: 0.5rem;
`;

const Logo = styled.h1`
  font-weight: bolder;
  text-align: center;
`;

const RightButton = styled.button`
  background: none;
  border: none;
  font-size: medium;
  cursor: pointer;
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
