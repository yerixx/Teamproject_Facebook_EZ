import React from "react";
import HeaderlogoImg from "../img/HeaderLogo.svg";
import { SignupForm } from "../components/login/Form";
import {
  Wrapper,
  Inner,
  Logo,
  FormContainer,
} from "../components/login/login-components";

const Signup = () => {
  return (
    <Wrapper className="signupWrapper">
      <Inner>
        <Logo>
          <img src={HeaderlogoImg} alt="Logo" />
        </Logo>
        <FormContainer className="signupFormContainer">
          <SignupForm />
          <SignupForm />
        </FormContainer>
      </Inner>
    </Wrapper>
  );
};

export default Signup;
