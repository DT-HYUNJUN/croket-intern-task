import { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeButton = () => {
  return <LinkButton to="/">홈</LinkButton>;
};

export default memo(HomeButton);

const LinkButton = styled(Link)({
  color: "white",
  textDecoration: "none",
  padding: "16px 24px",
  borderRadius: 10,
  backgroundColor: "black",
});
