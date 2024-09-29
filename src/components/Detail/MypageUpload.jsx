import React from "react";
import styled from "styled-components";
import { CiCamera } from "react-icons/ci";

//font
import { MainTitle_18_n } from "../../styles/GlobalStyles.styles";

const CommentUpLoad = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Inner = styled.article`
  width: 1050px;
  height: 100%;
  padding: 0 90px;
`;
const CommentCont = styled.div`
  display: flex;
  align-items: center;
  margin: 60px 0;
  padding: 40px 0;
  border-top: 1px solid var(--color-light-gray-01);
  border-bottom: 1px solid var(--color-light-gray-01);
  .commentUpLoadprofile {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .profileImg {
      width: 60px;
      height: 60px;
      background: var(--color-light-gray-01);
      border-radius: 100px;
    }
    .profileInputText {
      ${MainTitle_18_n}
      width:640px;
      height: 60px;
      background: var(--color-light-gray-01);
      color: var(--color-gray-01);
      border: none;
      border-radius: 50px;
      padding: 0 30px;
      &:focus {
        outline: none;
      }
    }
    .ciCamera,
    .gif {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      background: var(--color-light-gray-01);
      border-radius: 50px;
      cursor: pointer;
    }
    .ciCamera {
      padding: 10px;
    }
    .gif {
      ${MainTitle_18_n}
    }
  }
`;

const MypageUpload = ({ placeholder }) => {
  return (
    <CommentUpLoad>
      <Inner>
        <CommentCont>
          <div className="commentUpLoadprofile">
            <div className="profileImg"></div>
            <input
              className="profileInputText"
              type="text"
              placeholder={placeholder || "댓글을 입력하세요"}
            ></input>
            <div>
              <CiCamera className="ciCamera" />
            </div>
            <div className="gif">GIF</div>
          </div>
        </CommentCont>
      </Inner>
    </CommentUpLoad>
  );
};

export default MypageUpload;
