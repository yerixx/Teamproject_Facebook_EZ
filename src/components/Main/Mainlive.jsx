import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick"; // 슬릭 슬라이더 import
import {
  MainTitle_18_b,
  MainTitle_22_b,
  SubDescription_12_m,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1050px) {
  }
  @media screen and (max-width: 768px) {
  }
`;

const Inner = styled.div`
  margin: 20px 0;
  /* border: 1px solid red; */
  width: 1000px;
  height: 430px;
  padding: 27px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-30);
  position: relative;
  background-color: ${(props) => props.theme.ContainColor};

  @media screen and (max-width: 1050px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    margin: 0;
    box-shadow: none;
    padding: 0;
    width: 90vw;
    min-width: 360px;
  }

  .livetext {
    ${MainTitle_22_b}
    margin-bottom: 15px;
    color: ${(props) => props.theme.textColor};
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

const Livecard = styled.div`
  max-width: 244px;
  height: 100%;
  height: auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 1050px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    /* height: 52vh; */
  }

  > img {
    width: 100%;
    height: 90%;
    object-fit: cover;
    border-radius: 8px;
  }

  .liveheader {
    display: flex;
    align-items: center;
    padding-left: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: var(--color-white);
    position: absolute;
    width: 100%;
    height: 43px;
    border-radius: 8px 8px 0 0;
    top: 0;

    .liveBage {
      background: #ed413f;
      ${SubDescription_16_n}
      padding: 4px 5px;
      border-radius: 3px;
      margin-right: 5px;
      @media screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
    .item {
      display: flex;
      gap: 40px;

      .viewers {
        ${SubDescription_16_n}
        @media screen and (max-width: 768px) {
          font-size: 14px;
        }
      }
      .point {
        ${SubDescription_16_n}
        position: absolute;
        right: 10px;
        @media screen and (max-width: 768px) {
          font-size: 14px;
        }
      }
    }
  }

  .liveinfo {
    display: flex;
    align-items: center;
    padding: 5px 5px;
    background: rgba(0, 0, 0, 0.5);
    color: var(--color-white);
    height: 85px;
    border-radius: 0 0 8px 8px;
    position: absolute;
    bottom: 0px;
    width: 100%;

    .info {
      flex-grow: 1;
      padding-left: 10px;
      display: flex;
      flex-direction: column;

      .subtitle {
        ${SubDescription_16_n}
        display: flex;
        align-items: center;
        gap: 5px;
        @media screen and (max-width: 768px) {
          ${SubDescription_12_m}
        }
      }

      .title {
        ${SubDescription_16_n}
        @media (max-width: 768px) {
          font-size: 14px;
          @media screen and (max-width: 768px) {
            ${SubDescription_12_m}
          }
        }
      }

      .item {
        display: flex;
        justify-content: space-between;

        .price {
          ${SubDescription_16_n}
          display: flex;
          gap: 3px;
          @media screen and (max-width: 768px) {
            ${SubDescription_12_m}
          }

          span {
            color: red;
          }
        }

        button {
          ${SubDescription_12_m}
          border: none;
          border-radius: 8px;
          padding: 3px 7px;
          background: var(--color-gray-01);
          color: var(--color-white);
          cursor: pointer;
          @media screen and (max-width: 768px) {
            ${SubDescription_12_m}
          }
        }
      }
    }
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
  opacity: 0.9;
  transition: all 0.3s;
  scale: 0.8;
  svg {
    margin-left: 5px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  &:hover {
    opacity: 1;
    scale: 1;
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
  opacity: 0.9;
  transition: all 0.3s;
  scale: 0.8;
  svg {
    margin-left: 3px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  &:hover {
    opacity: 1;
    scale: 1;
  }
`;

const PrevArrow = ({ onClick }) => {
  return (
    <PrevBtn onClick={onClick}>
      <MdOutlineNavigateBefore />
    </PrevBtn>
  );
};

const Mainlive = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    swipe: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Inner>
        <Items>
          <div className="livetext">라이브 커머스</div>
          <Slider {...settings}>
            {[...Array(5)].map((index) => (
              <Livecard key={index}>
                <img src="../public/img/live.jpg" alt="testimg" />
                <div className="liveheader">
                  <div className="liveBage">LIVE</div>
                  <div className="item">
                    <div className="viewers">9,452 시청</div>
                    <div className="point">+500P</div>
                  </div>
                </div>
                <div className="liveinfo">
                  {/* <img src="../public/img/live.jpg" alt="profile" /> */}
                  <div className="info">
                    <span className="subtitle">
                      <FaStar />
                      5% 추가할인
                      <FaStar />
                    </span>
                    <span className="title">NEW ARRIVAL SHOES</span>
                    <div className="item">
                      <span className="price">
                        <span>30%</span>
                        19,000원
                      </span>
                      <button>라이브 보기</button>
                    </div>
                  </div>
                </div>
              </Livecard>
            ))}
          </Slider>
        </Items>
      </Inner>
    </Wrapper>
  );
};

export default Mainlive;
