import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import LiveProfileImg from "../../img/LiveProfile.jpg";
import LiveView from "../../img/Live.jpg";
import SocialBtnIcon from "../common/SocialBtnIcon";

const Commerce = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
`;

const LeftContent = styled.section`
  flex: 2;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(0, 0, 0, 0.9);
  .faXmark {
    position: absolute;
    top: 33px;
    right: 30px;
    color: #fff;
    font-size: 25px;
    cursor: pointer;
  }
`;

const Live = styled.div`
  width: 500px;
  height: 700px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-image: url(${LiveView});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  @media screen and (max-width: 1050px) {
    width: 400px;
    height: 600px;
  }
  @media screen and (max-width: 768px) {
    width: 390px;
  }
`;

// const LiveStatus = styled.div`
//   width: 224px;
//   height: 57px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   top: 5px;
//   left: 10px;
//   gap: 10px;
//   color: #fff;
//   .liveViewer {
//     margin-left: 13px;
//   }
//   @media screen and (max-width: 1050px) {
//     font-size: 12px;
//     top: 0;
//     left: 0;
//     .liveViewer {
//       margin-left: 5px;
//       font-size: 12px;
//     }
//   }
// `;

// const LivePoint = styled.div`
//   width: 500px;
//   height: 85px;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   position: absolute;
//   bottom: 0;
//   border-radius: 0 0 8px 8px;
//   background-color: rgba(0, 0, 0, 0.8);
//   .point {
//     width: 140px;
//     height: 36px;
//     border: none;
//     border-radius: 8px;
//     background-color: var(--color-white);
//     cursor: pointer;
//     transition: all 0.3s;
//     &:hover {
//       background-color: var(--color-facebookblue);
//       color: var(--color-white);
//     }
//   }
//   .pointDS {
//     color: var(--color-white);
//   }

//   @media screen and (max-width: 1050px) {
//     width: 400px;
//     height: 70px;
//     padding: 0 20px;
//     .point {
//       width: 100px;
//       height: 26px;
//       font-size: 12px;
//     }
//     .pointDS {
//       font-size: 12px;
//     }
//     .pointTime {
//       width: 20px;
//       height: 20px;
//       font-size: 12px;
//     }
//   }
// `;

const RightContent = styled.section`
  background: #fff;
  flex: 1;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .socialBtnIcon {
    width: 90%;
  }
  /* .commentList {
    width: 90%;
    border: 1px solid #f00;
  } */
`;

const LiveProfile = styled.div`
  width: 100%;
  padding: 0 40px;
  display: flex;
  .profileImg {
    background-color: var(--color-light-gray-02);
    border-radius: 50%;
    img {
      width: 80px;
      border-radius: 50%;
    }
  }
  @media screen and (max-width: 1050px) {
    padding: 0 50px;
  }
`;

const LiveProfileSelf = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-left: 20px;
  .profileName {
    font-size: var(--font-size-title-04);
    font-weight: bold;
    color: var(--color-gray-01);
  }
  .profiledesc {
    font-size: var(--font-size-description-01);
    font-weight: 400;
    color: var(--color-gray-01);
  }
`;

const LiveContents = styled.div`
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: var(--font-size-description-01);
  color: var(--color-gray-01);
  h3 {
    border-bottom: 1px solid var(--color-light-gray-01);
    padding-bottom: 15px;
    /* padding: 15px 0; */
    font-size: var(--font-size-description-01);
  }
  @media screen and (max-width: 1050px) {
    padding: 0 50px;
    font-size: 14px;
  }
`;

const ModalLive = () => {
  return (
    <>
      <Commerce>
        <LeftContent>
          <FontAwesomeIcon className="faXmark" icon={faXmark} />
          <Live></Live>
        </LeftContent>
        <RightContent>
          <LiveProfile>
            <div className="profileImg">
              <img src={LiveProfileImg} alt="LiveProfileImg" />
            </div>
            <LiveProfileSelf>
              <div className="profileName">미니멀데이</div>
              <div className="profiledesc">6시간 전</div>
            </LiveProfileSelf>
          </LiveProfile>
          <LiveContents>
            <p>
              문장 때 그래픽 차지하는 프로젝트 무언가를 입숨은 때로 지칭하는
              로렘 표준 문장 차지하는 채움 폰트, 채워지기 입숨을 내용이 모형의
              사용된다. 분야에서 채워지기 최종 요소나 용도로 채우기 무언가를
              때로 이용된다.
            </p>
          </LiveContents>
          <div className="socialBtnIcon">
            <SocialBtnIcon />
          </div>
          {/* <div className="commentList">
            <CommentList />
          </div> */}
        </RightContent>
      </Commerce>
    </>
  );
};

export default ModalLive;
