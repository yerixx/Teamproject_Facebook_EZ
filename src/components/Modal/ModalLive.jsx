import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { DataDispatchContext, DataStateContext } from "../../App";

import CountdownCircle from "../common/CountdownCircle";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import fbIcon from "../../img/fbIcon.svg";
import liveIcon from "../../img/liveIcon.svg";
import LiveView from "../../img/Live.jpg";
import { IoCloseOutline } from "react-icons/io5";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Commerce = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`;

const LeftContent = styled.section`
  flex: 2;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(0, 0, 0, 0.9);
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 33px;
  right: 30px;
  font-size: 25px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    color: var(--color-white);
  }
  @media screen and (max-width: 768px) {
    height: 100vh;
  }
`;

const Live = styled.div`
  overflow: hidden;
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
  cursor: pointer;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1050px) {
    width: 400px;
    height: 600px;
  }
  @media screen and (max-width: 768px) {
    width: 390px;
    height: 100vh;
    background-image: none;
    .liveVideo {
      video {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 390px;
        height: 100vh;
        object-fit: cover;
      }
    }
  }
`;

const SellItemsmb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    width: 350px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 90px;
    padding: 8px;
    border-radius: 8px 8px 0 0;
    background: var(--color-light-gray-02);
    h2 {
      display: flex;
      text-align: left;
      margin-left: 5px;
      font-size: 12px;
      color: var(--color-gray-01);
    }
  }
`;

const SellItemsinfomb = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  @media screen and (max-width: 768px) {
    width: 350px;
    height: 80px;
    top: 125px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    border-radius: 0 0 8px 8px;
    background: var(--color-light-gray-02);
    transition: opacity 0.5s ease;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  }
`;

const SellItemImgmb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
    }
  }
`;

const SellItemDescmb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    font-size: 12px;
    margin-left: 60px;
    gap: 3px;
    span {
      color: #f00;
      padding-right: 5px;
    }
  }
`;

const CommenstMb = styled.div`
  display: flex;
  width: 390px;
  position: absolute;
  bottom: 69px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  height: 100px;
  @media screen and (max-width: 768px) {
    width: 390px;
    position: absolute;
    bottom: 69px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    height: 100px;
  }
`;

const CommentLiveInfomb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
    padding-left: 20px;
    font-size: 12px;
    color: #fff;
    gap: 5px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    animation: slide-up 0.5s ease;
    @keyframes slide-up {
      from {
        transform: translateY(10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
`;

const LiveStatus = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 50px;
  display: flex;
  gap: 5px;
  top: 10px;
  left: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  .liveViewer {
    margin-bottom: 4px;
  }
  @media screen and (max-width: 1050px) {
    width: 200px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    width: 355px;
    display: flex;
    justify-content: flex-start;
    padding: 20px;
    margin-top: 20px;
    object-fit: cover;
    .fbLogo,
    .liveLogo,
    .liveViewer {
      position: absolute;
      z-index: 1;
    }
    .liveLogo {
      margin-left: 40px;
    }
    .liveViewer {
      padding: 0 80px;
      margin-right: 70px;
    }
  }
`;

const LivePoint = styled.div`
  width: 500px;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  .point {
    width: 140px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background-color: var(--color-white);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: var(--color-facebookblue);
      color: var(--color-white);
    }
  }
  .pointDS {
    text-align: end;
    width: 230px;
    color: var(--color-white);
  }

  @media screen and (max-width: 1050px) {
    width: 400px;
    height: 70px;
    padding: 0 20px;
    .point {
      width: 100px;
      height: 26px;
      font-size: 12px;
    }
    .pointDS {
      font-size: 12px;
    }
    .pointTime {
      width: 20px;
      height: 20px;
      font-size: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 390px;
  }
`;

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
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LiveProfile = styled.div`
  width: 100%;
  padding: 0 40px;
  display: flex;
  .profileImg {
    width: 80px;
    height: 80px;
    background-color: var(--color-light-gray-02);
    border-radius: 50%;
    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;

const LiveProfilemb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    position: absolute;
    top: 80px;
    left: 20px;
    .profileImgmb {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
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
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const LiveProfileSelfmb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-left: 13px;
    gap: 5px;
    font-size: 12px;
    color: #fff;
    padding-bottom: 10px;
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
    font-size: var(--font-size-description-01);
  }
  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media screen and (max-width: 1050px) {
    padding: 0 50px;
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SellItem = styled.div`
  width: 480px;
  padding-bottom: 15px;
  background-color: var(--color-light-gray-02);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  h3 {
    width: 100%;
    color: var(--color-facebookblue);
    border-bottom: 3px solid var(--color-facebookblue);
    padding: 10px 0;
    font-size: var(--font-size-description-01);
    text-align: center;
  }
  @media screen and (max-width: 1050px) {
    font-size: 14px;
    h3 {
      font-size: 14px;
    }
  }
`;

const SellInfos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  padding: 0 20px;
  @media screen and (max-width: 1050px) {
    gap: 8px;
  }
`;

const SellItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SellItemImg = styled.div`
  width: 70px;
  height: 70px;
  object-fit: cover;
  cursor: pointer;
  @media screen and (max-width: 1050px) {
    background-color: none;
  }
`;

const SellItemDesc = styled.div`
  p {
    color: var(--color-gray-01);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    color: #f00;
    margin-right: 8px;
  }
  @media screen and (max-width: 1050px) {
    p {
      font-size: 12px;
      padding-bottom: 0;
    }
  }
`;

const Comment = styled.div`
  border: 1px solid #f00;

  width: 100%;
  height: 100%;
  padding: 0 40px;
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-facebookblue);
    border-bottom: 3px solid var(--color-facebookblue);
    padding: 10px 0;
    font-size: var(--font-size-description-01);
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    color: var(--color-gray-01);
  }
  .test {
    height: 60px;
    border: 1px solid #f00;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 1050px) {
    padding: 0 50px;
    h3,
    span {
      font-size: 14px;
    }
    .test {
      height: 50px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NoComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  color: var(--color-gray-01);
  border: 1px solid #f00;
  .commentIcon {
    margin-bottom: 10px;
    .faComments {
      font-size: 40px;
      color: var(--color-facebookblue);
    }
  }
  @media screen and (max-width: 1050px) {
    font-size: 12px;
    .faComments {
      font-size: 30px;
    }
  }
`;

const ModalLive = ({ item, closeModal }) => {
  const comments = [
    {
      id: 1,
      name: "이승연",
      text: "제가 너무 갖고 싶었던 물건인데 이런 가격에!",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "김예지",
      text: "너무 예뻐요~~",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "홍길동",
      text: "진짜 사고 싶어요!",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "박지민",
      text: "이거 재고 있나요?",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      name: "최민수",
      text: "배송 언제 되나요?",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 6,
      name: "이수진",
      text: "사고 싶어서 기다리고 있어요!",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 7,
      name: "김도현",
      text: "혹시 사이즈 변경 가능할까요?",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 8,
      name: "이찬우",
      text: "이 제품 사진이 더 있나요?",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 9,
      name: "홍길동",
      text: "특가 세일이 있나요?",
      img: "https://via.placeholder.com/40",
    },
  ];

  const [visibleComments, setVisibleComments] = useState([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUserData } = useContext(DataStateContext);
  const { dispatch } = useContext(DataDispatchContext);
  const { id } = useParams(); // URL에서 id 파라미터 받아오기
  const [resetKey, setResetKey] = useState(null); // 카운트다운 리셋을 위한 키
  const [remainingTime, setRemainingTime] = useState(null); // 남은 시간을 저장할 상태
  const navigate = useNavigate();
  const [pointMessage, setPointMessage] = useState(
    "7초 후에 500 포인트가 적립됩니다."
  );
  const updateUserPointsInFirebase = async (newPoints) => {
    try {
      const userId = auth.currentUser.uid; // 현재 사용자 UID 가져오기
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        "wallet.point": newPoints,
      });
      console.log("Firebase에 포인트 업데이트 성공:", newPoints);
    } catch (error) {
      console.error("Firebase에 포인트 업데이트 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (item && currentUserData) {
      const lastPointTime = localStorage.getItem("lastPointTime");
      const now = new Date();

      if (lastPointTime) {
        const lastTime = new Date(lastPointTime);
        const diff = now - lastTime;
        const diffMinutes = Math.floor(diff / 1000 / 60);

        if (diffMinutes < 30) {
          // 30분이 지나지 않았을 경우
          const remainingMinutes = 30 - diffMinutes;
          setPointMessage(
            `${remainingMinutes}분 후에 포인트를 다시 적립할 수 있습니다.`
          );
          return; // 포인트 적립 프로세스를 진행하지 않음
        }
      }

      // 포인트 적립 가능하므로 타이머 시작
      const timer = setTimeout(async () => {
        const newPoints = (currentUserData.wallet?.point || 0) + 500;
        await updateUserPointsInFirebase(newPoints);

        // 상태 업데이트
        dispatch({
          type: "ADD_POINTS",
          payload: 500,
        });

        // 포인트 적립 시간 저장
        localStorage.setItem("lastPointTime", new Date().toISOString());

        // 메시지 업데이트 및 알림
        setPointMessage(
          "포인트가 적립되었습니다! 30분 후에 다시 받을 수 있습니다."
        );
        alert("500포인트가 적립되었습니다!");
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [item, currentUserData]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 현재 id와 일치하는 제품 찾기

  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * item.products.length);
    const randomProductId = item.products[randomIndex].id;
    navigate(`/modallive/${randomProductId}`);
  };

  return (
    <>
      <Commerce>
        <LeftContent>
          <Live>
            <video src={item?.liveStream?.videoUrl} autoPlay loop></video>
            <LiveStatus>
              <div className="fbLogo">
                <img src={fbIcon} />
              </div>
              <div className="liveLogo">
                <img src={liveIcon} />
              </div>
              <div className="liveViewer">
                {item.liveStream.currentViewers}명 시청 중
              </div>
            </LiveStatus>
            <LivePoint>
              <button onClick={handleButtonClick} className="point">
                포인트 더 모으기
              </button>
              <div className="pointDS">{pointMessage}</div>
              {remainingTime !== 0 && (
                <div className="countdown">
                  <CountdownCircle
                    resetKey={resetKey}
                    remainingTime={remainingTime}
                  />
                </div>
              )}
            </LivePoint>
          </Live>
          <SellItemsmb onClick={toggleDropdown}>
            <h2>판매중인 상품</h2>
            <FontAwesomeIcon icon={faChevronDown} />
          </SellItemsmb>
          <SellItemsinfomb $isOpen={isOpen}>
            <SellItemImgmb>
              <img src={item?.liveStream?.profileImage} alt="SellItem1Img" />
            </SellItemImgmb>
            <SellItemDescmb>
              <p>★5%추가할인★{item?.liveStream?.name}</p>
              <b>
                <span>30%</span>19,900원
              </b>
            </SellItemDescmb>
          </SellItemsinfomb>
          <CommenstMb>
            {visibleComments.map((comment) => (
              <CommentLiveInfomb key={comment.id}>
                <img src={comment.img} alt={`${comment.name}의 프로필`} />
                <div className="desc">
                  <h3>{comment.name}</h3>
                  <p>{comment.text}</p>
                </div>
              </CommentLiveInfomb>
            ))}
          </CommenstMb>
        </LeftContent>
        <RightContent>
          <CloseIcon onClick={closeModal}>
            <IoCloseOutline className="closeIcon" />
          </CloseIcon>
          <LiveProfile>
            <div className="profileImg">
              <img src={item?.liveStream?.profileImage} alt="LiveProfileImg" />
            </div>
            <LiveProfileSelf>
              <div className="profileName">{item?.liveStream?.name}</div>
              <div className="profiledesc">{item?.liveStream?.description}</div>
            </LiveProfileSelf>
          </LiveProfile>
          <LiveContents>
            <h3>라이브 안내</h3>
            <p>{item?.liveStream?.liveInfo}</p>
          </LiveContents>
          <SellItem>
            <h3>판매중인 상품</h3>
            <SellInfos>
              {item?.products?.map((product, index) => (
                <SellItemInfo key={product?.id || index}>
                  <SellItemImg>
                    <div className="sellItemImg"></div>
                    <img
                      src={product?.productImage}
                      alt="productImage"
                      height="70px"
                      width="70px"
                    />
                  </SellItemImg>
                  <SellItemDesc>
                    <p>{product?.name}</p>
                    <b>
                      <span>{product?.discountRate}</span>
                      {product?.discountPrice}
                    </b>
                  </SellItemDesc>
                </SellItemInfo>
              ))}
            </SellInfos>
          </SellItem>
          <Comment>
            <h3>댓글</h3>
            <span>
              영상과 무관하거나 욕설, 비방 등의 댓글은 관리자에 의해 삭제될 수
              있습니다.
            </span>
            {/* <CommenstMb>
              {visibleComments.map((comment) => (
                <CommentLiveInfomb key={comment.id}>
                  <img src={comment.img} alt={`${comment.name}의 프로필`} />
                  <div className="desc">
                    <h3>{comment.name}</h3>
                    <p>{comment.text}</p>
                  </div>
                </CommentLiveInfomb>
              ))}
            </CommenstMb> */}
          </Comment>
        </RightContent>
      </Commerce>
    </>
  );
};

export default ModalLive;
