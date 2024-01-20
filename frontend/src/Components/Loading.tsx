import { CircularProgress } from "@mui/material"
import Announcement from "./Announcement"
import Footer from "./Footer"
import Navbar from "./Navbar"
import NewsLetter from "./NewsLetter"
import styled from "styled-components"

const Container = styled.div`
    
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10rem;
    gap: 5rem;
`

const Loading = () => {
  return (
    <Container>
        <Announcement />
        <Navbar />
        <Wrapper>
        <h1>Please Wait While the App is Loading</h1>
        <p>This is happening because the app is hosted for free and the initial request is slow.</p>
        <CircularProgress />
        </Wrapper>
        <NewsLetter />
        <Footer />
    </Container>
  )
}

export default Loading