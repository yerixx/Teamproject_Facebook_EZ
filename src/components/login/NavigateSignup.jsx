import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormItemDesc, Button } from "./login-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  a {
    width: 100%;
  }
`;

const NavigateSignup = () => {
  return (
    <Wrapper>
      <FormItemDesc>아직 계정이 없으신가요?</FormItemDesc>
      <Link to={"/signup"}>
        <Button>새 계정 만들기</Button>
      </Link>
    </Wrapper>
  );
};

export default NavigateSignup;
