import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Box>
        <LinkButton to="task/1">과제1</LinkButton>
        <LinkButton to="task/2">과제2</LinkButton>
      </Box>
    </Container>
  );
};

export default Home;

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: 200,
});

const Box = styled("div")({
  display: "flex",
  justifyContent: "space-evenly",
  gap: 20,
  width: 200,
  backgroundColor: "lightGrey",
  borderRadius: 10,
  padding: `40px 30px`,
});

const LinkButton = styled(Link)({
  color: "black",
  textDecoration: "none",
  padding: 20,
  borderRadius: 10,
  backgroundColor: "white",
});
