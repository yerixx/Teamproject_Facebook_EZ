import React from "react";
import styled from "styled-components";

//font
import {
  MainTitle_26_b,
  MainTitle_18_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles";

const Wrapper = styled.section`
  /* border:1px solid #f00; */
  z-index: 1;
  position: absolute;
  top: -100px;
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 60px;
  align-items: center;
  position: relative;
  padding: 0 90px;
  background: var(--color-white);
  border-radius: 30px 30px 0 0;
  /* box-shadow:var(--box-shadow-01) */
`;
const Profile = styled.div`
  display: flex;
  justify-content: center;
  width: 740px;
  .profileContent {
    display: flex;
    gap: 30px;
    .profileImg {
      width: 90px;
      height: 90px;
      background: var(--color-gray-01);
      border-radius: 100px;
    }
    .profileText {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding-top: 6px;
      .profileTop {
        /* border:1px solid #f00; */
        width: 650px;
        display: flex;
        justify-content: space-between;
        .profileName {
          ${MainTitle_26_b}
          color:var(--color-gray-01);
        }
      }
      .profileDesc {
        ${SubDescription_16_n}
        padding:4px 0;
        color: var(--color-gray-01);
      }
    }
  }
`;
const Button = styled.div`
  display: flex;
  gap: 20px;
  * {
    ${SubDescription_16_n}
    width:165px;
    height: 42px;
    border: none;
    border-radius: var(--border-radius-08);
    cursor: pointer;
    transition: opacity 0.3s;
    &:nth-child(1) {
      background: var(--color-facebookblue);
      color: var(--color-white);
    }
    &:nth-child(2) {
      background: var(--color-light-gray-01);
      color: var(--color-gray-01);
    }
    &:hover {
      opacity: 0.8;
    }
  }
`;

const ContChangeBtn = styled.div`
  display: flex;
  justify-content: center;
  width: 780px;
  padding: 20px 0;
  /* border-bottom:1px solid var(--color-light-gray-01); */
  * {
    ${MainTitle_18_n};
    flex: 1;
    border: none;
    background: var(--color-white);
    &:nth-child(1) {
      color: var(--color-facebookblue);
      font-weight: 600;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        bottom: -22px;
        right: 0;
        border-bottom: 4px solid var(--color-facebookblue);
      }
    }
  }
`;

const MypageProfile = () => {
  return (
    <Wrapper>
      <Profile>
        <div className="profileContent">
          <div className="profileImg"></div>
          <div className="profileText">
            <div className="profileTop">
              <h1 className="profileName">박예림</h1>
              <Button>
                <button>스토리에 추가</button>
                <button>프로필 수정</button>
              </Button>
            </div>
            <p className="profileDesc">A Photographer @pylpic</p>
          </div>
        </div>
      </Profile>
      <ContChangeBtn>
        <button>게시글</button>
        <button>사진 및 동영상</button>
      </ContChangeBtn>
    </Wrapper>
  );
};

export default MypageProfile;
