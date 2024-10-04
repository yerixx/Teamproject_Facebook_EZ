import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import {
  MainTitle_18_b,
  SubDescription_12_m,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 390px) {
    width: 1000px;
  }
`;

const Inner = styled.div`
  width: 1000px;
  height: auto;
  padding: 27px 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 390px) {
    padding: 20px;
    border-radius: 0;
  }

  .livetext {
    ${MainTitle_18_b};
    margin-bottom: 15px;
  }
`;

const Live = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const Livecard = styled.div`
  flex: 1 1 244px;
  max-width: 244px;
  height: auto;
  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); */
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  > img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;

    @media (max-width: 768px) {
      width: 175px;
      height: 250px;
    }
    @media (max-width: 390px) {
      width: 200px;
      height: 250px;
    }
  }

  .liveheader {
    display: flex;
    align-items: center;
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: var(--color-white);
    position: absolute;
    top: 0;
    width: 100%;
    height: 43px;
    border-radius: 8px 8px 0 0;
    @media (max-width: 390px) {
      width: 200px;
    }

    .liveBage {
      background: #ed413f;
      ${SubDescription_16_n}
      padding: 4px 7px;
      border-radius: 3px;
      margin-right: 5%;

      @media (max-width: 768px) {
        ${SubDescription_12_m}
      }
    }
    .item {
      display: flex;
      gap: 40px;
      @media (max-width: 768px) {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 15px;
      }
      .viewers {
        ${SubDescription_16_n}
        @media (max-width: 768px) {
          width: 100%;
          ${SubDescription_12_m}
        }
      }
      .point {
        ${SubDescription_16_n}
        @media (max-width: 768px) {
          ${SubDescription_12_m}
        }
      }
    }
  }

  .liveinfo {
    display: flex;
    align-items: center;
    padding: 5px 5px;
    background: rgba(0, 0, 0, 0.6);
    color: var(--color-white);
    height: 85px;
    @media (max-width: 390px) {
      width: 200px;
      border-radius: 0 0 8px 8px;
    }
    > img {
      width: 50px;
      height: 50px;
      opacity: 0.8;
      border-radius: 8px;
      @media (max-width: 768px) {
        width: 50px;
        height: 50px;
      }
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

        @media (max-width: 768px) {
          font-size: 12px;
        }
      }

      .title {
        ${SubDescription_16_n}
        @media (max-width: 768px) {
          font-size: 14px;
        }
      }

      .item {
        display: flex;
        justify-content: space-between;

        .price {
          ${SubDescription_12_m}
          display: flex;
          gap: 3px;

          span {
            color: red;
          }

          @media (max-width: 768px) {
            font-size: 10px;
          }
        }

        button {
          font-size: 11px;
          border: none;
          border-radius: 8px;
          padding: 3px 7px;
          background: var(--color-gray-01);
          color: var(--color-white);
          cursor: pointer;

          @media (max-width: 768px) {
            font-size: 9px;
            padding: 2px 5px;
          }
        }
      }
    }
  }
`;

const Mainlive = () => {
  return (
    <Wrapper>
      <Inner>
        <div className="livetext">라이브 커머스</div>
        <Live>
          {[...Array(4)].map((_, index) => (
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
                <img src="../public/img/live.jpg" alt="profile" />
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
        </Live>
      </Inner>
    </Wrapper>
  );
};

export default Mainlive;
