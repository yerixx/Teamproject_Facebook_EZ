import styled from "styled-components";

import {
  MainTitle_24_m,
  Paragraph_20_n,
  SubDescription_16_n,
  MainTitle_18_b,
} from "../../styles/GlobalStyles.styles";

import checkImg from "/img/check.svg";
import calendarImg from "/img/calendar-icon.svg";

// Common
export const Logo = styled.div`
  height: 30px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media screen and (max-width: 768px) {
    height: 67px;
  }
`;
export const Button = styled.button`
  width: 430px;
  padding: 10px 15px;
  ${MainTitle_18_b};
  letter-spacing: -1px;
  border: 1px solid var(--color-gray-01);
  border-radius: var(--border-radius-08);
  background: var(--color-white);
  color: var(--color-gray-01);
  cursor: pointer;
  transition: all 0.3s;
  &:hover,
  &:active {
    border: 1px solid var(--color-facebookblue);
    color: var(--color-facebookblue);
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 50px;
  }
`;

// Layout
export const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-light-gray-02);
  @media screen and (max-width: 768px) {
    background: var(--color-white);
  }
`;
export const Inner = styled.article`
  width: 1050px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 390px;
    min-width: 390px;
    padding: 0 15px;
  }
`;
export const FormContainer = styled.div`
  width: 1050px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  background: var(--color-white);
  border-radius: var(--border-radius-30);
  box-shadow: var(--box-shadow-02);
  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    padding: 0;
    box-shadow: none;
  }
`;

// Form Items
export const Form = styled.form`
  width: 430px;
  height: ${({ height }) => `${height}px`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    justify-content: center;
    gap: 15px;
  }
`;
export const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 20px;
  li {
    p {
      margin: 5px 0;
      line-height: 1.2;
    }
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 0;
  }
`;
export const InputWrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const InputWrapperRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Input = styled.input`
  width: ${({ width }) => `${width}px`};
  height: 46px;
  padding: 10px 15px;
  border: 1px solid var(--color-gray-02);
  border-radius: var(--border-radius-08);
  ${SubDescription_16_n}
  transition: all 0.3s;
  &::placeholder {
    color: var(--color-gray-02);
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    outline: none;
    border: 1px solid var(--color-facebookblue);
    &::placeholder {
      opacity: 0;
    }
  }
  &[type="submit"] {
    ${MainTitle_18_b}
    font-weight: 500;
    border: 1px solid transparent;
    background: var(--color-facebookblue);
    color: var(--color-white);
    cursor: pointer;
    line-height: 1;
    transition: all 0.3s;
    &:hover {
      background: var(--color-hoverblue);
    }
    &.disabled {
      opacity: 0.8;
    }
    @media screen and (max-width: 768px) {
      border-radius: 50px;
    }
  }
  &[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid var(--color-gray-02);
    cursor: pointer;
    &:checked {
      background: url(${checkImg}) center/contain no-repeat;
      box-shadow: 0 0 0 transparent;
    }
  }
  &[type="date"] {
    position: relative;
    background: var(--color-white) url(${calendarImg}) no-repeat right 15px
      center / 22px auto;
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      color: transparent;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const FormTitle = styled.h3`
  ${MainTitle_24_m}
  text-align: center;
  @media screen and (max-width: 768px) {
    margin-bottom: 0;
    ${Paragraph_20_n};
    font-weight: 500;
  }
`;
export const FormDesc = styled.p`
  ${MainTitle_18_b}
  font-weight: 500;
  color: var(--color-gray-01);
  text-align: center;
`;
export const FormItemTitle = styled.h5`
  ${Paragraph_20_n}
`;
export const FormItemDesc = styled.p`
  ${SubDescription_16_n}
  color: var(--color-gray-01);
`;
export const Pager = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid transparent;
    background: var(--color-gray-02);
    cursor: pointer;
    transition: all 0.3s;
    &.active {
      border: 2px solid var(--color-gray-01);
      background: var(--color-white);
    }
  }
`;
