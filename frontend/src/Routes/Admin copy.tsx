import styled from "styled-components"
import AdminNavbar from "../Components/AdminNavbar"
import AdminSidebar from "../Components/AdminSidebar"
import { useState } from "react"


const Container = styled.div`
  width: 100%;
  height: 100vh;
`

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
`
const Main = styled.div`
/* border: solid 1px; */
width: 90%;
flex: 4;
`




const Admin = () => {

  const [sideBar, setSideBar] = useState<boolean>(false)

  return (

      <Container >
        <AdminNavbar setSideBar={setSideBar} sideBar={sideBar}/>
        <Wrapper>
        <AdminSidebar sideBar = {sideBar} />
        <Main>
        </Main>
        </Wrapper>
      </Container>

  )
}




export default Admin