import styled from "styled-components";
import AdminNavbar from "../Components/AdminNavbar";
import AdminSidebar from "../Components/AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../url";
import { CircularProgress } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from "react-router";

interface Order{
  _id: string;
  createdAt: string;
  name: string;
  mobile: string;
  address: string;
  total: number;
  status: string;

}

interface ContainerProps {
  sideBar: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
const Main = styled.div<ContainerProps>`
  /* border: solid 1px; */
  height: 100%;
  width: 90%;
  flex: 6;
  padding-left: 1rem;
  position: relative;
  margin-top: 4rem;
  margin-left: ${(props) => (props.sideBar ? "19vw" : "0px")};
  transition: all 0.5s ease-in-out;


&::-webkit-scrollbar {
  width: 6px; /* Chrome, Safari, Opera */
}

&::-webkit-scrollbar-thumb {
  background-color: transparent; /* Chrome, Safari, Opera */
}

`;

const Header = styled.p`
  font-weight: lighter;
  font-size: 2rem;
  padding: 1rem;
`;

const HeadingLine = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
`;

const Section = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  /* border: solid 1px lightgray; */
  height: 100%;
  min-width: 12.3rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
  padding: 1rem;
`;

const DataLine = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// const DataPara = styled.p`
//   word-wrap: break-word;

// `

const Admin = () => {
  const [sideBar, setSideBar] = useState<boolean>(true);
  const [orders, setOrders] = useState<Order[] | null>(null);

  const token = localStorage.getItem(`token`);
  const navigate = useNavigate()

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const fetch = async () => {
      try {
        const response = await axios.get(`${url}/orders`, { headers });
        setOrders(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [token]);

  return (
    <Container>
      <AdminNavbar setSideBar={setSideBar} sideBar={sideBar} />
      <Wrapper>
        <AdminSidebar sideBar={sideBar} />
        <Main sideBar={sideBar}>
          <Header>All Orders</Header>
          <HeadingLine>
            <Section>Date</Section>
            <Section>Name</Section>
            <Section>Address</Section>
            <Section>Mobile</Section>
            <Section>Total</Section>
            <Section>Status</Section>
            <Section>Products</Section>
          </HeadingLine>
          {
            orders ? 
            orders.map((order) => {
              return(
                <DataLine>
                <Section>{order.createdAt}</Section>
                <Section>{order.name}</Section>
                <Section>{order.address}</Section>
                <Section>{order.mobile}</Section>
                <Section>{order.total} INR</Section>
                <Section>{order.status}</Section>
                <Section onClick={() => navigate(`/hpanel/orders/${order._id}`)}><ArrowRightAltIcon style={{cursor:"pointer"}} /></Section>
              </DataLine>
              )
            })
            :
            <CircularProgress style={{position: "absolute", top: "50%", left: "50%"}} />
          }

        </Main>
      </Wrapper>
    </Container>
  );
};

export default Admin;
