import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
const Logo = styled.img`
  width: 210px;
`;
const LoginFrame = styled.div`
  background: var(--color-white);
  padding: 80px 60px;
  border: 1px solid #f00;
  border-radius: var(--border-radius-30);
`;

const Login = () => {
  return (
    <Wrapper>
      <Logo />
      <LoginFrame></LoginFrame>
    </Wrapper>
  );
};

export default Login;
