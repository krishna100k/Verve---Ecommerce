import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Announcement from "../Components/Announcement";
// import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { State } from "../redux/cartSlice";

interface Topbutton {
  type?: string;
}

interface Product {
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
  quantity?: number;
}

interface CartState {
  cart: State;
}

const Container = styled.div`
  ${mobile({ width: "125%" })}
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button<Topbutton>`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  ${mobile({ display: "none" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", gap: "2rem" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: solid 1px #eee;
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

// const Hr = styled.hr`
//   background-color: #eee;
//   border: none;
//   height: 1px;
// `;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div<Topbutton>`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

//Styling Ends Here

const Cart: React.FC = () => {
  const cart = useSelector((state: CartState) => state.cart);

  console.log(cart);

  const key =
    "pk_test_51OD09rSCBYeXMCGHYdNUXlpe78oHBYfUiXDJgX50yybLQEyrBN9ZPsgritU2IF2mBZ7PgmKPRyh1nYBngs6IYbyE00szMMyd00";
  const [stripeToken, setStripeToken] = useState<null | Token>(null);

  const onToken = (token: Token) => {
    if (token) {
      setStripeToken(token);
    }
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/stripe/payment",
          {
            token: stripeToken?.id,
            amount: 2000,
          }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest;
  }, [stripeToken]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton onClick={() => window.history.back()}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping Cart({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((item: Product) => {
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
                      {/* <CloseIcon /> */}
                      <RemoveIcon style={{cursor: "pointer"}} />
                    </ProductAmountContainer>
                    <ProductPrice>{item.price} Rs</ProductPrice>
                  </PriceDetail>
                </Product>
              );
            })}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total} Rs</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>590 Rs</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-590 Rs</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total} Rs</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Verve"
              image="/vite.svg"
              billingAddress
              shippingAddress
              description={`Your cart total is ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={key}
            >
              <Button>Checkout Now</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
