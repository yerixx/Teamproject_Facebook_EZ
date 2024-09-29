import React from "react";
import styled from "styled-components";
import { FormTitle, FormDesc } from "./login-components";
import QRimg from "../../img/QRLogin.png";
import googleIcon from "../../img/google-icon.svg";
import appleIcon from "../../img/apple-icon.svg";
import githubIcon from "../../img/github-icon.svg";

const Container = styled.div`
  width: 360px;
  height: 472px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const QRLogin = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
  }
`;
const SNSLogin = styled.div`
  width: 100%;
  padding: 30px 0;
  border-top: 1px solid var(--color-gray-02);
  border-bottom: 1px solid var(--color-gray-02);
  ul {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
    li {
      width: 45px;
      height: 45px;
      background: var(--color-gray-02);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 23px;
      }
    }
  }
`;

const OtherLogin = () => {
  return (
    <Container>
      <QRLogin>
        <FormTitle>QR코드로 로그인</FormTitle>
        <FormDesc>
          Facebook을 모바일 앱으로 스캔해 <br /> 바로 로그인 하세요!
        </FormDesc>
        <img src={QRimg} alt="QRimg" />
      </QRLogin>
      <SNSLogin>
        <FormDesc>다른 방법으로 로그인</FormDesc>
        <ul>
          <li>
            <img src={googleIcon} />
          </li>
          <li>
            <img src={appleIcon} />
          </li>
          <li>
            <img src={githubIcon} />
          </li>
        </ul>
      </SNSLogin>
    </Container>
  );
};

export default OtherLogin;
