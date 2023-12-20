import styled from "styled-components"



const Container = styled.div`
width: 100%;
height: 2.3rem;
background-color: teal;
display: flex;
justify-content: center;
align-items: center;
`

const Text = styled.p`
text-align: center;
color: white;
`




const Announcement = () => {
  return (
    <Container>
        <Text>Super Deal ! Get 1 Rupee Product for 2 Rupee</Text>
    </Container>
  )
}

export default Announcement