import React from "react";
import styled from "styled-components";
import ContentsSec from "../ModalConts/ContentsSec";
import PostSec from "../ModalConts/PostSec";
import TopProfile from "../ModalConts/TopProfile";
import PostCont from "../ModalConts/PostCont";
import Buttons from "../ModalConts/Buttons";
import PostReply from "../ModalConts/PostReply";
import Reply from "../ModalConts/Reply";
import SelectBox from "../ModalConts/SelectBox";

const Wrapper = styled.div`
  display: flex;
  border: 1px solid #f00;
  height: 100vh;
  width: 100%;
`;

const WrapperRight = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 2px solid #f00;
  align-items: center;
  position: relative;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapperPost = styled.div`
  width: 502px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid aqua;
`;

const Line = styled.hr`
  margin-top: 65px;
  margin-bottom: 35px;
`;

const Inner02 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 44px;
`;

const ReplyWrapper = styled.div`
  border: 1px solid #f0f;
  height: 290px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ReplyNum = styled.div``;

const Latest = styled.div``;

const ModalCont = () => {
  return (
    <Wrapper>
      <ContentsSec />
      <WrapperRight>
        <Inner>
          <TopProfile />
          <WrapperPost>
            <PostCont />
            <Buttons />
          </WrapperPost>
          <Line />
          <Inner02>
            <ReplyNum>
              <div>총 개의 갯글</div>
            </ReplyNum>
            <Latest>
              <SelectBox /> {/* <- 정렬 버튼 */}
            </Latest>
          </Inner02>
          <ReplyWrapper>
            <PostReply />
            <PostReply />
            <PostReply />
            <PostReply />
          </ReplyWrapper>
        </Inner>
        <Reply />
      </WrapperRight>
    </Wrapper>
  );
};

export default ModalCont;
