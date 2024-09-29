import React from "react";
import styled from "styled-components";
import {
  MainTitle_18_b,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles";
import checkImg from "../../img/check.svg";

const InputItem = styled.input`
  width: ${({ width }) => `${width}px`};
  padding: 10px 15px;
  border: 1px solid var(--color-gray-02);
  border-radius: var(--border-radius-08);
  ${SubDescription_16_n}
  color: var(--color-gray-02);
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
const Label = styled.label`
  width: 210px;
  height: 46px;
  padding: 15px;
  border: 1px solid var(--color-gray-02);
  border-radius: var(--border-radius-08);
  ${SubDescription_16_n}
  color: var(--color-gray-02);
  display: flex;
  justify-content: space-between;
  align-items: center;
  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--color-gray-02);
    &:checked {
      background: url(${checkImg}) center/contain no-repeat;
    }
  }
`;

const onChange = () => {};

export const Input = ({ name, type, value, placeholder, required, width }) => {
  return (
    <InputItem
      name={name}
      type={type}
      value={value}
      placeholder={placeholder || ""}
      required={required || "boolean"}
      width={width}
      onChange={onChange}
    />
  );
};
export const InputCheckbox = ({ text }) => {
  return (
    <Label>
      {text}
      <input type="checkbox" />
    </Label>
  );
};
