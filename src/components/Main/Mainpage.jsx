import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { FaEarthAmericas, FaRegBookmark } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import {
  MainTitle_18_b,
  MainTitle_18_n,
  MainTitle_24_m,
  SubDescription_12_m,
  SubDescription_16_n,
  SubDescription_22_n,
  SubTitle_16_b,
} from "../../styles/GlobalStyles.styles";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Inner = styled.div`
  width: var(--inner-width-02);
  height: 100%;
  padding: 27px 30px 0;
  display: flex;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-30);
  position: relative;
  @media screen and (max-width: 900px) {
    width: 100%;
    height: auto;
    gap: 5px;
  }
  @media screen and (max-width: 768px) {
    margin: 0 auto;
    width: 90vw;
    height: 100%;
  }
`;
const Items = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    ${MainTitle_24_m}
  }
  @media screen and (max-width: 900px) {
    .icon {
      ${MainTitle_24_m}
    }
  }
`;

const PostInfo = styled.div`
  width: 200px;
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
`;
const PostText = styled.div`
  padding: 10px 0;
  ${SubDescription_16_n}
`;

const ImgItem = styled.div`
  display: flex;
  gap: 5px;
  .postImg {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
    img {
      object-fit: cover;
      width: 100%;
      height: 300px;
      border-radius: 8px;
      background: var(--color-gray-02);
      gap: 8px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 768px) {
    height: 150px;
    .postImg {
      img {
        height: 100%;
      }
    }
  }
`;

const SocialBtnIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  ${MainTitle_18_n}
  border-top: 1px solid var(--color-light-gray-01);
  .socialIcon {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    ${SubDescription_16_n}
    &:hover {
      color: var(--color-facebookblue);
    }
  }

  @media screen and (max-width: 768px) {
    height: 100%;
    .socialIcon {
      padding: 10px 0;
      font-size: 20px;
      span {
        display: none;
      }
    }
  }
`;

const MainPost = () => {
  return (
    <Wrapper>
      <Inner>
        <Items>
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
          <PostText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam iste
            quia corporis unde in, odit sunt eligendi quod vero impedit,
            dignissimos iure molestias doloribus non reiciendis incidunt dolor,
            adipisci distinctio.
          </PostText>
          <ImgItem>
            <div className="postImg">
              <img src="../public/img/imgtest.jpg" alt="img" />
            </div>
            <div className="postImg">
              <img src="../public/img/imgtest.jpg" alt="img" />
            </div>
          </ImgItem>
          <SocialBtnIcon>
            <div className="socialIcon">
              <FaRegHeart />
              <span>좋아요</span>
            </div>
            <div className="socialIcon">
              <FaRegComment />
              <span>댓글</span>
            </div>
            <div className="socialIcon">
              <FiShare />
              <span>공유하기</span>
            </div>
            <div className="socialIcon">
              <FaRegBookmark />
              <span>저장하기</span>
            </div>
          </SocialBtnIcon>
        </Items>
      </Inner>
    </Wrapper>
  );
};

export default MainPost;
