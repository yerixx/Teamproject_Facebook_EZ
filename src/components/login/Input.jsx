import React from "react";
import styled from "styled-components";

const InputItem = styled.input`
  width: ${({ width }) => `${width}px`};
  padding: 10px 15px;
  border: none;
  border-radius: var(--border-radius-08);
  font-size: var(--font-size-title-04);
  transition: box-shadow 0.3s;
  &::placeholder {
    color: var(--color-gray-02);
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    box-shadow: var(--box-shadow-01);
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &[type="submit"] {
    background: var(--color-facebookblue);
    color: var(--color-white);
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Input = ({ name, type, value, placeholder, required, width }) => {
  return (
    <InputItem
      name={name}
      type={type}
      value={value || ""}
      placeholder={placeholder || ""}
      required={required || "boolean"}
      width={width}
    ></InputItem>
  );
};

export default Input;
