import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import url from "../url";
import { useSelector } from "react-redux";
import { UserState } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { State, changeHandler } from "../redux/cartSlice";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { CircularProgress } from "@mui/material";

interface bg {
  bg: string | undefined;
}

interface Product {
  _id?: string | undefined;
  title?: string | undefined;
  img?: string | undefined;
  price?: number | undefined;
  desc?: string | undefined;
  color?: string | undefined;
  size?: string | undefined;
  quantity?: number | undefined;
}

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  color: #000000;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ padding: ".5rem", marginTop: ".5rem" })}
`;

const Image = styled.img`
  width: 95%;
  height: 75%;
  object-fit: contain;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  ${mobile({ padding: "1.5rem" })}
`;

const Title = styled.h1`
  font-size: 4rem;
  ${mobile({ fontSize: "3rem" })}
`;

const Desc = styled.p`
  width: 75%;
`;

const Price = styled.p`
  font-size: 1.7rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Size = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SizeTitle = styled.p`
  font-size: 1.4rem;
`;

const Select = styled.select`
  border: 1px solid lightgrey;
  padding: 0.5rem;
  cursor: pointer;
`;

const Option = styled.option``;

const Colors = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Color = styled.div<bg>`
  background-color: ${(props) => props.bg};
  aspect-ratio: 1/1;
  width: 1.7rem;
  border-radius: 100%;
  cursor: pointer;
`;

const ColorTitle = styled.p`
  font-size: 1.4rem;
`;

const LowerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Counter = styled.div`
  border: solid 1px green;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const Button = styled.button`
  background: none;
  border: solid 1px green;
  padding: 0.7rem;
  cursor: pointer;

  &:hover {
    background-color: green;
    color: black;
  }
`;

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Partial<Product> | null>(null);
  const [counter, setCounter] = useState<number>(1);
  const [size, setSize] = useState<string>("");

  //snackbar
  const [open, setOpen] = useState(false);
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  //
  const dispatch = useDispatch();

  const userId = useSelector(
    (state: UserState | null) => state?.user?.user?.user?._id
  );

  interface Change {
    cart: State;
  }

  const token = localStorage.getItem("token");
  const change = useSelector((state: Change) => state.cart.change);

  useEffect(() => {
    const product = async () => {
      try {
        const response = await axios.get(`${url}/product/find/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    product();
  }, [id]);

  const addToCart = () => {
    if (size === "") {
      alert("please select a size");
    } else if (userId !== undefined) {
      const fetchCart = async () => {
        const options = {
          productId: product?._id,
          quantity: counter,
        };

        const headers = {
          Authorization: `Bearer ${token}`,
        };
        try {
          const post = await axios.post(`${url}/cart/${userId}`, options, {
            headers,
          });
          console.log(post);
          dispatch(changeHandler({ change: change + 1 }));
        } catch (err) {
          console.log(err);
        }
      };
      fetchCart();
      setOpen(true);
    } else {
      setOpen(true);
    }

    setCounter(1);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      {!product ? (
        <CircularProgress style={{position: "absolute", top: "20%", left: "50%"}} />
      ) : (
        <Wrapper>
          <Left>
            <Image src={`${url}/uploads/${product.img}`} />
          </Left>
          <Right>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price> INR {product.price} /-</Price>
            <Info>
              <Colors>
                <ColorTitle>Colors : </ColorTitle>
                <Color bg={product?.color} />
              </Colors>
              <Size>
                <SizeTitle>Size : </SizeTitle>
                <Select onChange={(e) => setSize(e.target.value)}>
                  <Option selected disabled>
                    Size
                  </Option>
                  <Option>S</Option>
                  <Option>M</Option>
                  <Option>L</Option>
                  <Option>XL</Option>
                  <Option>XXL</Option>
                  <Option>XXXL</Option>
                </Select>
              </Size>
            </Info>
            <LowerContainer>
              <CounterContainer>
                <RemoveIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    counter >= 1 && setCounter(counter - 1);
                  }}
                />
                <Counter>{counter}</Counter>
                <AddIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setCounter(counter + 1)}
                />
              </CounterContainer>
              <Button onClick={addToCart}>Add To Cart</Button>
              <Snackbar
                open={open}
                autoHideDuration={5}
                // onClose={handleClose}
                message={
                  userId !== undefined
                    ? "Successfully added to cart!"
                    : "Please login to access cart !"
                }
                action={action}
              />
            </LowerContainer>
          </Right>
        </Wrapper>
      )}

      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
