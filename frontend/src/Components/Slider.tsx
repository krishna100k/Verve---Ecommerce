import styled from "styled-components";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { useState } from "react";
import { sliderItems } from "../data";

import {mobile} from "../responsive"

interface ArrowProps {
  direction?: string;
}

interface wrapperProps {
  slider: number;
}

interface bgProps{
  bg: string;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: #b0ecec; */
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
`;
const Arrow = styled.div<ArrowProps>`
  position: absolute;
  top: 50%;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  opacity: 0.7;
  background-color: #c7c7c7;
  border-radius: 100%;
  width: 3rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`;

const Wrapper = styled.div<wrapperProps>`
  width: 100vw;
  height: 100vh;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slider * -100}%);
`;

const Slide = styled.div<bgProps>`
  width: 100%;
  min-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bg};
  ${mobile({gap : ".5rem"})}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 2.5rem;
`;

const Image = styled.img`
  width: 40vh;
  ${mobile({width : "16rem"})}
`;

const Title = styled.h1`
  font-size: 6rem;
  ${mobile({fontSize: "3rem"})}
`;

const Para = styled.p`
  font-size: 2rem;
`;

const Button = styled.button`
  background: none;
  border: solid 1px;
  cursor: pointer;
  width: 7rem;
  height: 2.5rem;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const Slider = () => {
  const [slider, setSlider] = useState(0);

  const handleClick = (direction: string) => {
    if (direction === "left") {
      setSlider(slider > 0 ? slider - 1 : 2);
    } else {
      setSlider(slider < 2 ? slider + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <KeyboardDoubleArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper slider={slider}>
        {sliderItems.map((item) => {
          return (
            <>
              <Slide bg={item.bg}>
                <ImgContainer>
                  <Image src={item.img} />
                </ImgContainer>
                <InfoContainer>
                  <Title>{item.title}</Title>
                  <Para>{item.desc}</Para>
                  <Button>SHOW NOW</Button>
                </InfoContainer>
              </Slide>
            </>
          );
        })}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <KeyboardDoubleArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
