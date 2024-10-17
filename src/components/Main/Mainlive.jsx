import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IoEyeSharp } from "react-icons/io5";
import Slider from "react-slick"; // 슬릭 슬라이더 import
import {
  MainTitle_18_b,
  MainTitle_22_b,
  SubDescription_12_m,
  SubDescription_16_n,
  SubDescription_14_n,
} from "../../styles/GlobalStyles.styles";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { DataStateContext } from "../../App";
import ModalLive from "../Modal/ModalLive";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1050px) {
  }
  @media screen and (max-width: 768px) {
    margin-top: 0;
    /* width: 90vw; */
  }
`;

const Inner = styled.div`
  width: var(--inner-width-02);
  height: 480px;
  padding: 27px 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-30);
  position: relative;
  background-color: ${(props) => props.theme.ContainColor};

  @media screen and (max-width: 1050px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    height: 100%;
    margin: 0;
    box-shadow: none;
    background-color: inherit;
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
  cursor: pointer;
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

  .liveheader {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    gap: 2px;
    padding-left: 10px;
    color: var(--color-white);
    border-radius: 8px 8px 0 0;
    .liveBage {
      background: #ed413f;
      padding: 2px 7px;
      border-radius: 3px;
      margin-right: 5px;
      font-size: 12px;
    }
    .item {
      display: flex;
      gap: 10px;
      .viewers {
        display: flex;
        align-items: center;
        /* padding-left: 40px; */
        gap: 4px;
        ${SubDescription_14_n}
        @media screen and (max-width: 768px) {
          ${SubDescription_14_n}
        }
      }
      .point {
        ${SubDescription_14_n}
        font-weight:bold;
        position: absolute;
        right: 10px;
        @media screen and (max-width: 768px) {
          ${SubDescription_14_n}
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
      /* gap: 10px; */

      .subtitle {
        ${SubDescription_14_n}

        display: flex;
        align-items: center;
      }

      .title {
        ${SubDescription_14_n}
        font-weight:bold;
      }

      .item {
        display: flex;
        justify-content: space-between;

        .price {
          padding-top: 4px;
          ${SubDescription_14_n}
          font-weight:bold;
          display: flex;
          gap: 5px;
          span {
            color: #ed413f;
            /* color: var(--color-facebookblue); */
          }
        }

        button {
          width: auto;
          ${SubDescription_12_m}

          border: none;
          border-radius: 8px;
          padding: 6px 7px;
          background: var(--color-gray-01);
          color: var(--color-white);
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            opacity: 0.8;
          }
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
`;
// 슬릭슬라이더 커스텀 화살표
const NextBtn = styled.span`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: var(--color-light-gray-01);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: -30px;
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
  align-items: center;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: -30px;
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
  const data = useContext(DataStateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [shuffledData, setShuffledData] = useState([]);
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 컴포넌트가 마운트될 때 데이터를 랜덤하게 섞음
  useEffect(() => {
    if (data?.mockData?.liveCommerce) {
      const randomData = shuffleArray(data.mockData.liveCommerce);
      setShuffledData(randomData);
    }
  }, [data]);
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
          slidesToShow: 2,
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
              {shuffledData &&
                shuffledData.map((item, index) => (
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
                        <div className="viewers">
                          <IoEyeSharp />
                          {item?.liveStream?.currentViewers}
                        </div>
                      </div>
                    </div>
                    <div className="liveinfo">
                      <div className="info">
                        <span className="subtitle">
                          {item?.liveStream?.name}
                        </span>
                        <span className="title">{item?.products[0]?.name}</span>
                        <div className="item">
                          <span className="price">
                            <span>{item?.products[0]?.discountRate}</span>
                            {item?.products[0]?.discountPrice}
                          </span>
                          <button>+500P</button>
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

export default Mainlive;
