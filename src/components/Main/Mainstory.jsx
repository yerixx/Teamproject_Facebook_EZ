import React from "react";
import styled from "styled-components";
import { IoPersonSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  gap: 10px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }

  @media (max-width: 390px) {
    /* max-width: 100%; */
    margin-top: 20px;
    gap: 5px;
  }
`;

const Inner = styled.div`
  width: 1000px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;

  .inner {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }

  @media (max-width: 390px) {
    border-radius: 0px;
  }
`;

const StoryItem = styled.div`
  padding: 10px;
  width: 150px;
  height: 300px;
  border-radius: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  .myStory {
    border-radius: 30px;
    height: 100%;
    width: 100%;
    position: relative;
    background-color: #ddd;

    /* 아이콘이나 텍스트 추가 */
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    font-size: 24px;
  }

  @media (max-width: 768px) {
    width: 38%;
    height: 250px;
  }

  @media (max-width: 390px) {
    width: 150px;
    height: 255px;
  }
`;

const StoryFriend = styled.div`
  padding: 10px;
  width: 150px;

  .storyInfo {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      border-radius: 30px;
      opacity: 0.8;
    }

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
      background: #fff;

      .storyProfile {
        width: 100%;
        height: 100%;
        background: #aaa; /* var(--color-gray-01) 대체 */
        border-radius: 50%;
      }
    }

    .storyName {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 36px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding-left: 20px;
      line-height: 36px;
      font-size: 14px;
      border-radius: 0 0 30px 30px;
    }
  }

  @media (max-width: 768px) {
    width: 35%;
    height: 250px;
  }

  @media (max-width: 390px) {
    width: 150px;
    height: 255px;
  }
`;

const MainStory = () => {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    draggable: true,
    fade: false,
    arrows: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 5,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Inner>
        <Slider className="inner" {...settings}>
          <StoryItem>
            <div className="myStory">
              <IoPersonSharp /> {/* 아이콘 추가 */}
              {/* 또는 원하는 콘텐츠 추가 */}
            </div>
          </StoryItem>
          <StoryFriend>
            <div className="storyInfo">
              <img src="/img/test.jpg" alt="testimg" />
              <div className="story">
                <div className="storyProfile"></div>
              </div>
              <div className="storyName">김정하</div>
            </div>
          </StoryFriend>
          <StoryFriend>
            <div className="storyInfo">
              <img src="/img/test.jpg" alt="testimg" />
              <div className="story">
                <div className="storyProfile"></div>
              </div>
              <div className="storyName">김정하</div>
            </div>
          </StoryFriend>
          <StoryFriend>
            <div className="storyInfo">
              <img src="/img/test.jpg" alt="testimg" />
              <div className="story">
                <div className="storyProfile"></div>
              </div>
              <div className="storyName">김정하</div>
            </div>
          </StoryFriend>
          <StoryFriend>
            <div className="storyInfo">
              <img src="/img/test.jpg" alt="testimg" />
              <div className="story">
                <div className="storyProfile"></div>
              </div>
              <div className="storyName">김정하</div>
            </div>
          </StoryFriend>
          <StoryFriend>
            <div className="storyInfo">
              <img src="/img/test.jpg" alt="testimg" />
              <div className="story">
                <div className="storyProfile"></div>
              </div>
              <div className="storyName">김정하</div>
            </div>
          </StoryFriend>
        </Slider>
      </Inner>
    </Wrapper>
  );
};

export default MainStory;
