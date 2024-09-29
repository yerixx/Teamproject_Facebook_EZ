import React from "react";
import styled from "styled-components";
import HeaderlogoImg from "../img/HeaderLogo.svg";
import { LoginForm } from "../components/login/Form";
import OtherLogin from "../components/login/OtherLogin";
import {
  Wrapper,
  Inner,
  Logo,
  FormContainer,
} from "../components/login/login-components";

const Login = () => {
  return (
    <Wrapper className="loginWrapper">
      <Inner>
        <Logo>
          <img src={HeaderlogoImg} alt="Logo" />
        </Logo>
        <FormContainer className="loginFormContainer">
          <LoginForm />
          <OtherLogin />
        </FormContainer>
      </Inner>
    </Wrapper>
  );
};

export default Login;
