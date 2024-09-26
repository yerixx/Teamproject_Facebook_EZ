import React from "react";
import styled from "styled-components";
import ContentsSec from "../ModalConts/ContentsSec";
import PostSec from "../ModalConts/PostSec";
import PostCont from "../ModalConts/PostCont";
import Buttons from "../ModalConts/Buttons";
import PostReply from "../ModalConts/PostReply";
import Reply from "../ModalConts/Reply";

const Wrapper = styled.div`
  display: flex;
  border: 1px solid #f00;
  background: #f00;
  height: 100vh;
  width: 100%;
`;

const ModalCont = () => {
  return (
    <Wrapper>
      <ContentsSec></ContentsSec>
      <PostSec>
        <PostCont></PostCont>
        <Buttons></Buttons>
        <PostReply></PostReply>
        <Reply></Reply>
      </PostSec>
    </Wrapper>
  );
};

export default ModalCont;
