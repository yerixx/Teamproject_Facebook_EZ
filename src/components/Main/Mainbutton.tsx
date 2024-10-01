import React from "react";
import styled from "styled-components";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { Paragraph_20_n } from "../../styles/GlobalStyles.styles";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const UploadBtn = styled.button`
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  ${Paragraph_20_n}
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-light-gray-01);
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
  }
`;

const UploadLabel = styled.label`
  cursor: pointer;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  ${Paragraph_20_n}
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-light-gray-01);
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadButtons = ({ isLoading, handleSubmit, handleFileChange }) => {
  return (
    <Wrapper>
      <UploadBtn type="submit" onClick={handleSubmit} disabled={isLoading}>
        <BsArrowReturnLeft />
      </UploadBtn>
      <UploadLabel htmlFor="file-upload">
        <FiEdit3 />
      </UploadLabel>
      <HiddenInput id="file-upload" type="file" onChange={handleFileChange} />
    </Wrapper>
  );
};

export default UploadButtons;
