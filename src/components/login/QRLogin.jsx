import React from "react";
import styled from "styled-components";
import { FormTitle, FormDesc } from "./login-components";
import QRimg from "/img/FacebookQr.png";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  img {
    width: 150px;
    height: 150px;
  }
`;

const QRLogin = () => {
  return (
    <Wrapper>
      <FormTitle>QR코드로 로그인</FormTitle>
      <FormDesc>
        Facebook을 모바일 앱으로 스캔해 <br /> 바로 로그인 하세요!
      </FormDesc>
      <img src={QRimg} alt="QRimg" />
    </Wrapper>
  );
};

export default QRLogin;
