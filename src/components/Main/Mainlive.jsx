import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { MainTitle_18_b } from "../../styles/GlobalStyles.styles";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Inner = styled.div`
  width: 1000px;
  height: 500px;
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
  gap: 8px;
`;

const Livecard = styled.div`
  width: 244px;
  height: 400px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    opacity: 0.8;
  }
  .liveheader {
    width: 100%;
    height: 45px;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px 8px 0 0;
    .liveBage {
      position: absolute;
      top: 7px;
      left: 10px;
      background: #ed413f;
      color: var(--color-white);
      font-size: 16px;
      padding: 4px 7px;
      border-radius: 3px;
    }
    .viewers {
      position: absolute;
      top: 10px;
      left: 60px;
      color: var(--color-white);
      font-size: 16px;
    }
    .point {
      position: absolute;
      top: 10px;
      right: 10px;
      color: var(--color-white);
    }
  }

  .liveinfo {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0px;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding-left: 6px;
    border-radius: 0 0 8px 8px;
    img {
      width: 52px;
      height: 52px;
      opacity: 0.6;
    }

    .info {
      padding: 10px;
      display: flex;
      flex-direction: column;
      color: var(--color-white);

      .subtitle {
        font-size: 16ㅔㅌ;
      }

      .title {
        font-size: 16px;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 10px;

        .price {
          font-size: 12px;
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
          <Livecard>
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
          <Livecard>
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
          <Livecard>
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
          <Livecard>
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
        </Live>
      </Inner>
    </Wrapper>
  );
};

export default Mainlive;
