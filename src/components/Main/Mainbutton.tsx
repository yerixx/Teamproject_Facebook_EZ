// UploadButtons.js
import React from "react";
import styled from "styled-components";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 110px;
`;

const UploadBtn = styled.button`
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-light-gray-01);
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const UploadLabel = styled.label`
  cursor: pointer;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 20px;
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
      <HiddenInput id="uploadModal" type="button" onChange={handleFileChange} />
    </Wrapper>
  );
};

export default UploadButtons;
