import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useNavigate } from "react-router";

interface Props {
  sideBar: boolean;
  setSideBar: Dispatch<SetStateAction<boolean>>;
}

const Container = styled.div`
  background-color: #f5fafd;
  color: black;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: solid 1px lightgray;
  position: fixed;
  z-index: 2;
`;

const Logo = styled.h2`
  font-weight: bolder;
  padding: 1rem;
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

`;

const UserInfo = styled.p`
    
`

const Leave = styled.button`
    background: none;
    border: none;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`


const AdminNavbar: React.FC<Props> = ({ setSideBar, sideBar }) => {
  const userName = useSelector((state : {user:{user : {user: {username:string}}}}) => state?.user?.user?.user?.username);

  const navigate = useNavigate();

  return (
    <Container>
      <Left>
        <MenuIcon
          onClick={() => setSideBar(!sideBar)}
          style={{ cursor: "pointer" }}
        />
        <Logo>HibernationCaveAdmin.</Logo>
      </Left>
      <Right>
        <UserInfo>Welcome {userName} !</UserInfo>
        <Leave onClick={() => navigate("/")}><ExitToAppIcon /></Leave>
      </Right>
    </Container>
  );
};

export default AdminNavbar;
