import React from "react";
import styled from "styled-components";

const ButtonItem = styled.button`
  padding: 15px 0;
  cursor: pointer;
  border: none;
  border-radius: var(--border-radius-08);
  font-size: var(--font-size-title-03);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  ${({ type }) =>
    type === "positive"
      ? `background: var(--color-facebookblue);`
      : type === "negative"
      ? `background: var(--color-gray-02);`
      : `background: var(--color-light-gray-01);`}
  ${({ width }) => `width: ${width}px`};
`;

const Button = ({ text, type, width, onClick }) => {
  return (
    <ButtonItem type={type} width={width} onClick={onClick}>
      {text || "Button"}
    </ButtonItem>
  );
};

export default Button;
