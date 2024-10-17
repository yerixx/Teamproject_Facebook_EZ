import React, { useState, useContext, useEffect } from "react"; // useContext 추가
import { DataStateContext } from "../../App.jsx";
import styled from "styled-components";
import { FaUser, FaPlus } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SubDescription_16_n } from "../../styles/GlobalStyles.styles";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { storage, db } from "../../firebase";
import Mainstorymodal from "../Main/Mainstorymodal";
import defaultProfile from "/img/defaultProfile.jpg";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  @media screen and (max-width: 1050px) {
    /* width: 90vw; */
  }
  @media screen and (max-width: 768px) {
    margin: 100px 0 0;
    width: 90vw;
  }
`;

const Inner = styled.div`
  width: var(--inner-width-02);
  height: 360px;
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
    box-shadow: none;
    padding: 0;
    width: 90vw;
    height: 100%;
    min-width: 360px;
    margin: 0 auto;
  }
`;

const Items = styled.div`
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

const StoryItem = styled.div`
  border: 2px solid ${(props) => props.theme.cardColor};
  width: 100%;
  height: 320px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
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
  }
`;

const StoryFriend = styled.div`
  width: 100%;
  height: 320px;
  background: #ddd;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .storyvideo {
    video {
      width: 100%; /* 비디오 너비를 부모 요소에 맞추기 */
      height: 100%; /* 비디오 높이를 부모 요소에 맞추기 */
      object-fit: cover;
      object-position: center; /* 비디오가 비율을 유지하며 화면에 맞게 표시 */
    }
  }
  .storyInfo {
    width: 100%;
    .story {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 8px;
      left: 8px;
      border-radius: 50%;
      border: 3px solid var(--color-facebookblue);
      display: flex;
      justify-content: center;
      align-items: center;
      .storyProfile {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #aaa;
        border-radius: 50%;
        .profileImg {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }

    .storyName {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding-left: 20px;
      line-height: 36px;
      font-size: 14px;
      border-radius: 0 0 8px 8px;
    }
  }
  @media screen and (max-width: 768px) {
    height: 200px;
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

const PrevArrow = ({ onClick, currentSlide }) => {
  if (currentSlide === 0) return null;
  return (
    <PrevBtn onClick={onClick}>
      <MdOutlineNavigateBefore />
    </PrevBtn>
  );
};

const StoryProfileImg = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .storyTextBox {
    position: absolute;
    width: 100%;
    height: 80px;
    bottom: 0;
    background: ${(props) => props.theme.storyBox};
    span:first-child {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      border: 5px solid ${(props) => props.theme.storyBorder};
      background-color: var(--color-facebookblue);
      border-radius: 50%;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      svg {
        font-size: 30px;
        color: #fff;
      }
      cursor: pointer;
    }
    span:last-child {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 55px;
      border-radius: 50%;
      left: 50%;
      bottom: 26px;
      transform: translateX(-50%);
      font-size: 14px;
      color: ${(props) => props.theme.iconColorB};
    }
  }
  @media screen and (max-width: 768px) {
    .storyTextBox {
      height: 40px;
      span:first-child {
        width: 34px;
        height: 34px;
        svg {
          font-size: 16px;
        }
      }
      span:last-child {
        border: none;
        bottom: 40px;
      }
    }
  }
`;

const MainStory = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [storys, setStorys] = useState([]);
  const [postImage, setPostImage] = useState(null); // 모달에서 업로드된 이미지 상태
  const { currentUserData } = useContext(DataStateContext);
  const mockStorys = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ];
  useEffect(() => {
    const fetchStorys = async () => {
      try {
        const storysQuery = query(
          collection(db, "story"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(storysQuery);
        const storyData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStorys(storyData);
      } catch (e) {
        console.error("Story 데이터 전송오류", e);
      }
    };
    fetchStorys();
  }, []);
  const displayedStorys = storys.length > 0 ? storys : mockStorys;
  // 모달 열기 핸들러
  const openModal = () => {
    setIsModalOpen(true); // 모달을 열기 위해 상태를 true로 설정
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false); // 모달을 닫기 위해 상태를 false로 설정
  };

  // 모달 제출 핸들러
  const handleModalSubmit = ({ text, image, video }) => {
    // 제출된 데이터 처리
    if (image) setPostImage(image); // 제출된 이미지를 상태에 저장
    // 비디오도 저장하려면 별도의 상태 관리 필요
    // 예: setPostVideo(video);
    setIsModalOpen(false); // 모달을 닫음
  };

  // 슬릭 슬라이더 설정
  const settings = {
    dots: false,
    infinite: false,
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 5, // 보여줄 슬라이드 개수
    slidesToScroll: 1, // 스크롤할 슬라이드 개수
    swipe: true, // 스와이프 가능 여부
    swipeToSlide: true, // 스와이프 시 한 개 슬라이드 이동 여부
    touchMove: true, // 터치 이동 가능 여부
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow currentSlide={currentSlide} />,
    beforeChange: (current, next) => setCurrentSlide(next), // 슬라이드 변경 전 현재 슬라이드 업데이트
    responsive: [
      {
        breakpoint: 900, // 900px 이하일 때 설정
        settings: {
          slidesToShow: 4, // 슬라이드를 4개만 보여줌
          slidesToScroll: 1, // 스크롤할 슬라이드 개수
        },
      },
      {
        breakpoint: 580, // 580px 이하일 때 설정
        settings: {
          slidesToShow: 3, // 슬라이드를 3개만 보여줌
          slidesToScroll: 1, // 스크롤할 슬라이드 개수
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Inner>
        <Items>
          <Slider className="slider" {...settings}>
            <StoryItem>
              <StoryProfileImg>
                <div className="storyTextBox" onClick={openModal}>
                  <span>
                    <FaPlus />
                  </span>
                  <span>스토리 만들기</span>
                </div>
                <img
                  src={
                    (currentUserData && currentUserData.profileImage) ||
                    defaultProfile
                  }
                  alt="Profile"
                />
              </StoryProfileImg>
            </StoryItem>
            {displayedStorys.map((story) => (
              <StoryFriend key={story.id}>
                {story.imageUrl && (
                  <img src={story.imageUrl} alt="스토리 이미지" />
                )}
                {story.videoUrl && (
                  <div className="storyvideo">
                    <video autoPlay muted loop>
                      <source src={story.videoUrl} type="video/mp4" />
                      지원되지 않는 비디오 형식입니다.
                    </video>
                  </div>
                )}
                <div className="storyInfo">
                  <div className="story">
                    <div className="storyProfile">
                      <img
                        className="profileImg"
                        src={story.profileImg || defaultProfile}
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <div className="storyName">
                    {story.name ? (
                      <>
                        {story?.name?.firstName}
                        {story?.name?.lastName}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </StoryFriend>
            ))}
          </Slider>
        </Items>
      </Inner>
      {isModalOpen && (
        <Mainstorymodal
          onClose={closeModal} // 모달 닫기 핸들러
          onSubmit={handleModalSubmit} // 모달 제출 핸들러
        />
      )}
    </Wrapper>
  );
};

export default React.memo(MainStory);
