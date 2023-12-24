import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import NewsLetter from "../Components/NewsLetter";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 2.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2.5rem;
`;

const Filter = styled.div`
  ${mobile({flexDirection: "column", justifyContent: "center"})}
`;

const Select = styled.select`
    padding: .5rem;
    border: solid 1px lightgrey;
    cursor: pointer;
`;

const Option = styled.option`
    cursor: pointer;
`;

const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <p>Filter Products</p>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>Red</Option>
            <Option>Black</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
            <Option>White</Option>
            <Option>Black</Option>
          </Select>{" "}
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
            <Option>XXXL</Option>
          </Select>{" "}
        </Filter>
        <Filter>
          <p>Sort Products :</p>
          <Select>
            <Option selected>
              Newest
            </Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>{" "}
        </Filter>
      </FilterContainer>
      <Products />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;
