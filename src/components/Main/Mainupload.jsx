import React, { useState } from "react";
import styled from "styled-components";
import { BsArrowReturnLeft } from "react-icons/bs"; // 주석 해제
import { CiCamera } from "react-icons/ci";

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const Container = styled.div`
  width: 1000px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 27px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  .uploadProfile {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background: var(--color-light-gray-01);
  }
`;

const Uploadtext = styled.input`
  width: 70%;
  height: 60px;
  background: var(--color-light-gray-01);
  padding: 20px;
  border-radius: 30px;
  border: none;
  font-size: 18px;
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
`;

const UploadFile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-light-gray-01);
`;

const Mainupload = () => {
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 선언
  const [file, setFile] = useState(null); // file 상태 선언

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // 파일 선택 시 file 상태 업데이트
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // 폼 제출 또는 딜레이 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Form>
      <Container>
        <div className="uploadProfile"></div>
        <Uploadtext
          type="text"
          placeholder="김정하님, 무슨 생각을 하고 계신가요?"
        />
        <UploadBtn type="submit" onClick={handleSubmit}>
          {isLoading ? <BsArrowReturnLeft /> : <BsArrowReturnLeft />}
        </UploadBtn>
        <UploadFile htmlFor="file">
          {file ? file.name : <CiCamera />}
          {/* 파일 이름 또는 아이콘 표시 */}
        </UploadFile>
      </Container>
    </Form>
  );
};

export default Mainupload;
