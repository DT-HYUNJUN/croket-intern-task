import { memo } from "react";
import styled from "styled-components";

interface Props {
  text: string;
  onClick?: () => void;
}

const MyButton = (props: Props) => {
  return <Button onClick={props.onClick}>{props.text}</Button>;
};

export default memo(MyButton);

const Button = styled("button")({
  padding: "8px 12px",
  borderRadius: 4,
  border: 0,
  backgroundColor: "#752eff",
  color: "white",
  "&:hover": {
    cursor: "pointer",
  },
});
