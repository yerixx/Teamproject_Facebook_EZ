import React from "react";
import styled from "styled-components";
import HeaderlogoImg from "../img/HeaderLogo.svg";
import LoginForm from "../components/login/LoginForm";
import OtherLogin from "../components/login/OtherLogin";
import {
  Inner,
  Logo,
  FormContainer,
} from "../components/login/login-components";
import LoadingScreen from "../components/common/LoadingScreen";

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-light-gray-02);
`;

const Login = () => {
  return (
    <Wrapper>
      <Inner>
        <Logo>
          <img src={HeaderlogoImg} alt="Logo" />
        </Logo>
        <FormContainer>
          <LoginForm />
          <OtherLogin />
        </FormContainer>
        {/* <LoadingScreen /> */}
      </Inner>
    </Wrapper>
  );
};

export default Login;
