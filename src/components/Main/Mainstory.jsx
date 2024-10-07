/* eslint-disable react/prop-types */

import React, { useState } from "react"; // useState 임포트 추가
import styled from "styled-components";
import { FaUser, FaPlus } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SubDescription_16_n } from "../../styles/GlobalStyles.styles";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import Mainmodal from "./Mainmodal"; // 모달 컴포넌트 임포트

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  /* margin-top: 20px; */
  @media screen and (max-width: 1050px) {
  }
  @media screen and (max-width: 768px) {
    margin: 0;
    /* height: 250px; */
  }
`;

const Inner = styled.div`
  /* border: 1px solid red; */
  width: 1000px;
  height: 360px;
  padding: 27px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-30);
  position: relative;
  @media screen and (max-width: 1050px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    box-shadow: none;
    padding: 0;
    width: 90vw;
    height: 100%;
    min-width: 360px;
    margin: 0 auto;
  }
`;

const Items = styled.div`
  .slider {
    width: 100%;
    height: 100%;
  }
  .slick-slide {
    margin: 0 5px;
  }
  .slick-list {
    margin: 0 -10px;
  }
  .slick-track {
    display: flex;
    justify-content: flex-start;
    transition: transform 0.5s ease-in-out;
  }
`;

const StoryItem = styled.div`
  border: 1px solid var(--color-light-gray-01);
  width: 100%;
  height: 320px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  div {
    width: 100%;
    height: 70%;
    background-color: var(--color-light-gray-01);
    position: relative;
    svg {
      color: var(--color-gray-01);
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 160px;
    }
  }
  span {
    border: 5px solid #fff;
    position: absolute;
    background-color: var(--color-facebookblue);
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    top: 61%;
    transform: translateX(-50%);
    svg {
      font-size: 30px;
      color: #fff;
    }
    cursor: pointer; /* 커서 포인터로 변경 */
  }
  h2 {
    ${SubDescription_16_n}
    display: flex;
    justify-content: center;
    line-height: 8;
  }
  @media screen and (max-width: 768px) {
    height: 200px;
    div {
      svg {
        font-size: 100px;
      }
    }
    span {
      border: 3px solid #fff;
      width: 34px;
      height: 34px;
      svg {
        font-size: 16px;
      }
    }
    h2 {
      line-height: 5;
    }
  }
`;

const StoryFriend = styled.div`
  width: 100%;
  height: 320px;
  background: #ddd;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .storyInfo {
    width: 100%;

    .story {
      width: 44px;
      height: 44px;
      position: absolute;
      top: 8px;
      left: 8px;
      border-radius: 50%;
      border: 3px solid #1877f2; /* var(--color-facebookblue) 대체 */
      display: flex;
      justify-content: center;
      align-items: center;
      /* background: #fff; */

      .storyProfile {
        width: 100%;
        height: 100%;
        background: #aaa;
        border-radius: 50%;
      }
    }

    .storyName {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding-left: 20px;
      line-height: 36px;
      font-size: 14px;
      border-radius: 0 0 8px 8px;
    }
  }
  @media screen and (max-width: 768px) {
    height: 200px;
  }
`;

// 슬릭슬라이더 커스텀 화살표
const NextBtn = styled.span`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: var(--color-light-gray-01);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  cursor: pointer;
  svg {
    margin-left: 5px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NextArrow = ({ onClick }) => {
  return (
    <NextBtn onClick={onClick}>
      <MdOutlineNavigateNext />
    </NextBtn>
  );
};

// 슬릭슬라이더 커스텀 화살표
const PrevBtn = styled.span`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: var(--color-light-gray-01);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  cursor: pointer;
  svg {
    margin-left: 3px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const PrevArrow = ({ onClick, currentSlide }) => {
  if (currentSlide === 0) return null;
  return (
    <PrevBtn onClick={onClick}>
      <MdOutlineNavigateBefore />
    </PrevBtn>
  );
};

const MainStory = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [postImage, setPostImage] = useState(null); // 모달에서 업로드된 이미지 상태

  // 모달 열기 핸들러
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달 제출 핸들러
  const handleModalSubmit = ({ text, image }) => {
    // 필요한 경우 제출된 데이터를 처리
    console.log("모달 제출 데이터:", text, image);
    setPostImage(image);
    setIsModalOpen(false);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    // autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />, // 화살표 버튼을 커스텀해서 사용
    prevArrow: <PrevArrow currentSlide={currentSlide} />,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1050, // 1050px 이하일 때
        settings: {
          slidesToShow: 4, // 슬라이드를 4개만 보여줌
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580, // 580px 이하일 때
        settings: {
          slidesToShow: 3, // 슬라이드를 2개만 보여줌
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Inner>
        <Items>
          <Slider className="slider" {...settings}>
            <StoryItem>
              <div>
                <FaUser />
              </div>
              <span onClick={openModal}>
                {" "}
                {/* 클릭 시 모달 열기 */}
                <FaPlus />
              </span>
              <h2>스토리 만들기</h2>
            </StoryItem>
            <StoryFriend>
              <img src="/img/test.jpg" alt="testimg" />
              <div className="storyInfo">
                <div className="story">
                  <div className="storyProfile"></div>
                </div>
                <div className="storyName">김정하</div>
              </div>
            </StoryFriend>
            <StoryFriend>
              <img src="/img/test.jpg" alt="testimg" />
              <div className="storyInfo">
                <div className="story">
                  <div className="storyProfile"></div>
                </div>
                <div className="storyName">김정하</div>
              </div>
            </StoryFriend>
            <StoryFriend>
              <img src="/img/test.jpg" alt="testimg" />
              <div className="storyInfo">
                <div className="story">
                  <div className="storyProfile"></div>
                </div>
                <div className="storyName">김정하</div>
              </div>
            </StoryFriend>
            <StoryFriend>
              <img src="/img/test.jpg" alt="testimg" />
              <div className="storyInfo">
                <div className="story">
                  <div className="storyProfile"></div>
                </div>
                <div className="storyName">김정하</div>
              </div>
            </StoryFriend>
            <StoryFriend>
              <img src="/img/test.jpg" alt="testimg" />
              <div className="storyInfo">
                <div className="story">
                  <div className="storyProfile"></div>
                </div>
                <div className="storyName">김정하</div>
              </div>
            </StoryFriend>
            <StoryFriend>
              <img src="/img/test.jpg" alt="testimg" />
              <div className="storyInfo">
                <div className="story">
                  <div className="storyProfile"></div>
                </div>
                <div className="storyName">김정하</div>
              </div>
            </StoryFriend>
            <StoryFriend>
              <img src="/img/test.jpg" alt="testimg" />
              <div className="storyInfo">
                <div className="story">
                  <div className="storyProfile"></div>
                </div>
                <div className="storyName">김정하</div>
              </div>
            </StoryFriend>
          </Slider>
        </Items>
      </Inner>
      {/* 모달 컴포넌트 렌더링 */}
      {isModalOpen && (
        <Mainmodal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
    </Wrapper>
  );
};

export default MainStory;
