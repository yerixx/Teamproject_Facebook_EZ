import React, { useState, useEffect, useContext } from "react";

import { DataDispatchContext, DataStateContext } from "../../App";

import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import { styled } from "styled-components";

import CountdownCircle from "../common/CountdownCircle";

import fbIcon from "/img/fbIcon.svg";
import liveIcon from "/img/liveIcon.svg";
import LiveView from "/img/Live.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { IoCloseOutline } from "react-icons/io5";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

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
    display: none;
  }
`;

const CloseIconmb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 34px;
    right: 24px;
    font-size: 25px;
    color: var(--color-white);
    border-radius: 50%;
    padding: 7px;
    cursor: pointer;
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
  overflow: hidden;
  height: 100px;
  @media screen and (max-width: 768px) {
    width: 390px;
    height: 190px;
    position: absolute;
    bottom: 69px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
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
    animation: slide-up 0.5s ease forwards;

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

const CommentLiveInfomb2 = styled.div`
  display: flex;
  position: relative;
  right: 0;
  gap: 10px;
  padding: 10px;
  font-size: 15px;
  font-weight: 400;
  color: var(--color-gray-01);
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  @media screen and (max-width: 768px) {
    display: none;
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
    z-index: 2;
    &:hover {
      background-color: var(--color-facebookblue);
      color: var(--color-white);
    }
  }
  .pointDS {
    text-align: end;
    width: 290px;
    margin-right: 10px;
    color: var(--color-white);
  }

  @media screen and (max-width: 1050px) {
    width: 400px;
    height: 70px;
    padding: 0 20px;
    .point {
      width: 140px;
      height: 30px;
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
  width: 100%;
  height: 380px;
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
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 20px;
    color: var(--color-gray-02);
  }
  .test {
    height: 60px;
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

const WrapperForm = styled.form`
  width: 100%;
  height: fit-content;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

const CommentCont = styled.div`
  min-width: 29%;
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 10px;
  padding: 10px;

  @media (max-width: 768px) {
    min-width: 33.3%;
    padding: 0;
  }
  .commentUpLoadprofile {
    width: 100%;
    display: flex;
    align-items: center;
    .profileImg {
      width: 45px;
      height: 45px;
      border-radius: 100px;
      object-fit: cover;
    }
    .profileuploadText {
      width: 100%;
      height: 40px;
      margin: 0 15px;
      padding: 0 20px;
      border: 1px solid #ccc;
      border-radius: 20px;
      &:focus {
        outline: none;
      }
    }

    .submitBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
    }

    .submitBtn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

const CommenstMb2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalLive = ({ item, closeModal, postId, onCreateComment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Content to be submitted:", content); // 입력 값 확인

    if (!content.trim()) return; // 공백 방지

    try {
      setIsLoading(true);
      await onCreateComment(content); // postId는 CommentSection에서 이미 처리됨
      setContent(""); // 입력창 초기화
    } catch (error) {
      console.error("댓글 업로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const comments = [
    {
      id: 1,
      name: "이승연",
      text: "가격이 정말 합리적이에요!",
      img: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
    },
    {
      id: 2,
      name: "김예지",
      text: "리뷰 보고 구매하려고 하는데, 혹시 실물사진은 어디서 볼 수 있나요?",
      img: "https://cdn.pixabay.com/photo/2019/11/22/03/58/cat-4644008_1280.jpg",
    },
    {
      id: 3,
      name: "박예림",
      text: "오늘 특별 할인가요? 이 가격이면 완전 대혜자!!😀😆",
      img: "https://cdn.pixabay.com/photo/2017/07/19/10/19/cat-2518653_1280.jpg",
    },
    {
      id: 4,
      name: "박태환",
      text: "이 상품 아직 재고가 있나요?",
      img: "https://cdn.pixabay.com/photo/2018/06/29/03/16/panda-3505189_1280.jpg",
    },
    {
      id: 5,
      name: "김정하",
      text: "특별한 이벤트나 프로모션이 있는지 궁금해요~~",
      img: "https://cdn.pixabay.com/photo/2023/05/09/07/18/space-7980556_1280.jpg",
    },
    {
      id: 6,
      name: "이수진",
      text: "이번꺼 대박!! 사고 싶어서 기다리고 있어요!ㅎㅎ",
      img: "https://cdn.pixabay.com/photo/2019/02/18/17/57/flower-4004980_1280.jpg",
    },
    {
      id: 7,
      name: "지성준",
      text: "혹시 옵션 변경 가능할까요?",
      img: "https://cdn.pixabay.com/photo/2016/07/16/19/36/space-probe-1522546_1280.jpg",
    },
    {
      id: 8,
      name: "이찬우",
      text: "제품을 사용해보고 직접 후기를 남겨주신 분이 많아서 좋네요~",
      img: "https://cdn.pixabay.com/photo/2020/04/11/08/14/skywheel-5029327_1280.jpg",
    },
    {
      id: 9,
      name: "박수진",
      text: "배송 기간이 얼마나 걸릴까요? 빨리 받아보고 싶은 마음에 고민중입니다. ",
      img: "https://cdn.pixabay.com/photo/2012/09/04/21/20/penguin-56101_1280.jpg",
    },
  ];

  const [visibleComments, setVisibleComments] = useState([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUserData } = useContext(DataStateContext);
  const { dispatch } = useContext(DataDispatchContext);

  const [resetKey, setResetKey] = useState(null); // 카운트다운 리셋을 위한 키
  const [remainingTime, setRemainingTime] = useState(null); // 남은 시간을 저장할 상태

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
    } catch (error) {
      console.error("Firebase에 포인트 업데이트 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (item && currentUserData) {
      const lastPointTime = localStorage.getItem(
        `lastPointTime_${item.liveStream.id}`
      );
      const now = new Date();

      if (lastPointTime) {
        const lastTime = new Date(lastPointTime);
        const diff = now - lastTime;
        const diffMinutes = Math.floor(diff / 1000 / 60);

        if (diffMinutes < 30) {
          // 30분이 지나지 않았을 경우
          const remainingMinutes = 30 - diffMinutes; // 30분 기준으로 남은 시간 계산
          setPointMessage(
            `${remainingMinutes}분 후에 포인트를 다시 적립할 수 있습니다.`
          );
          setRemainingTime(0); // 카운트다운을 숨김
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

        // 각 동영상별 포인트 적립 시간 저장
        localStorage.setItem(
          `lastPointTime_${item.liveStream.id}`,
          new Date().toISOString()
        );

        // 메시지 업데이트 및 알림
        setPointMessage(
          "포인트가 적립되었습니다! 30분 후에 다시 받을 수 있습니다."
        );
        alert("500포인트가 적립되었습니다!");

        // 포인트 적립 후 카운트다운을 숨김
        setRemainingTime(0);

        // 30분 후에 다시 카운트다운을 시작
        const resetTimer = setTimeout(
          () => {
            setRemainingTime(7000); // 7초 카운트다운 다시 시작
            setPointMessage("7초 후에 500 포인트가 적립됩니다.");
          },
          30 * 60 * 1000
        ); // 30분 후에 다시 카운트다운 시작

        return () => clearTimeout(resetTimer);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [item, currentUserData]);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleComments((prev) => {
        const newComments = [...prev, comments[index]];
        if (newComments.length > 4) {
          newComments.shift();
        }
        return newComments;
      });
      setIndex((prev) => (prev + 1) % comments.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [comments, index]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
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
              <button
                onClick={() => alert("서비스 준비중 입니다.")}
                className="point"
              >
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
            {visibleComments.map((comment, i) => (
              <CommentLiveInfomb key={i}>
                <img src={comment.img} alt={`${comment.name}의 프로필`} />
                <div className="desc">
                  <h3>{comment.name}</h3>
                  <p>{comment.text}</p>
                </div>
              </CommentLiveInfomb>
            ))}
          </CommenstMb>
          <CloseIconmb onClick={closeModal}>
            <IoCloseOutline className="closeIconmb" />
          </CloseIconmb>
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
            <h3>실시간 댓글</h3>
            <span>
              영상과 무관하거나 욕설, 비방 등의 댓글은 관리자에 의해 삭제될 수
              있습니다.
            </span>
            <CommenstMb2>
              {visibleComments.map((comment) => (
                <CommentLiveInfomb2 key={comment?.id}>
                  <img src={comment?.img} alt={`${comment?.name}의 프로필`} />
                  <div className="desc">
                    <h4>{comment?.name}</h4>
                    <p>{comment?.text}</p>
                  </div>
                </CommentLiveInfomb2>
              ))}
            </CommenstMb2>
            <WrapperForm onSubmit={handleSubmit}>
              <CommentCont>
                <div className="commentUpLoadprofile">
                  {/* <img src={testCat} className="profileImg" alt="profileImg" /> */}
                  <img
                    className="profileImg"
                    src={
                      currentUserData?.profileImage || "/img/defaultProfile.jpg"
                    }
                    alt="Profile"
                  />
                  <input
                    className="profileuploadText"
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={content}
                    required
                  />
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="submitBtn"
                  >
                    {isLoading ? <FaSpinner /> : <BsArrowReturnLeft />}
                  </button>
                </div>
              </CommentCont>
            </WrapperForm>
          </Comment>
        </RightContent>
      </Commerce>
    </>
  );
};

export default ModalLive;
