import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import axios from "axios";
import url from "../url";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";



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
}

interface ProductsProps {
  category: string | undefined;
  filters: {
    color?: string;
    size?: string;
  };
  sort?: string;
  home?: boolean;
}

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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* align-items: center; */
  gap: 0.8rem;
`;

const Boxes = styled.div`
  width: 25rem;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5fafd;
  position: relative;

  &:hover ${Modal} {
    opacity: 1;
  }
`;
const Image = styled.img`
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 100%;
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

const Title = styled.h3`
  align-self: flex-start;
  padding: 15px 0px 0px 0px;
  font-weight: 300;
`;

const Products: React.FC<ProductsProps> = ({
  category,
  filters,
  sort,
  home,
}) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (category == "all") {
          const response = await axios.get(url + "/product/find");
          setProducts(response.data);
        } else {
          const response = await axios.get(
            url + `/product/find?category=${category}`
          );
          setProducts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, filters]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) => {
        if (
          (!filters?.color ||
            filters?.color === "Color" ||
            item.color.toLowerCase().includes(filters.color.toLowerCase())) &&
          (!filters?.size ||
            filters?.size === "Size" ||
            item.size.includes(filters.size))
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "Newest") {
      setFilteredProducts((prevState) => {
        return [
          ...prevState.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
        ];
      });
    } else if (sort === "Price (asc)") {
      setFilteredProducts((prevState) => {
        return [...prevState.sort((a, b) => a.price - b.price)];
      });
    } else {
      setFilteredProducts((prevState) => {
        return [...prevState.sort((a, b) => b.price - a.price)];
      });
    }
  }, [filters, sort]);

  const handleView = (id: string) => {
    navigate(`/product/${id}`);
  };

  const userId = useSelector(
    (state: { user: { user: { user: { _id: string } } } }) =>
      state?.user?.user?.user?._id
  );

  const token = localStorage.getItem("token");

  const addToWish = async (
    productId: string,
    productImg: string,
    productTitle: string,
    productSize: string,
    productColor: string
  ) => {
    const options = {
      productId,
      productImg,
      productTitle,
      productSize,
      productColor,
    };


    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      if (userId) {
        const response = await axios.post(`${url}/wish/${userId}`, options, {
          headers,
        });
        console.log(response);
        alert("Added To Wishlist !")
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (

    <Container>
      {products.length === 0 && <CircularProgress />}
      {home
        ? filteredProducts.slice(0, 8).map((product: Product) => {

          const imagePath = `${url}/uploads/${product.img}`

            return (
              <Boxes key={product._id}>
                <Image src={ imagePath} />
                <Modal>
                  <Icon>
                    <ShoppingCartOutlinedIcon
                      onClick={() => navigate("/cart")}
                    />
                  </Icon>
                  <Icon>
                    <SearchOutlinedIcon
                      onClick={() => handleView(product._id)}
                    />
                  </Icon>
                  <Icon>
                    <FavoriteBorderOutlinedIcon
                      onClick={() =>
                        addToWish(
                          product._id,
                          product.img,
                          product.title,
                          product.size,
                          product.color
                        )
                      }
                    />
                  </Icon>
                </Modal>
              </Boxes>
            );
          })
        : filteredProducts.map((product: Product) => {

          const imagePath = `${url}/uploads/${product.img}`
            return (
              <Boxes key={product._id}>
                <Image src={imagePath} />
                <Title>{product.title || product.img}</Title>
                <Modal>
                  <Icon>
                    <ShoppingCartOutlinedIcon />
                  </Icon>
                  <Icon>
                    <SearchOutlinedIcon
                      onClick={() => handleView(product._id)}
                    />
                  </Icon>
                  <Icon>
                    <FavoriteBorderOutlinedIcon
                      onClick={() =>
                        addToWish(
                          product._id,
                          product.img,
                          product.title,
                          product.size,
                          product.color
                        )
                      }
                    />
                  </Icon>
                </Modal>
              </Boxes>
            );
          })}
    </Container>
  );
};

export default Products;
