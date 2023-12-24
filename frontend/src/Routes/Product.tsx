import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {mobile } from "../responsive";

interface bg {
  bg: string;
}

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  color: #000000;
  ${mobile({flexDirection: "column"})}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({padding: ".5rem", marginTop: ".5rem"})}
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
  ${mobile({padding: "1.5rem"})}
`;

const Title = styled.h1`
    font-size: 4rem;
    ${mobile({fontSize: "3rem"})}
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
    gap: .5rem;
    `;

const SizeTitle = styled.p`
    font-size: 1.4rem;
`;

const Select = styled.select`
    border: 1px solid lightgrey;
    padding: .5rem;
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
`

const CounterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: .6rem;
`

const Counter = styled.div`
    border: solid 1px green;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`

const Button = styled.button`
    background: none;
    border: solid 1px green;
    padding: 0.7rem;
    cursor: pointer;

    &:hover {
        background-color: green;
        color: black;
    }
`

const Product = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Left>
          <Image src="https://i.ibb.co/S6qMxwr/jean.jpg" />
        </Left>
        <Right>
          <Title>Denim Jumpsuit</Title>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, quasi qui. Nobis quos, libero aliquam quia dignissimos rem quam quisquam atque placeat accusamus earum dicta, veritatis ad sint tempora id! Laudantium quasi nam nesciunt optio dolor voluptatem possimus impedit repellendus.
          </Desc>
          <Price> INR 999 /-</Price>
          <Info>
            <Colors>
              <ColorTitle>Colors : </ColorTitle>
              <Color bg="black" />
              <Color bg="blue" />
              <Color bg="grey" />
            </Colors>
            <Size>
                <SizeTitle>Size : </SizeTitle>
                <Select>
                    <Option selected disabled>Size</Option>
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
                <RemoveIcon style={{cursor: "pointer"}} />
                <Counter>1</Counter>
                <AddIcon style={{cursor: "pointer"}} />
            </CounterContainer>
            <Button>Add To Cart</Button>
          </LowerContainer>

        </Right>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
