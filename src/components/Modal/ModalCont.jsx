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
import TopProfileMob from "../ModalConts/TopProfileMob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaDove } from "react-icons/fa6";

const Wrapper = styled.div`
  display: flex;
  border: 1px solid #f00;
  height: 100vh;
  width: 100%;
  .onlyPc {
    display: block;
  }
  .onlyMob {
    display: none;
  }
  .onlyMob {
    .closeBtn {
      position: absolute;
      top: 20px;
      right: 20px;
      color: #fff;
    }
  }
  @media screen and (max-width: 1050px) {
    flex-direction: column;
    background: #000;
    .onlyPc {
      display: none;
    }
    .onlyMob {
      display: block;
    }
  }
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
  @media screen and (max-width: 1050px) {
    width: calc(100vw - (100vw - 100%));
  }
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
      <div className="onlyMob">
        <div className="closeBtn">X</div>
        <TopProfileMob />
      </div>
      <ContentsSec />
      <WrapperRight>
        <Inner>
          <div className="onlyPc">
            <TopProfile />
          </div>
          <WrapperPost>
            <PostCont />
            <Buttons />
          </WrapperPost>
          <Line />
          <Inner02>
            <ReplyNum className="onlyPc">
              <div>총 개의 갯글</div>
            </ReplyNum>
            <Latest>
              <SelectBox /> {/* <- 정렬 버튼 */}
            </Latest>
          </Inner02>
          <ReplyWrapper className="onlyPc">
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
