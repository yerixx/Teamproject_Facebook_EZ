import React from "react";
import styled from "styled-components";
import HeaderlogoImg from "../img/HeaderLogo.svg";
import Form from "../components/login/Form";

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-white);
`;
const Inner = styled.article`
  width: 1050px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;
const Logo = styled.div`
  height: 26px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 40px;
  background: var(--color-light-gray-02);
  border-radius: var(--border-radius-30);
  box-shadow: var(--box-shadow-02);
`;

const Signup = () => {
  return (
    <Wrapper>
      <Inner>
        <Logo>
          <img src={HeaderlogoImg} alt="Logo" />
        </Logo>
        <FormContainer>
          <Form />
          <Form />
        </FormContainer>
      </Inner>
    </Wrapper>
  );
};

export default Signup;
