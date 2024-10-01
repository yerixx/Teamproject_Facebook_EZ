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
`;

const Inner = styled.div`
  width: 1000px;
  max-width: 100%;
  height: auto;
  padding: 27px 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  display: flex;
  flex-direction: column;

  .livetext {
    ${MainTitle_18_b};
    margin-bottom: 15px;
  }
`;

const Live = styled.div`
  display: flex;
  gap: 16px;
`;

const Livecard = styled.div`
  flex: 1 1 244px;
  max-width: 244px;
  height: auto;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  > img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
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
    height: 45px;
    border-radius: 8px 8px 0 0;

    .liveBage {
      background: #ed413f;
      ${SubDescription_16_n}
      padding: 4px 7px;
      border-radius: 3px;
      margin-right: 10px;
    }

    .viewers {
      ${SubDescription_16_n}
      margin-right: 50px;
    }

    .point {
      ${SubDescription_12_m}
    }
  }

  .liveinfo {
    display: flex;
    align-items: center;
    padding: 10px;
    background: rgba(0, 0, 0, 0.6);
    color: var(--color-white);

    > img {
      width: 60px;
      height: 60px;
      opacity: 0.8;
      border-radius: 8px;
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
      }

      .title {
        ${SubDescription_16_n}
        margin-top: 5px;
      }

      .item {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .price {
          ${SubDescription_12_m}
          display: flex;
          gap: 3px;

          span {
            color: red;
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
                <div className="viewers">9,452 시청</div>
                <div className="point">+500P</div>
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
