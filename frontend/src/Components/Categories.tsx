import styled from "styled-components"
import { categories } from "../data"

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  position: relative;
  padding: 1rem;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const Title = styled.h1`
color: white;
word-wrap: break-word;

`
const Button = styled.button`
  border: none;
  background-color: white;
  padding: .5rem;
  cursor: pointer;

  &:hover{
    background-color: #e1d2d2;
  }
`

const Boxes = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .5rem;
`


const Categories = () => {
  return (
    <Container>
      {categories.map((item, i) => {
        return(
          <Boxes>
          <Image key={i} src={item.img} />
          <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
          </Info>
          </Boxes>
        )
      })}
    </Container>
  )
}

export default Categories