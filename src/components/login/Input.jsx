import React from "react";
import styled from "styled-components";
import {
  MainTitle_18_b,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles";

const InputItem = styled.input`
  width: ${({ width }) => `${width}px`};
  padding: 10px 15px;
  border: 1px solid var(--color-gray-02);
  border-radius: var(--border-radius-08);
  ${SubDescription_16_n}
  transition: box-shadow 0.3s;
  &::placeholder {
    color: var(--color-gray-02);
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    box-shadow: var(--box-shadow-02);
    outline: none;
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
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const onChange = () => {};

const Input = ({ name, type, value, placeholder, required, width }) => {
  return (
    <InputItem
      name={name}
      type={type}
      value={value}
      placeholder={placeholder || ""}
      required={required || "boolean"}
      width={width}
      onChange={onChange}
    ></InputItem>
  );
};

export default Input;
