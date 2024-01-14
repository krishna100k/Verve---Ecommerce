/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Announcement from "../Components/Announcement";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useState } from "react";
import axios from "axios";
import { State, addProduct, changeHandler } from "../redux/cartSlice";
import url from "../url";
import { User, UserState } from "../redux/userSlice";
import { useNavigate } from "react-router";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


interface Topbutton {
  type?: string;
}

interface UserSlice extends UserState {
  user: User;
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

declare global {
  interface Window {
    Razorpay: any;
  }
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
  cursor: pointer;
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
  align-items: center;
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

const Input = styled.input`
  background-color: none;
  border: solid 1px lightgray;
  width: 70%;
  /* height: 1.5rem; */
  padding: .3rem;
`

//Styling Ends Here

const Cart: React.FC = () => {
  const cart = useSelector((state: CartState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addressOpen, setAddressOpen] = useState<boolean>(false);
  // Buyer Details
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [mobile, setMobile] = useState<string>("")
  //

  const change = useSelector(
    (state: { cart: { change: number } }) => state.cart.change
  );
  const userId = useSelector((state: UserSlice) => state.user?.user?.user?._id);
  const token = localStorage.getItem("token");
  const total = cart?.total;

  const removeProduct = async (productId: string) => {
    const options = {
      productId: productId,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.put(`${url}/cart/${userId}`, options, {
        headers,
      });
      console.log(response);
      dispatch(changeHandler({ change: change + 1 }));
    } catch (err) {
      console.log(err);
    }
  };

  const order = async (e: FormEvent) => {

    if(name === ""){
      alert("please enter your name !")
      return
    }else if (address === ""){
      alert("please enter your address !")
      return
    }else if (mobile.length !== 10){
      alert("please enter a valid mobile number")
      return
    }

    try {
      const orderOptions = {
        amount: total * 100,
        currency: "INR",
      };

      const response = await axios.post(`${url}/razor/order`, orderOptions);

      const options = {
        key: "rzp_test_bnGN11FF5fQ3vq", // Enter the Key ID generated from the Dashboard
        amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Hibernation Cave",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async (response: any) => {
          const validResponse = await axios.post(
            `${url}/razor/validate`,
            response
          );

          console.log(validResponse);

          //Order Logic Starts

          const orderBody = {
            userId,
            products: cart.products && cart.products,
            amount: cart.total && cart.total,
            name,
            address,
            mobile,
            total: cart.total && cart.total
          }

          const headers = {
            Authorization: `Bearer ${token}`
          }

          const orderResp = await axios.post(`${url}/orders`, orderBody, {headers})
          console.log(orderResp)
          //Order Logic Complete

          //Deleting from Cart Logic
          const deleteCart = await axios.delete(`${url}/cart/${userId}`, {headers});

          dispatch(addProduct({product: [], quantity: 0, total: 0}));
          console.log({deletedCart: deleteCart})
          setAddressOpen(false);
          setName("");
          setAddress("");
          setMobile("");
          //


        },
        prefill: {
          name: "Krishnaprasad Awala",
          email: "krishnaprasadawala@gmail.com",
          contact: "9604786452",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#008080",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response: any) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      });

      rzp1.open();
      e.preventDefault();
    } catch (err) {
      console.log(err);
    }
  };

  const backHandler = () => {
    setAddressOpen(false);
  }

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
            <TopText onClick={() => navigate("/wishlist")}>
              Your Wishlist
            </TopText>
          </TopTexts>
          <TopButton type="filled">YOUR ORDERS</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((item: Product) => {
              return (
                <Product key={item._id}>
                  <ProductDetail
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
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
                      <RemoveIcon
                        onClick={() => removeProduct(item._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>{item.price} Rs</ProductPrice>
                  </PriceDetail>
                </Product>
              );
            })}
          </Info>
          {!addressOpen ? (
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
              <Button onClick={() => setAddressOpen(!addressOpen)}>Checkout Now</Button>
            </Summary>
          ) : (
            <Summary>
              <KeyboardBackspaceIcon style={{cursor: "pointer"}} onClick={backHandler} />
              <SummaryTitle>Enter Your Details</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Full Name</SummaryItemText>
                <Input onChange={(e) => setName(e.target.value)} value={name} />
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Address</SummaryItemText>
                <Input onChange={(e) => setAddress(e.target.value)} value={address} />
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Mobile</SummaryItemText>
                <Input onChange={(e) => setMobile(e.target.value)} value={mobile} />
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>{cart.total} Rs</SummaryItemPrice>
              </SummaryItem>
              <Button onClick={order}>Checkout Now</Button>
            </Summary>
          )}
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
