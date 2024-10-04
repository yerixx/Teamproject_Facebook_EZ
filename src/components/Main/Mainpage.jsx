import styled from "styled-components";
import SocialBtnIcon from "../common/SocialBtnIcon";

import { BsThreeDots } from "react-icons/bs";
import { FaEarthAmericas, FaRegBookmark } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

import {
  MainTitle_18_b,
  MainTitle_18_n,
  MainTitle_24_m,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Inner = styled.div`
  width: 1000px;
  height: 600px;
  padding: 27px 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-30);
  position: relative;

  @media screen and (max-width: 390px) {
    width: 100%;
    height: auto;
    gap: 5px;
  }
  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    ${MainTitle_24_m}
  }
  @media screen and (max-width: 390px) {
    width: 100%;
    height: auto;
    padding: 15px;
    gap: 5px;

    .icon {
      top: 10px;
      right: 15px;
      ${MainTitle_24_m}
    }
  }
`;

const PostInfo = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 14px;
  .profile {
    width: 44px;
    height: 44px;
    border-radius: 90%;
    background: var(--color-gray-02);
  }
  .info {
    display: flex;
    flex-direction: column;
    .name {
      ${MainTitle_18_b}
    }
    .item {
      display: flex;
      gap: 5px;
      .clock {
        ${SubDescription_16_n}
      }
      .menuIcon {
        ${SubDescription_16_n}
      }
    }
  }
  @media screen and (max-width: 390px) {
    width: 100%;
    height: auto;
  }
`;
const PostText = styled.div`
  margin-left: 63px;
  ${SubDescription_16_n}
  @media screen and (max-width: 390px) {
    margin-left: 40px;
    ${SubDescription_16_n}
  }
`;

const ImgItem = styled.div`
  .postImg {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 370px;
      background: var(--color-gray-02);
      gap: 8px;
      cursor: pointer;
    }
  }
`;

// const SocialBtnIcon = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   height: 80px;
//   padding: 10px 20px;
//   ${MainTitle_18_n}
//   border-top: 1px solid var(--color-light-gray-01);
//   .socialIcon {
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     &:hover {
//       color: var(--color-facebookblue);
//     }
//   }
//   @media screen and (max-width: 390px) {
//     height: auto;
//     padding: 10px;

//     .socialIcon {
//       gap: 6px;
//       ${SubDescription_16_n}
//     }
//   }
// `;

const MainPost = () => {
  return (
    <Wrapper>
      <Inner>
        <div className="icon">
          <BsThreeDots />
          <IoCloseOutline />
        </div>
        <PostInfo>
          <div className="profile"></div>
          <div className="info">
            <div className="name">김정하</div>
            <div className="item">
              <span className="clock">1시간전</span>
              <span className="menuIcon">
                <FaEarthAmericas />
              </span>
            </div>
          </div>
        </PostInfo>
        <PostText>내 최애</PostText>
        <ImgItem>
          <div className="postImg">
            <img src="../public/img/imgtest.jpg" alt="img" />
          </div>
        </ImgItem>
        {/* <SocialBtnIcon>
          <div className="socialIcon">
            <FaRegHeart />
            좋아요
          </div>
          <div className="socialIcon">
            <FaRegComment />
            댓글
          </div>
          <div className="socialIcon">
            <FiShare />
            공유하기
          </div>
          <div className="socialIcon">
            <FaRegBookmark />
            저장하기
          </div>
        </SocialBtnIcon> */}
        <SocialBtnIcon />
      </Inner>
    </Wrapper>
  );
};

export default MainPost;
