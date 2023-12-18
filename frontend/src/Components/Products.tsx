import styled from "styled-components";
import { popularProducts } from "../data";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Modal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  opacity: 0;
`;

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;


`;

const Boxes = styled.div`
  width: 25rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5ebee;
  position: relative;
  
  &:hover ${Modal}{
    opacity: 1;
  }
`;
const Image = styled.img`
  object-fit: contain;
  width: 75%;
  height: 75%;
`;


const Icon = styled.div`
  background-color: white;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  aspect-ratio: 1/1;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const Products = () => {
  return (
    <Container>
      {popularProducts.map((product) => {
        return (
          <Boxes key={product.id}>
            <Image src={product.img} />
            <Modal>
              <Icon>
                <ShoppingCartOutlinedIcon />
              </Icon>
              <Icon>
                <SearchOutlinedIcon />
              </Icon>
              <Icon>
                <FavoriteBorderOutlinedIcon />
              </Icon>
            </Modal>
          </Boxes>
        );
      })}
    </Container>
  );
};

export default Products;
