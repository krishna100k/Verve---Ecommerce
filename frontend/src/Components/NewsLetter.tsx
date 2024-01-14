import styled from "styled-components"
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {mobile} from "../responsive"


const Container = styled.div`
    width: 100%;
    background-color: #fbf0f4 ;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    gap: 2rem;
    margin-top: 3rem;
`

const Title = styled.h1`
    font-size: 6rem;
    ${mobile({fontSize: "15vw"})}

`

const Description = styled.p`
    font-size: 1.2rem;
    ${mobile({fontSize: "3vw"})}
`

const InputContainer = styled.div`
    width: 40vw;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
    border: solid 1px lightgrey;
    width: 100%;
    height: 2rem;
    background-color: #f5fafd;
    padding-left: 1rem;
    
`

const Button = styled.button`
    background: #00d300;
    border: none;
    color: white;
    height: 2rem;
    width: 5rem;
    cursor: pointer;
    
`

const NewsLetter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Description>Get timely updates from your favourite products.</Description>
        <InputContainer>
        <Input placeholder="Email" />
        <Button><SendRoundedIcon /></Button>
        </InputContainer>


    </Container>
  )
}

export default NewsLetter