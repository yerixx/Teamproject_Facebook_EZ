import styled from "styled-components";
import {
  MainTitle_18_n,
  MainTitle_22_b,
} from "../../styles/GlobalStyles.styles"; // 전역 스타일에서 제목 스타일 가져오기
import { IoClose } from "react-icons/io5"; // 닫기 아이콘
import Slider from "react-slick"; // 슬릭 슬라이더 라이브러리
import { MdOutlineNavigateNext } from "react-icons/md"; // 다음 화살표 아이콘
import { MdOutlineNavigateBefore } from "react-icons/md"; // 이전 화살표 아이콘

// 전체 컴포넌트를 감싸는 Wrapper 스타일 컴포넌트
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media screen and (max-width: 1050px) {
  }

  @media screen and (max-width: 768px) {
    margin-top: 0; /* 768px 이하일 때 상단 여백 제거 */
  }
`;

// 내부 컨텐츠를 담는 Inner 스타일 컴포넌트
const Inner = styled.div`
  width: 1000px;
  height: 440px;
  padding: 27px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-30);
  position: relative;

  @media screen and (max-width: 1050px) {
    width: 100%; /* 1050px 이하일 때 너비 100% */
  }

  @media screen and (max-width: 768px) {
    border-radius: var(--border-radius-08);
    padding: 20px 15px;
    width: 90vw; /* 화면 너비의 90% */
    min-width: 360px; /* 최소 너비 설정 */
    height: 100%;
  }
`;

// 제목 섹션을 담당하는 Title 스타일 컴포넌트
const Title = styled.div`
  h2 {
    ${MainTitle_22_b}
    margin-bottom: 5px;
  }
  span {
    ${MainTitle_18_n};
    color: var(--color-gray-01);
  }
`;

// 슬라이더 내의 아이템들을 감싸는 Items 스타일 컴포넌트
const Items = styled.div`
  .slider {
    width: 100%;
    height: 100%;
  }
  .slick-slide {
    margin: 0 10px; /* 슬라이드 간의 간격 */
  }
  .slick-list {
    margin: 0 -10px; /* 슬라이더 전체의 간격 조정 */
  }
  .slick-track {
    display: flex;
    justify-content: flex-start;
    transition: transform 0.5s ease-in-out; /* 슬라이드 전환 애니메이션 */
  }
`;

// 개별 그룹 아이템을 위한 Item 스타일 컴포넌트
const Item = styled.div`
  width: 100%;
  height: 320px;
  background: #999;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  position: relative;

  /* 닫기 아이콘 스타일 */
  svg {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 40px;
    font-weight: bold;
    color: #fff;
    background-color: var(--color-light-gray-01);
    border-radius: 50%;
  }

  /* 그룹 정보 섹션 스타일 */
  div {
    background: var(--color-light-gray-02);
    padding: 10px 20px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    bottom: 0;

    h3 {
      ${MainTitle_18_n};
    }

    h4 {
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 10px;
    }

    span {
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 10px;
      padding: 10px;
      background-color: var(--color-light-gray-01);
      text-align: center;
      border-radius: 8px;
    }
  }

  @media screen and (max-width: 1050px) {
  }

  @media screen and (max-width: 768px) {
    height: 250px;

    div {
      height: 110px;
      h3 {
        font-size: 16px;
      }
      h4 {
        font-size: 12px;
      }
      span {
        padding: 7px 5px;
      }
    }
  }
`;

// 슬릭 슬라이더의 커스텀 다음 화살표 버튼 스타일 컴포넌트
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
  right: 10px;
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  cursor: pointer;

  svg {
    margin-left: 5px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// 슬릭 슬라이더의 커스텀 다음 화살표 컴포넌트
const NextArrow = ({ onClick }) => {
  return (
    <NextBtn onClick={onClick}>
      <MdOutlineNavigateNext />
    </NextBtn>
  );
};

// 슬릭 슬라이더의 커스텀 이전 화살표 버튼 스타일 컴포넌트
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
  left: 10px;
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  font-size: 40px;
  color: #fff;
  cursor: pointer; /* 마우스 포인터 변경 */

  svg {
    margin-left: 3px; /* 아이콘과 텍스트 간의 간격 */
  }

  @media screen and (max-width: 768px) {
    display: none; /* 768px 이하일 때 버튼 숨김 */
  }
`;

// 슬릭 슬라이더의 커스텀 이전 화살표 컴포넌트
const PrevArrow = ({ onClick }) => {
  return (
    <PrevBtn onClick={onClick}>
      <MdOutlineNavigateBefore /> {/* 이전 화살표 아이콘 */}
    </PrevBtn>
  );
};

// 메인 그룹 추천 컴포넌트
const MainGroup = () => {
  // 슬릭 슬라이더 설정
  const settings = {
    dots: false, // 하단 점 표시 여부
    infinite: true, // 무한 반복 여부
    speed: 500, // 전환 속도
    slidesToShow: 3, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 스크롤 시 이동 슬라이드 수
    autoplay: true, // 자동 재생 여부
    swipe: true, // 스와이프 가능 여부
    autoplaySpeed: 8000, // 자동 재생 간격
    nextArrow: <NextArrow />, // 커스텀 다음 화살표 컴포넌트
    prevArrow: <PrevArrow />, // 커스텀 이전 화살표 컴포넌트
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Inner>
        <Title>
          <h2>회원님을 위한 추천 그룹</h2>
          <span>회원님이 관심을 가질만한 그룹입니다.</span>
        </Title>
        <Items>
          <Slider className="slider" {...settings}>
            <Item>
              <IoClose />
              <div>
                <h3>함께하는 세계여행</h3>
                <h4>멤버 4.4천명</h4>
                <span>그룹 가입</span>
              </div>
            </Item>
            <Item>
              <IoClose />
              <div>
                <h3>반려동물</h3>
                <h4>멤버 2.4천명</h4>
                <span>그룹 가입</span>
              </div>
            </Item>
            <Item>
              <IoClose />
              <div>
                <h3>운동</h3>
                <h4>멤버 3.2천명</h4>
                <span>그룹 가입</span>
              </div>
            </Item>
            <Item>
              <IoClose />
              <div>
                <h3>1</h3>
                <h4>멤버 3.2천명</h4>
                <span>그룹 가입</span>
              </div>
            </Item>
            <Item>
              <IoClose />
              <div>
                <h3>2</h3>
                <h4>멤버 3.2천명</h4>
                <span>그룹 가입</span>
              </div>
            </Item>
            <Item>
              <IoClose />
              <div>
                <h3>운동</h3>
                <h4>멤버 3.2천명</h4>
                <span>그룹 가입</span>
              </div>
            </Item>
          </Slider>
        </Items>
      </Inner>
    </Wrapper>
  );
};

export default MainGroup;
