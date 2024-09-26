import styled from "styled-components";

import {
  MainTitle_24_m,
  Paragraph_20_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles";

// Layout
export const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &.loginWrapper {
    background: var(--color-light-gray-02);
  }
  &.signupWrapper {
    background: var(--color-white);
  }
`;
export const Inner = styled.article`
  width: 1050px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;
export const Logo = styled.div`
  height: 26px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 40px;
  border-radius: var(--border-radius-30);
  box-shadow: var(--box-shadow-02);
  &.loginFormContainer {
    background: var(--color-white);
  }
  &.signupFormContainer {
    background: var(--color-light-gray-02);
  }
`;

// Form
export const FormTitle = styled.h3`
  ${MainTitle_24_m}
  text-align: center;
  margin-bottom: 30px;
`;
export const FormItemTitle = styled.h5`
  ${Paragraph_20_n}
`;
export const FormItemDesc = styled.p`
  ${SubDescription_16_n}
  margin: 10px 0;
  color: var(--color-gray-01);
`;
