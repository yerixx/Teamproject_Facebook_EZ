import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import NavigateSignup from "./NavigateSignup";

const Wrapper = styled.div`
  width: 430px;
  height: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const AccountLogin = () => {
  return (
    <Wrapper>
      <LoginForm />
      <NavigateSignup />
    </Wrapper>
  );
};

export default AccountLogin;
