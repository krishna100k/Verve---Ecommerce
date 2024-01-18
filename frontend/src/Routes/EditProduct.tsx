import styled from "styled-components";
import AdminNavbar from "../Components/AdminNavbar";
import AdminSidebar from "../Components/AdminSidebar";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import url from "../url";
import { Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router";

interface ContainerProps {
  sideBar: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
const Main = styled.div<ContainerProps>`
  /* border: solid 1px; */
  height: 100%;
  width: 90%;
  flex: 6;
  padding-left: 1rem;
  position: relative;
  margin-top: 4rem;
  margin-left: ${(props) => (props.sideBar ? "19vw" : "0px")};
  transition: all 0.5s ease-in-out;

  &::-webkit-scrollbar {
    width: 6px; /* Chrome, Safari, Opera */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Chrome, Safari, Opera */
  }

  @media (max-width: 1636px) {
  margin-left: ${(props) => (props.sideBar ? "22vw" : "0px")};
  }

  @media (max-width: 1432px) {
  margin-left: ${(props) => (props.sideBar ? "25vw" : "0px")};
  }

  @media (max-width: 1244px) {
  margin-left: ${(props) => (props.sideBar ? "30vw" : "0px")};
  }

  @media (max-width: 1044px) {
  margin-left: ${(props) => (props.sideBar ? "35vw" : "0px")};
  }

  @media (max-width: 884px) {
  margin-left: ${(props) => (props.sideBar ? "46vw" : "0px")};
  }

  @media (max-width: 670px) {
  margin-left: 0px;
  }

`;

const Header = styled.p`
  font-weight: lighter;
  font-size: 2rem;
  padding: 1rem;
`;

const Box = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
`;

const Label = styled.p`
  color: #a09f9f;
`;

const Upload = styled.input``;
const TextInput = styled.input``;

const TextArea = styled.textarea``;

const Select = styled.select``;

const Option = styled.option``;

const Button = styled.input`
  border: none;
  background: teal;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
`;

const Add = styled.button`
  border: none;
  background: teal;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
`;

const CategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Category = styled.p``;

const Image = styled.img`
  width: 10%;
  height: 10%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
  
`;


const EditProduct = () => {
  const [sideBar, setSideBar] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [size, setSize] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("true");
  const [image, setImage] = useState<null | File>(null);
  const [img, setImg] = useState<string | undefined>("");
  const [currentImg, setCurrentImg] = useState<null | string>(null)

  const [message, setMessage] = useState<string>("");


  const id = useParams().productId;

  useEffect(() => {
    const fetchProduct = async () => {
      try{
        const response = await axios.get(`${url}/product/find/${id}`);
        console.log(response?.data)
        setSize(response.data?.size)
        setCategories(response.data?.categories)
        setName(response.data?.title)
        setDesc(response.data?.desc);
        setColor(response.data?.color);
        setPrice(response.data?.price)
        setStock(response.data?.inStock)
        setCurrentImg(response.data?.img)
      }catch(err){
        console.log(err);
      }
    }
    fetchProduct();
  }, [])

  const addCategory = (e: FormEvent) => {
    e.preventDefault();
    if (category.length <= 0) {
      return;
    }
    setCategories((prevState) => {
      return [...prevState, category];
    });
  };

  

  const removeCategory = (i: number) => {
    let element = categories[i];
    let filteredCategories = categories.filter((category) => {
      return category !== element;
    });
    setCategories(filteredCategories);
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e?.target?.files[0];
    setImage(file)

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImg(fileReader.result as string);
    };

  };


  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem(`token`);

    if (name === "") {
      setMessage("Name is required!");
      return;
    } else if (desc === "") {
      setMessage("Description is required!");
      return;
    } else if (categories.length <= 0) {
      setMessage("Category is required!");
      return;
    } else if (size === "") {
      setMessage("Size is required!");
      return;
    } else if (color === "") {
      setMessage("Color is required!");
      return;
    } else if (price === "") {
      setMessage("Price is required!");
      return;
    } else if (stock === "") {
      setMessage("Stock is required!");
      return;
    }


    const formData = new FormData();
    formData.append("title", name);
    formData.append("desc", desc);
    image && formData.append("image", image);
    formData.append('categories', categories.join(','));
    formData.append("size", size);
    formData.append("color", color);
    formData.append("price", price);
    formData.append("inStock", stock);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.put(`${url}/product/update/${id}`, formData, {
        headers,
      });
      console.log(response);
      setMessage("");
      alert("Product Edited Successfully");
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <Container>
      <AdminNavbar setSideBar={setSideBar} sideBar={sideBar} />
      <Wrapper>
        <AdminSidebar sideBar={sideBar} setSideBar= {setSideBar} />
        <Main sideBar={sideBar}>
          <Header>Edit Product</Header>
          <Box>
            {message !== "" && <Alert severity="warning">{message}</Alert>}
            <ImageContainer>
            <Label>Current Image</Label>
            <Image src={`${url}/uploads/${currentImg}`} alt="Upload An Image" />
            <Label>Updated Image</Label>
            <Image src={img} alt="Upload An Image" />
            </ImageContainer>
            <Upload
              onChange={fileHandler}
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png .webp"
            />
            <Label>Name</Label>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} />
            <Label>Description</Label>
            <TextArea value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Label>Categories</Label>
            <TextInput
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Add onClick={addCategory}>Add</Add>
            {categories.map((category, i) => {
              return (
                <CategoryDiv key={i}>
                  <Category>{category}</Category>
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => removeCategory(i)}
                  />
                </CategoryDiv>
              );
            })}
            <Label>Size</Label>
            <Select onChange={(e) => setSize(e.target.value)}>
              <Option>Size</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              <Option>XXL</Option>
            </Select>
            <Label>Color</Label>
            <TextInput
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Label>Price</Label>
            <TextInput
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              value={price}
            />
            <Label>InStock</Label>
            <Select onChange={(e) => setStock(e.target.value)}>
              <Option disabled={true}>InStock</Option>
              <Option>true</Option>
              <Option>false</Option>
            </Select>
            <Button onClick={submitHandler} type="submit" />
          </Box>
        </Main>
      </Wrapper>
    </Container>
  );
};

export default EditProduct;
