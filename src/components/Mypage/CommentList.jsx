import React from "react";
import styled from "styled-components";
import Comment from "../common/Comment.jsx";

// react-icon
import { SlArrowDown } from "react-icons/sl";

//font
import {
  Paragraph_20_n,
  MainTitle_18_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles.js";

const Wrapper = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const Inner = styled.article`
  width: 1050px;
  height: 100%;
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;
const CommentTop = styled.div`
  ${Paragraph_20_n}
  padding:40px 0;
  display: flex;
  justify-content: space-between;
  .commentTopRight {
    display: flex;
    align-items: center;
    gap: 10px;
    .SlArrowDown {
      ${SubDescription_16_n}
      cursor: pointer;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const CommentLists = styled.div`
  ${MainTitle_18_n}
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;
  .commentList {
    display: flex;
    align-items: center;
    gap: 30px;
    .commentFirstImg {
      width: 60px;
      height: 60px;
      background: var(--color-light-gray-01);
      border-radius: 50%;
    }
    .commentFirstDesc {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .firstDescTop {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;
        background: var(--color-light-gray-01);
        border-radius: 8px;
        padding: 14px 20px;
        width: fit-content;
        height: fit-content;
        color: black;
        &:after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: -10px;
          width: 30px;
          height: 12px;
          background: var(--color-light-gray-01);
          border-radius: 0 15px 0 20px;
          transform: rotate(-30deg);
        }
      }
      .DescBottom {
        display: flex;
        gap: 10px;
        padding: 0 20px;
        color: var(--color-gray-02);
        cursor: pointer;
        transition: color 0.5s;
        *:hover {
          color: var(--color-black);
        }
      }
    }
    .commentSecImg {
      width: 60px;
      height: 60px;
      background: var(--color-light-gray-01);
      border-radius: 50%;
    }
    .commentSecDesc {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .secDescTop {
        margin-top: 30px;
        display: flex;
        gap: 5px;
        position: relative;
        border: 1px solid var(--color-light-gray-01);
        background: var(--color-white);
        border-radius: 8px;
        padding: 14px 20px;
        width: fit-content;
        height: fit-content;
        color: black;
        &:after {
          content: "";
          position: absolute;
          top: -4px;
          left: -10px;
          width: 30px;
          height: 14px;
          border-left: 1px solid var(--color-light-gray-01);
          border-top: 1px solid var(--color-light-gray-01);
          background: var(--color-white);
          border-radius: 0 0 0 60px;
          transform: rotate(10deg);
        }
      }
    }
  }
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const DescBottom = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 20px;
  color: var(--color-gray-02);
  cursor: pointer;
  transition: color 0.5s;
  *:hover {
    color: var(--color-black);
  }
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    ${SubDescription_16_n}
  }
`;

const CommentList = ({ style }) => {
  return (
    <Wrapper>
      <Inner>
        <CommentTop>
          <div>총 29개의 댓글</div>
          <div className="commentTopRight">
            <div>최신순</div>
            <div>
              <SlArrowDown className="SlArrowDown" />
            </div>
          </div>
        </CommentTop>
        <Comment />
        {/* <CommentLists>
          <div className="commentList">
            <div className="commentFirstImg"></div>
            <div className="commentFirstDesc">
              <div className="firstDescTop">
                <b>김예지</b>
                <span>
                  <b>김정하</b> <span>여기 가보는 거 어때?</span>
                </span>
              </div>
              <DescBottom>
                <div>좋아요</div>
                <div>답글달기</div>
              </DescBottom>
            </div>
          </div>
          <div className="commentList">
            <div className="commentSecImg"></div>
            <div className="commentSecDesc">
              <div className="secDescTop">
                <b>김정하</b> <span>완전 좋아요!!</span>
              </div>
              <DescBottom>
                <div>좋아요</div>
                <div>답글달기</div>
              </DescBottom>
            </div>
          </div>
        </CommentLists> */}
      </Inner>
    </Wrapper>
  );
};

export default CommentList;
