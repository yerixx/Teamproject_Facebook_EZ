import React, { useState } from "react"; // React와 useState 훅을 임포트
import styled from "styled-components"; // styled-components 라이브러리 임포트
import { FaStar } from "react-icons/fa"; // 별 아이콘 임포트
import Slider from "react-slick"; // 슬릭 슬라이더 컴포넌트 임포트
import "slick-carousel/slick/slick.css"; // 슬릭 슬라이더 기본 스타일 임포트
import "slick-carousel/slick/slick-theme.css"; // 슬릭 슬라이더 테마 스타일 임포트
import {
  MainTitle_18_b,
  SubDescription_12_m,
  SubDescription_14_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles"; // 전역 스타일에서 텍스트 스타일 가져오기
import { MdOutlineNavigateBefore, MdNavigateNext } from "react-icons/md";

// 전체 컴포넌트를 감싸는 Wrapper 스타일 컴포넌트
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 900px) {
    margin-top: 10px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 10px;
    height: 250px;
  }
`;

// 내부 컨텐츠를 담는 Inner 스타일 컴포넌트
const Inner = styled.div`
  width: var(--inner-width-02);
  height: 400px;
  padding: 27px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-30);
  position: relative;

  @media screen and (max-width: 768px) {
    box-shadow: none;
    padding: 0;
    width: 90vw; // 화면 너비의 90%로 설정
    min-width: 360px;
    margin: 0 auto;
  }

  .livetext {
    ${MainTitle_18_b};
    margin-bottom: 15px;
  }
`;

// 슬라이더 내의 아이템들을 감싸는 Items 스타일 컴포넌트
const Items = styled.div`
  .slider {
    width: 100%;
    height: 100%;
  }
  .slick-slide {
    margin: 0 5px; // 슬라이드 간의 간격 설정
  }
  .slick-list {
    margin: 0 -10px; // 슬라이더 전체의 간격 조정
  }
  .slick-track {
    display: flex;
    justify-content: flex-start;
    transition: transform 0.5s ease-in-out; // 슬라이드 전환 애니메이션
  }
`;

// 개별 라이브 카드를 위한 Livecard 스타일 컴포넌트
const Livecard = styled.div`
  flex: 1 1 244px;
  max-width: 244px;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 52vh;
  }

  > img {
    width: 100%;
    height: 90%;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }

  // 라이브 헤더 섹션 스타일
  .liveHeader {
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
        ${SubDescription_14_n}
      }
    }

    .item {
      display: flex;
      gap: 40px;
      .viewers {
        ${SubDescription_16_n}
        @media screen and (max-width: 768px) {
          ${SubDescription_12_m}
        }
      }

      .point {
        ${SubDescription_16_n}
        position: absolute;
        right: 10px;
        @media screen and (max-width: 768px) {
          ${SubDescription_12_m}
        }
      }
    }
  }

  // 라이브 정보 섹션 스타일
  .liveInfo {
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
    @media screen and (max-width: 768px) {
    }
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
        @media screen and (max-width: 768px) {
          ${SubDescription_12_m}
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

// 슬릭 슬라이더의 커스텀 다음 화살표 컴포넌트
const NextArrow = (props) => {
  const { className, style, onClick } = props; // props에서 클래스 이름, 스타일, 클릭 핸들러 추출
  return (
    <div
      className={`${className} custom-arrow next-arrow`} // 기본 클래스와 커스텀 클래스 추가
      style={{
        ...style, // 기본 스타일 적용
        display: "block",
        right: "15px",
        fontSize: "40px",
        color: "gray",
      }}
      onClick={onClick} // 클릭 시 핸들러 호출
    >
      <MdNavigateNext />
    </div>
  );
};

// 슬릭 슬라이더의 커스텀 이전 화살표 컴포넌트
const PrevArrow = (props) => {
  const { className, style, onClick } = props; // props에서 클래스 이름, 스타일, 클릭 핸들러 추출
  return (
    <div
      className={`${className} custom-arrow prev-arrow`} // 기본 클래스와 커스텀 클래스 추가
      style={{
        ...style, // 기본 스타일 적용
        display: "block",
        left: "15px", // 이전 화살표를 왼쪽에 위치
        zIndex: 1, // 다른 요소들보다 위에 표시
        fontSize: "40px",
        color: "gray",
      }}
      onClick={onClick} // 클릭 시 핸들러 호출
    >
      <MdOutlineNavigateBefore />
    </div>
  );
};

// 메인 라이브 컴포넌트
const Mainlive = () => {
  // 슬릭 슬라이더 설정 객체
  const settings = {
    dots: false, // 하단 점 표시 여부
    infinite: true, // 무한 반복 여부
    speed: 700, // 슬라이드 전환 속도 (ms)
    swipe: true, // 스와이프 가능 여부
    slidesToShow: 4, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 스크롤 시 이동할 슬라이드 수
    nextArrow: <NextArrow />, // 커스텀 다음 화살표 컴포넌트
    prevArrow: <PrevArrow />, // 커스텀 이전 화살표 컴포넌트
    responsive: [
      {
        breakpoint: 900, // 화면 너비가 1050px 이하일 때
        settings: {
          slidesToShow: 4, // 슬라이드 4개 표시
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // 화면 너비가 768px 이하일 때
        settings: {
          slidesToShow: 2, // 슬라이드 2개 표시
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580, // 화면 너비가 580px 이하일 때
        settings: {
          slidesToShow: 2, // 슬라이드 2개 표시
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Inner>
        <Items>
          <div className="livetext">라이브 커머스</div> {/* 섹션 제목 */}
          <Slider {...settings}>
            {[...Array(8)].map(
              (
                index,
                i // 8개의 라이브 카드 생성
              ) => (
                <Livecard key={i}>
                  <img src="/img/live.jpg" alt="testimg" />
                  <div className="liveHeader">
                    <div className="liveBage">LIVE</div>
                    <div className="item">
                      <div className="viewers">9,452 시청</div>
                      <div className="point">+500P</div>
                    </div>
                  </div>
                  <div className="liveInfo">
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
              )
            )}
          </Slider>
        </Items>
      </Inner>
    </Wrapper>
  );
};

export default Mainlive; // Mainlive 컴포넌트 내보내기
