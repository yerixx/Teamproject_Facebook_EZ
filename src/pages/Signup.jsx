import React from "react";
import HeaderlogoImg from "../img/HeaderLogo.svg";
import { SignupForm, AdditionalForm } from "../components/login/Form";
import {
  Wrapper,
  Inner,
  Logo,
  FormContainer,
} from "../components/login/login-components";
import LoadingScreen from "../components/LoadingScreen";

const Signup = () => {
  return (
    <Wrapper className="signupWrapper">
      {/* <Inner>
        <Logo>
          <img src={HeaderlogoImg} alt="Logo" />
        </Logo>
        <FormContainer className="signupFormContainer">
          <SignupForm />
          <AdditionalForm />
        </FormContainer>
      </Inner> */}
      <LoadingScreen />
    </Wrapper>
  );
};

export default Signup;
