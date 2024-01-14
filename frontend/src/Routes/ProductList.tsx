import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import NewsLetter from "../Components/NewsLetter";
import { mobile } from "../responsive";
import { useParams } from "react-router";
import { useState } from "react";



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
  ${mobile({ flexDirection: "column", justifyContent: "center" })}
`;

const Select = styled.select`
  padding: 0.5rem;
  border: solid 1px lightgrey;
  cursor: pointer;
`;

const Option = styled.option`
  cursor: pointer;
`;

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const category = useParams().category;




  const options = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target?.value;
    setFilters({
      ...filters,
      [e?.target?.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <p>Filter Products</p>
          <Select name="color" defaultValue={"Color"} onChange={options}>
            <Option>Color</Option>
            <Option>Red</Option>
            <Option>Brown</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
            <Option>White</Option>
            <Option>Black</Option>
          </Select>{" "}
          <Select name="size" defaultValue={"Size"} onChange={options}>
            <Option>Size</Option>
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
          <Select
            defaultValue={"Sort"}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSort(e.target.value)
            }
          >
            <Option disabled>Sort</Option>
            <Option>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>{" "}
        </Filter>
      </FilterContainer>
      <Products category={category} filters = {filters} sort = {sort} />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;
