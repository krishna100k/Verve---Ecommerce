import styled from "styled-components";
import AdminNavbar from "../Components/AdminNavbar";
import AdminSidebar from "../Components/AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../url";
import { CircularProgress } from "@mui/material";

import { useNavigate } from "react-router";

interface Products {
    _id: string;
  title: string;
  desc: string;
  img: string;
  categories: string[];
  size: string;
  color: string;
  price: number;
  inStock: boolean;
  createdAt: string;
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

  @media (max-width: 1636px) {
  margin-left: ${(props) => (props.sideBar ? "22vw" : "0px")};
  }

  @media (max-width: 1432px) {
  margin-left: ${(props) => (props.sideBar ? "25vw" : "0px")};
  }

  @media (max-width: 1244px) {
  margin-left: ${(props) => (props.sideBar ? "30vw" : "0px")};
  }

  @media (max-width: 1044px) {
  margin-left: ${(props) => (props.sideBar ? "35vw" : "0px")};
  }

  @media (max-width: 884px) {
  margin-left: ${(props) => (props.sideBar ? "46vw" : "0px")};
  }

  @media (max-width: 670px) {
  margin-left: 0px;
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

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  /* border: solid 1px lightgray; */
  height: 100%;
  min-width: 12.3rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
  /* padding: 1rem; */
  /* border: solid 1px; */
  margin: .5rem;
  gap: 1rem;
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

const Image = styled.img`
    width: 20%;
`

const Buttons = styled.button`
  border: none;
  background-color: teal;
  padding: .5rem;
  color: white;
  border-radius: 5px;
`

const AdminProducts = () => {
  const [sideBar, setSideBar] = useState<boolean>(true);
  const [products, setProducts] = useState<Products[] | null>(null);
  const [stateHandler, setStateHandler] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${url}/product/find`);
        setProducts(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [stateHandler]);

  const handleDelete = async (id: string) => {

    const token = localStorage.getItem(`token`)
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try{
      const response = await axios.delete(`${url}/product/delete/${id}`, {headers})
      console.log(response);
      setStateHandler(!stateHandler);
      alert("Product Deleted Successfully")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <Container>
      <AdminNavbar setSideBar={setSideBar} sideBar={sideBar} />
      <Wrapper>
        <AdminSidebar sideBar={sideBar} setSideBar={setSideBar} />
        <Main sideBar={sideBar}>
          <Header>Products</Header>
          <HeadingLine>
            <Section>Date</Section>
            <Section>Image</Section>
            <Section>Product Name</Section>
            <Section>Description</Section>
            <Section>Price</Section>
            <Section>in Stock</Section>
            <Section>Edit</Section>
          </HeadingLine>
          {products ? (
            products.map((order) => {
              return (
                <DataLine>
                  <Section>{order.createdAt}</Section>
                  <Section><Image src={`${url}/uploads/${order.img}`} /></Section>
                  <Section>{order.title}</Section>
                  <Section>{order.desc}</Section>
                  <Section>{order.price}</Section>
                  <Section>{`${order.inStock}`}</Section>

                  <Section
                  >
                    <Buttons style={{ cursor: "pointer" }} onClick={() => navigate(`/hpanel/products/${order._id}`)} >Edit</Buttons>
                    <Buttons style={{ cursor: "pointer" }} onClick={() => handleDelete(order._id)} >Delete</Buttons>

                  </Section>
                </DataLine>
              );
            })
          ) : (
            <CircularProgress
              style={{ position: "absolute", top: "50%", left: "50%" }}
            />
          )}
        </Main>
      </Wrapper>
    </Container>
  );
};

export default AdminProducts;
