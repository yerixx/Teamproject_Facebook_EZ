import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { DataDispatchContext } from "../../App";

import CountdownCircle from "../common/CountdownCircle";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import fbIcon from "../../img/fbIcon.svg";
import liveIcon from "../../img/liveIcon.svg";
import LiveView from "../../img/Live.jpg";
import { IoCloseOutline } from "react-icons/io5";

const Commerce = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
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
  }
`;

const LiveStatus = styled.div`
  width: 224px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
  gap: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  .liveViewer {
    margin-left: 13px;
  }
  @media screen and (max-width: 1050px) {
    width: 200px;
    font-size: 12px;
    .liveViewer {
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
    background-color: #ccc;
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
  const { id } = useParams(); // URL에서 id 파라미터 받아오기
  const { dispatch } = useContext(DataDispatchContext);
  const [pointMessage, setPointMessage] = useState(
    "7초 후에 500 포인트가 적립됩니다."
  );
  const [resetKey, setResetKey] = useState(null); // 카운트다운 리셋을 위한 키
  const [remainingTime, setRemainingTime] = useState(null); // 남은 시간을 저장할 상태
  const navigate = useNavigate();

  // 현재 id와 일치하는 제품 찾기
  const currentProduct =
    item.products && item.products.id === parseInt(id) ? item.products : null;

  useEffect(() => {
    if (item) {
      const storedIds =
        JSON.parse(localStorage.getItem("earnedPointIds")) || [];
      const lastAddedTime = localStorage.getItem("lastAddedTime");

      // 24시간 내에 포인트를 적립한 적이 있는지 확인
      if (
        lastAddedTime &&
        Date.now() - new Date(lastAddedTime).getTime() < 86400000
      ) {
        setPointMessage("내일 다시 포인트를 적립할 수 있어요~");
        setRemainingTime(0);
        return; // 24시간이 지나지 않았으면 애니메이션 실행 안함
      }

      // URL의 id와 일치하는 제품을 찾음
      const currentProduct = item.products.find(
        (product) => product.id === parseInt(id)
      );

      if (storedIds.includes(id)) {
        setPointMessage("내일 다시 포인트를 적립할 수 있어요~");
      } else {
        const startTime = Date.now();
        setResetKey(startTime);
        setRemainingTime(7);

        let timer = setTimeout(() => {
          dispatch({
            type: "ADD_POINTS",
            value: 500,
          });
          setPointMessage("내일 다시 포인트를 적립할 수 있어요~");
          alert("500포인트가 적립되었습니다!");

          // 포인트 적립 시간 저장
          localStorage.setItem("lastAddedTime", new Date().toISOString());

          // 적립된 ID 저장
          storedIds.push(id);
          localStorage.setItem("earnedPointIds", JSON.stringify(storedIds));

          setTimeout(() => {
            setResetKey(Date.now());
            setRemainingTime(7);
          }, 86400000); // 24시간 후 다시 실행
        }, 7000);

        return () => clearTimeout(timer);
      }
    }
  }, [id, item, dispatch]);

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
            <video src={item.liveStream.videoUrl} autoPlay loop></video>
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
              <div className="countdown">
                <CountdownCircle
                  resetKey={resetKey}
                  remainingTime={remainingTime}
                />
              </div>
            </LivePoint>
          </Live>
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
            <NoComment>
              <div className="commentIcon">
                <FontAwesomeIcon className="faComments" icon={faComments} />
              </div>
              <p>
                댓글이 없습니다. <br /> 첫 번째 댓글을 남겨주세요.
              </p>
            </NoComment>
            <div className="test"></div>
          </Comment>
        </RightContent>
      </Commerce>
    </>
  );
};

export default ModalLive;
