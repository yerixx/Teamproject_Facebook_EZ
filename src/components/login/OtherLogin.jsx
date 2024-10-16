import React from "react";
import styled from "styled-components";
import QRLogin from "./QRLogin";
import SNSLogin from "./SNSLogin";

const Wrapper = styled.div`
  width: 360px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const OtherLogin = () => {
  return (
    <Wrapper>
      <QRLogin />
      <SNSLogin />
    </Wrapper>
  );
};

export default OtherLogin;
