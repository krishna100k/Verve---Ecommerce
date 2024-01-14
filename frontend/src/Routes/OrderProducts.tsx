import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import url from "../url";
import AdminNavbar from "../Components/AdminNavbar";
import AdminSidebar from "../Components/AdminSidebar";
import { mobile } from "../responsive";
import { CircularProgress } from "@mui/material";

interface Products {
  img: string;
  title: string;
  _id: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: string;
  name: string;
  mobile: string;
  address: string;
  total: number;
  status: string;
  products: Products[];
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
  height: 100%;
  display: flex;
`;
const Main = styled.div<ContainerProps>`
  width: 90%;
  flex: 4;
  margin-left: ${(props) => (props.sideBar ? "19vw" : "0px")};
  transition: all 0.5s ease-in-out;

  &::-webkit-scrollbar {
    width: 6px; /* Chrome, Safari, Opera */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Chrome, Safari, Opera */
  }
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: solid 1px #eee;
  padding: 1rem;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Header = styled.p`
  font-weight: lighter;
  font-size: 2rem;
  padding: 1rem;
`;

const OrderProducts = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/orders/${orderId}`, {
          headers,
        });
        setOrder(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [orderId]);

  const [sideBar, setSideBar] = useState<boolean>(true);

  return (
    <Container>
      <AdminNavbar setSideBar={setSideBar} sideBar={sideBar} />
      <Wrapper>
        <AdminSidebar sideBar={sideBar} />
        <Main sideBar={sideBar}>
          <Header>{order?.name}'s Products</Header>
          {order === null ? (
            <CircularProgress style={{position: "absolute", top: "50%", left: "50%"}} />
          ) : (
            order?.products.map((item) => {
              return (
                <Product>
                  <ProductDetail>
                    <Image src={item.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {item._id}
                      </ProductId>
                      <ProductColor color={item.color} />
                      <ProductSize>
                        <b>Size:</b> {item.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ProductAmount>{item.quantity}</ProductAmount>
                    </ProductAmountContainer>
                    <ProductPrice>{item.price} Rs</ProductPrice>
                  </PriceDetail>
                </Product>
              );
            })
          )}
        </Main>
      </Wrapper>
    </Container>
  );
};

export default OrderProducts;
