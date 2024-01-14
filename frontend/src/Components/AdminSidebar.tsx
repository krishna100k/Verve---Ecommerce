import { useNavigate } from "react-router";
import styled from "styled-components";

interface ContainerProps {
  sideBar: boolean;
}

interface Props {
  sideBar: boolean;
}

const Container = styled.div<ContainerProps>`
  height: 100vh;
  flex: ${(props) => (props.sideBar ? 1  : 0)};
  width: ${(props) => (props.sideBar ? "20rem" : "0px")} ;
  background-color: teal;
  transition: width 0.5s ease;

  display: flex;
  justify-content: center;

  overflow: hidden;
  position: fixed;
  z-index: 1;
`;

const List = styled.p`
    
`;

const ListWrapper = styled.div`
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: white;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
    transition: ease .2s;
  &:hover{
    background-color: rgba(0,0,0,0.2);
  }
  padding: 1rem;
  border-radius: 10px;
`;

const AdminSidebar: React.FC<Props> = ({ sideBar }) => {

    const navigate = useNavigate();

  return (
    <Container sideBar={sideBar}>
      <ListWrapper>
        <Content onClick={() => navigate("/hpanel/orders")}>
          <List>Orders</List>
        </Content>
        <Content onClick={() => navigate("/hpanel/products")}>
          <List>Products</List>
        </Content>
        <Content onClick={() => navigate("/hpanel/addproduct")}>
          <List>Add Products</List>
        </Content>
      </ListWrapper>
    </Container>
  );
};

export default AdminSidebar;
