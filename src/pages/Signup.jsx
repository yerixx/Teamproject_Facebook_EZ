import React from "react";
import styled from "styled-components";
import HeaderlogoImg from "../img/HeaderLogo.svg";
import SignupForm from "../components/login/SignupForm";
import AdditionalForm from "../components/login/AdditionalForm";
import SignupCategory from "../components/login/SignupCategory";
import {
  Inner,
  Logo,
  FormContainer,
} from "../components/login/login-components";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  background: var(--color-light-gray-02);
`;

const Signup = () => {
  return (
    <Wrapper>
      <Inner>
        <Logo>
          <img src={HeaderlogoImg} alt="Logo" />
        </Logo>
        <FormContainer>
          <SignupForm />
          <AdditionalForm />
          {/* <SignupCategory /> */}
        </FormContainer>
      </Inner>
    </Wrapper>
  );
};

export default Signup;
