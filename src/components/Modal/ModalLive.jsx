import React, { useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {createGlobalStyle, styled} from 'styled-components';
import GlobalStyles from '../../styles/GlobalStyles.styles';

// import PostUploadField from '../detail/PostUploadField';
import CountdownCircle from '../common/CountdownCircle';
import { faChevronDown, faComments } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import fbIcon from "../../img/fbIcon.svg";
import liveIcon from "../../img/liveIcon.svg";
import LiveProfileImg from "../../img/LiveProfile.jpg";
import LiveView from "../../img/Live.jpg";
import SellItem1Img from "../../img/sellItem1.jpg"
import SellItem2Img from "../../img/sellItem2.jpg"

const Commerce = styled.div`
  /* width: 1920px;
  height: 1080px; */
  width: 100%;
  height: 100vh;
  /* margin: 0 auto; */
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100vh;
    position: relative;
  }
`;

const LeftContent = styled.section`
  /* width: 1270px; */
  flex: 2;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color:rgba(0,0,0,0.9);
  /* border: 1px solid #f00; */
  .faXmark {
    position: absolute;
    top: 33px;
    right: 30px;
    color: #fff;
    font-size: 25px;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    height: 100vh;
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
  video {
    display: none;
  }
  background-size: cover;
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
        /* transform: translate(-50%, -50%); */
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
    top: 150px;
    padding: 8px;
    border-radius: 8px;
    background: var(--color-light-gray-02);
    cursor: pointer; 
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
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')}; 
  @media screen and (max-width: 768px) {
    width: 350px;
    padding: 15px;
    /* justify-content: space-between; */
    align-items: center;
    position: absolute;
    top: 185px;
    border-radius: 8px;
    background: var(--color-light-gray-02);
    transition: opacity 0.5s ease;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  }
`;

const SellItemImgmb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    position: relative;
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
    position: relative;
    font-size: 12px;
    margin-left: 15px;
    gap: 3px;
    span {
      color: #f00;
      padding-right: 5px;
    }
  }
`;

const Commenstmb = styled.div`
  display: none;
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
  width: 224px;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 5px;
  left: 10px;
  gap: 10px;
  color: #fff;
  @media screen and (max-width: 1050px) {
    font-size: 12px;
    top: 0;
    left: 0;
    .liveViewer {
      margin-left: 5px;
      font-size: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 20px;
    margin-top: 20px;
    object-fit: cover;
    /* border: 1px solid #f00; */
    .fbLogo, .liveLogo, .liveViewer {
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
  border-radius: 0 0 8px 8px;
  background-color: rgba(0,0,0,0.8);
  .point {
    width: 140px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background-color: var(--color-white);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: var( --color-facebookblue);
      color: var(--color-white);
    }
  }
  .pointDS {
    color: var(--color-white);
  }
  /* .pointTime {
    width: 30px;
    height: 30px;
    color: var(--color-white);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    border-radius: 50%;
  } */
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
  /* border: 1px solid #f00; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LiveProfile = styled.div`
  width: 100%;
  padding: 0 40px;
  /* border: 1px solid #f00; */
  display: flex;
  .profileImg {
    /* background-color: var(--color-light-gray-02); */
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
    /* padding: 15px 0; */
    font-size: var(--font-size-description-01);
  }
  @media screen and (max-width: 1050px) {
    padding: 0 50px;
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SellItems = styled.div`
width: 100%;
/* border: 1px solid #f00; */
padding: 0 40px;
@media screen and (max-width: 1050px) {
    padding: 0 50px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SellItem = styled.div`
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
  cursor: pointer;
  @media screen and (max-width: 1050px) {
    background-color: none;
  }
`;

const SellItemDesc = styled.div`
  p {
    padding-bottom: 8px;
    color: var(--color-gray-01);
    display: -webkit-box;
  height: 30px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  /* border: 1px solid #f00; */
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
  .test{
    height: 60px;
    border: 1px solid #f00;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 1050px) {
    /* border: 1px solid #f00; */
    padding: 0 50px;
    h3, span {
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
  /* border: 1px solid #f00; */
  .commentIcon {
    margin-bottom: 10px;
    .faComments {
      font-size: 40px;
      color: var( --color-facebookblue);
    }
  }
  @media screen and (max-width: 1050px) {
    font-size: 12px;
    .faComments {
      font-size: 30px;
    }
  }
`;

const ModalLive = () => {
  const comments = [
    { id: 1, name: "이승연", text: "제가 너무 갖고 싶었던 물건인데 이런 가격에!", img: "https://via.placeholder.com/40" },
    { id: 2, name: "김예지", text: "너무 예뻐요~~", img: "https://via.placeholder.com/40" },
    { id: 3, name: "홍길동", text: "진짜 사고 싶어요!", img: "https://via.placeholder.com/40" },
    { id: 4, name: "박지민", text: "이거 재고 있나요?", img: "https://via.placeholder.com/40" },
    { id: 5, name: "최민수", text: "배송 언제 되나요?", img: "https://via.placeholder.com/40" },
    { id: 6, name: "이수진", text: "사고 싶어서 기다리고 있어요!", img: "https://via.placeholder.com/40" },
    { id: 7, name: "김도현", text: "혹시 사이즈 변경 가능할까요?", img: "https://via.placeholder.com/40" },
    { id: 8, name: "이찬우", text: "이 제품 사진이 더 있나요?", img: "https://via.placeholder.com/40" },
    { id: 9, name: "홍길동", text: "특가 세일이 있나요?", img: "https://via.placeholder.com/40" },
  ];

  const [visibleComments, setVisibleComments] = useState([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleComments((prev) => {
        const newComments = [...prev, comments[index]];
        if (newComments.length > 2) {
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
          <FontAwesomeIcon className='faXmark' icon={faXmark} />
          <Live>
            <LiveStatus>
              <div className='fbLogo'>
                <img src={fbIcon}/>
              </div>
              <div className='liveLogo'>
                <img src={liveIcon} />
              </div>
              <div className='liveViewer'>2,023명 시청 중</div>
              <div className='liveVideo'>
                <video 
                src='/video/liveFood.mp4'
                autoPlay
                muted
                loop
                />
              </div>
            </LiveStatus>
            <LivePoint>
              <button className='point'>포인트 더 모으기</button>
              <div className='pointDS'>7초 후에 500 포인트가 적립됩니다.</div>
              <div className='countdown'><CountdownCircle /></div>
            </LivePoint>
          </Live>
          <SellItemsmb onClick={toggleDropdown}>
        <h2>판매중인 상품</h2>
        <FontAwesomeIcon icon={faChevronDown} />
      </SellItemsmb>
      <SellItemsinfomb isOpen={isOpen}>
        <SellItemImgmb>
          <img src={SellItem1Img} alt="SellItem1Img" />
        </SellItemImgmb>
        <SellItemDescmb>
          <p>★5%추가할인★스프라이트 백트임 긴팔니트</p>
          <b><span>30%</span>19,900원</b>
        </SellItemDescmb>
      </SellItemsinfomb>
      <Commenstmb>
      {visibleComments.map((comment) => (
        <CommentLiveInfomb key={comment.id}>
          <img src={comment.img} alt={`${comment.name}의 프로필`} />
          <div className='desc'>
            <h3>{comment.name}</h3>
            <p>{comment.text}</p>
          </div>
        </CommentLiveInfomb>
      ))}
    </Commenstmb>
        </LeftContent>
        <RightContent>
          <LiveProfile>
            <div className='profileImg'>
            <img src={LiveProfileImg} alt="LiveProfileImg" />
            </div>
            <LiveProfileSelf>
              <div className='profileName'>미니멀데이</div>
              <div className='profiledesc'>가을옷 보러오세요~~</div>
            </LiveProfileSelf>
          </LiveProfile>
          <LiveContents>
            <h3>라이브 안내</h3>
            <p>안녕하세요~~ <br/> 고퀄리티 옷들만 판매하고 있어요. 미니멀 데이에서 가을옷 득템하세요!</p>
          </LiveContents>
          <SellItems>
            <SellItem>
              <h3>판매중인 상품</h3>
              <SellInfos>
                <SellItemInfo>
                  <SellItemImg>
                    <div className='sellItemImg'></div>
                    <img src={SellItem1Img} alt="SellItem1Img" height="70px" width="70px" />
                    </SellItemImg>
                  <SellItemDesc>
                    <p>★5%추가할인★스프라이트 백트임 긴팔니트</p>
                    <b><span>30%</span>19,900원</b>
                  </SellItemDesc>
                </SellItemInfo>
                <SellItemInfo>
                  <SellItemImg>
                    <div className='sellItemImg'></div>
                    <img src={SellItem2Img} alt="SellItem2Img" height="70px" width="70px" />
                    </SellItemImg>
                  <SellItemDesc>
                    <p>메디슨 클래식 플랩 레더백</p>
                    <b>34,000원</b>
                  </SellItemDesc>
                </SellItemInfo>
              </SellInfos>
            </SellItem>
          </SellItems>
          <Comment>
            <h3>댓글</h3>
            {/* <span>영상과 무관하거나 욕설, 비방 등의 댓글은 관리자에 의해 삭제될 수 있습니다.</span> */}
            {/* <NoComment>
              <div className='commentIcon'>
              <FontAwesomeIcon className='faComments' icon={faComments} />
              </div>
              <p>댓글이 없습니다. <br/> 첫 번째 댓글을 남겨주세요.</p>
            </NoComment>
            <div className='test'></div> */}
            {/* <CommentWrite><PostUploadField/></CommentWrite> */}
          </Comment>
        </RightContent>
        {/* <LiveProfilemb>
            <div className='profileImgmb'>
            <img src={LiveProfileImg} alt="LiveProfileImgmb" />
            </div>
            <LiveProfileSelfmb>
              <div className='profileNamemb'><h4>미니멀데이</h4></div>
              <div className='profiledescmb'>가을옷 보러오세요~~</div>
            </LiveProfileSelfmb>
        </LiveProfilemb> */}
      </Commerce>
    </>
  )
}

export default ModalLive;