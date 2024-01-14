import styled from "styled-components";
import { Facebook, Instagram, Twitter, Pinterest } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { mobile } from "../responsive";

interface socialColor {
  bg: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column", alignItems: "flex-start" })}
`;
const Left = styled.div`
  display: flex;
  gap: 1.7rem;
  flex-direction: column;
  flex: 1;
  width: auto;
  padding: 2rem;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  flex: 1;
  width: auto;
  padding: 2rem;
`;
const Right = styled.div`
  flex: 1;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem;
`;

//Left

const Logo = styled.h1``;

const Description = styled.p``;

const Socials = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const SocialIcon = styled.div<socialColor>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #${(props) => props.bg};
  border-radius: 100%;
  padding: 0.3rem;
  cursor: pointer;
`;

//Center

const Title = styled.h3``;

const List = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 10rem;
`;

const ListItem = styled.li`
  width: 50%;
  cursor: pointer;
`;

//Right

const ContactTitle = styled.h3``;

const Address = styled.p``;

const Contact = styled.p``;

const Email = styled.p``;

const Payments = styled.img``;

const Info = styled.div`
  display: flex;
  gap: 1rem;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>HibernationCave.</Logo>
        <Description>
          Embrace comfort in style. At Hibernation Cave, we believe in curating
          a collection of clothing that goes beyond fashion trends – we're
          dedicated to providing you with comfortable, cozy pieces that make you
          feel at home wherever you go. Explore our range and experience the joy
          of comfort fused with timeless style. Your journey to relaxation
          begins here.
        </Description>
        <Socials>
          <SocialIcon bg="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon bg="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon bg="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon bg="E60023">
            <Pinterest />
          </SocialIcon>
        </Socials>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Mens Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>WishList</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Womans Fashion</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <ContactTitle>Contact</ContactTitle>
        <Info>
          <LocationOnIcon />
          <Address>Hadapsar, Pune, Maharashtra</Address>
        </Info>
        <Info>
          <CallIcon />
          <Contact>+91 9604786452</Contact>
        </Info>
        <Info>
          <EmailIcon />
          <Email>Contact@HibernationCave.com</Email>
        </Info>
        <Payments src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
