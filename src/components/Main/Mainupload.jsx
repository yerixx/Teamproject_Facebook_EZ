import React, { useState } from "react";
<<<<<<< HEAD
import { BsArrowReturnLeft } from "react-icons/bs"; 
import { CiCamera } from "react-icons/ci";
=======
>>>>>>> Signup
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-right: -100px;
`;

const Container = styled.div`
  width: 900px;
  height: 110px;
  display: flex;
  align-items: center;
  gap: 30px;
<<<<<<< HEAD
  padding: 27px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
=======
  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); */
  border-radius: 8px;
>>>>>>> Signup
  .uploadProfile {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background: var(--color-light-gray-01);
    cursor: pointer;
  }
`;

const Uploadtext = styled.input`
  width: 75%;
  height: 60px;
  background: var(--color-light-gray-01);
  padding: 20px;
  border-radius: 30px;
  border: none;
  font-size: 18px;
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
        {/* <UploadBtn type="submit" onClick={handleSubmit}>
          {isLoading ? <BsArrowReturnLeft /> : <BsArrowReturnLeft />}
        </UploadBtn>
<<<<<<< HEAD
        <UploadFile htmlFor="file">
          {file ? file.name : <CiCamera />}
          {/* 파일 이름 또는 아이콘 표시 */}
        </UploadFile>
=======
        <UploadLabel htmlFor="button">
          <FiEdit3 />
        </UploadLabel>
        <UploadFile id="button" type="button" /> */}
>>>>>>> Signup
      </Container>
    </Form>
  );
};

export default Mainupload;
