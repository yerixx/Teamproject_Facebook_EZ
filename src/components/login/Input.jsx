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
  /* color: var(--color-gray-02); */
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
  &[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid var(--color-gray-02);
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    &:checked {
      background: url(${checkImg}) center/contain no-repeat;
    }
  }
  &[type="date"] {
    /* color: var(--color-gray-02); */
  }
`;
const LabelItem = styled.label`
  display: inline-block;
  width: 210px;
  height: 46px;
  padding: 15px;
  border: 1px solid var(--color-gray-02);
  border-radius: var(--border-radius-08);
  ${SubDescription_16_n}
  line-height: 15px;
  /* color: var(--color-gray-02); */
`;
export const SelectItem = styled.select`
  width: 430px;
  padding: 10px 15px;
  border: 1px solid var(--color-gray-02);
  border-radius: var(--border-radius-08);
  ${SubDescription_16_n}
  &:focus {
    outline: none;
  }
`;

const onChange = () => {};

export const Input = ({
  id,
  name,
  type,
  value,
  placeholder,
  required,
  width,
}) => {
  return (
    <InputItem
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder || null}
      required={required || null}
      width={width}
      onChange={onChange}
    />
  );
};

export const Label = ({ htmlFor, text }) => {
  return <LabelItem htmlFor={htmlFor}>{text || null}</LabelItem>;
};
