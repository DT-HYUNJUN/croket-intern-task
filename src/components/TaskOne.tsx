import { useState } from "react";
import styled from "styled-components";
import MyButton from "./common/MyButton";
import TopLeft from "./taskOne/position/TopLeft";
import TopRight from "./taskOne/position/TopRight";
import BottomLeft from "./taskOne/position/BottomLeft";
import BottomRight from "./taskOne/position/BottomRight";
import HomeButton from "./common/HomeButton";

const TaskOne = () => {
  const [counter, setCounter] = useState(0);

  const onClick = () => {
    if (counter === 20) window.alert("그만~");
    else setCounter((prev) => prev + 1);
  };

  return (
    <Container>
      <HomeButton />
      <Box>
        <div>
          <MyButton text="test" />
        </div>
        <div>
          <MyButton text={`${counter} +`} onClick={onClick} />
        </div>
        <div>
          <TriangleBox>
            <TopLeft counter={counter} />
            <TopRight counter={counter} />
          </TriangleBox>
          <TriangleBox>
            <BottomLeft counter={counter} />
            <BottomRight counter={counter} />
          </TriangleBox>
        </div>
      </Box>
    </Container>
  );
};

export default TaskOne;

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 100,
  gap: 20,
});

const Box = styled("div")({
  backgroundColor: "black",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  width: 1000,
  gap: 20,
  color: "white",
  borderRadius: 10,
});

const TriangleBox = styled("div")({
  display: "flex",
});
