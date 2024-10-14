import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick"; // 슬릭 슬라이더 import
import {
  MainTitle_18_b,
  MainTitle_22_b,
  SubDescription_12_m,
  SubDescription_14_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { DataStateContext } from "../../App";
import ModalLive from "../Modal/ModalLive";

// 전체 컴포넌트를 감싸는 Wrapper 스타일 컴포넌트
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

// 내부 컨텐츠를 담는 Inner 스타일 컴포넌트
const Inner = styled.div`
  margin: 20px 0;
  /* border: 1px solid red; */
  width: var(--inner-width-02);
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

  @media screen and (max-width: 768px) {
    margin: 0;
    box-shadow: none;
    background-color: inherit;
    padding: 0;
    width: 90vw; // 화면 너비의 90%로 설정
    min-width: 360px;
  }

  .livetext {
    ${MainTitle_22_b}
    margin-bottom: 15px;
    color: ${(props) => props.theme.textColor};
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
  max-width: 244px;
  height: 100%;
  height: auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100%;
    /* height: 52vh; */
  }
  .liveVideo {
    width: 100%;
    height: 350px;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  // 라이브 헤더 섹션 스타일
  .liveHeader {
    display: flex;
    align-items: center;
    padding-left: 10px;
    gap: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: var(--color-white);
    position: absolute;
    width: 100%;
    height: 50px;
    border-radius: 8px 8px 0 0;
    top: 0;
    .liveBage {
      background: #ed413f;
      ${SubDescription_16_n}
      padding: 0 5px;
      border-radius: 3px;
      margin-right: 5px;
      font-size: 12px;
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
    .info {
      flex-grow: 1;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .subtitle {
        ${SubDescription_16_n}
        display: flex;
        align-items: center;
      }

      .title {
        ${SubDescription_16_n}
      }

      .item {
        display: flex;
        justify-content: space-between;
        .price {
          ${SubDescription_16_n}
          display: flex;
          gap: 3px;
          span {
            color: red;
          }
        }

        button {
          width: auto;
          ${SubDescription_12_m}
          border: none;
          border-radius: 8px;
          padding: 2px 7px;
          background: var(--color-gray-01);
          color: var(--color-white);
          cursor: pointer;
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
      }
    }
    @media screen and (max-width: 768px) {
      .info {
        gap: 0;
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

// const PrevArrow = ({ onClick }) => {
//   return (
//     <PrevBtn onClick={onClick}>
//       <MdOutlineNavigateBefore />
//     </PrevBtn>
//   );
// };

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
  const data = useContext(DataStateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const mockData = data?.mockData?.liveCommerce?.map((item) => ({
    ...item,
    formattedPrice: new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(item?.products?.discountPrice),
  }));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
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
        breakpoint: 616,
        settings: {
          slidesToShow: 2, // 슬라이드 2개 표시
          slidesToScroll: 1,
        },
      },
    ],
  };
  const openLive = (item) => {
    setSelectedItem(item); // 선택된 항목 데이터를 상태에 저장
    setIsModalOpen(true); // 모달을 열기
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Wrapper>
        <Inner>
          <Items>
            <div className="livetext">라이브 커머스</div>
            <Slider {...settings}>
              {mockData &&
                mockData.map((item, index) => (
                  <Livecard key={index} onClick={() => openLive(item)}>
                    <div className="liveVideo">
                      <video
                        muted
                        loop
                        onMouseEnter={(e) => e.target.play()} // 마우스 오버 시 재생
                        onMouseLeave={(e) => {
                          e.target.pause();
                        }}
                      >
                        <source
                          src={item?.liveStream?.videoUrl}
                          type="video/mp4"
                        ></source>
                      </video>
                    </div>
                    <div className="liveheader">
                      <div className="liveBage">LIVE</div>
                      <div className="item">
                        <div className="viewers">9,452 시청</div>
                        <div className="point">+500P</div>
                      </div>
                    </div>
                    <div className="liveinfo">
                      <div className="info">
                        <span className="subtitle">
                          {/* <FaStar />
                        5% 추가할인
                        <FaStar /> */}
                        </span>
                        <span className="title">{item?.products?.name}</span>
                        <div className="item">
                          <span className="price">
                            <span>30%</span>
                            {item.formattedPrice}
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
      {isModalOpen && <ModalLive item={selectedItem} closeModal={closeModal} />}
    </>
  );
};

export default Mainlive; // Mainlive 컴포넌트 내보내기
