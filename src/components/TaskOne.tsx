import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MyButton from "./MyButton";

const TaskOne = () => {
  const [counter, setCounter] = useState(0);
  const [rows, setRows] = useState<number[]>([]);
  const [cols, setCols] = useState<number[]>([]);

  const onClick = () => {
    if (counter === 20) window.alert("그만~");
    else {
      setCounter((prev) => prev + 1);
      setRows([...rows, 0, 0]);
      setCols([...cols, 0, 0]);
    }
  };

  return (
    <Container>
      <Box>
        <div>
          <LinkButton to="/">홈</LinkButton>
        </div>
        <div>
          <MyButton text="test" onClick={onClick} />
        </div>
        <div>
          <MyButton text={`${counter} +`} onClick={onClick} />
        </div>

        <div>
          {rows.map((row, index) => (
            <PinWheel key={index}>
              {cols.map((col, index) => (
                <div key={index}>⭐</div>
              ))}
            </PinWheel>
          ))}
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
  marginTop: 200,
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
});

const PinWheel = styled("div")({
  display: "flex",
});

const LinkButton = styled(Link)({
  color: "black",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: 10,
  backgroundColor: "white",
});
