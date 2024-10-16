/* eslint-disable react/prop-types */
import styled from "styled-components";
import {
  MainTitle_18_n,
  MainTitle_22_b,
} from "../../styles/GlobalStyles.styles";
import Slider from "react-slick";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { DataStateContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media screen and (max-width: 1050px) {
  }
  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
`;

const Inner = styled.div`
  width: var(--inner-width-02);
  height: 440px;
  padding: 27px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-30);
  position: relative;
  background-color: ${(props) => props.theme.ContainColor};
  @media screen and (max-width: 1050px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    border-radius: var(--border-radius-08);
    padding: 20px 15px;
    width: 90vw;
    /* height: 100%; */
    min-width: 360px;
    height: 100%;
    /* margin: 0 auto; */
  }
`;

const Title = styled.div`
  h2 {
    ${MainTitle_22_b}
    margin-bottom: 5px;
    color: ${(props) => props.theme.textColor};
  }
  span {
    ${MainTitle_18_n}
    color: ${(props) => props.theme.subTextColor};
  }
`;

const Items = styled.div`
  .slider {
    width: 100%;
    height: 100%;
  }
  .slick-slide {
    margin: 0 10px;
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

const Item = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  position: relative;
  .ctegoryImg {
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .info {
    background: ${(props) => props.theme.cardColor};
    padding: 10px 20px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    bottom: 0;
    color: ${(props) => props.theme.dfaultColor};
    h3 {
      ${MainTitle_18_n}
    }

    h4 {
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 10px;
    }

    span {
      color: #222;
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
  &:hover {
    opacity: 1;
    scale: 1;
  }
  @media screen and (max-width: 768px) {
    display: none;
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
  &:hover {
    opacity: 1;
    scale: 1;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const PrevArrow = ({ onClick }) => {
  return (
    <PrevBtn onClick={onClick}>
      <MdOutlineNavigateBefore />
    </PrevBtn>
  );
};

const MainGroup = () => {
  const { currentUserData } = useContext(DataStateContext);
  const [recommendedGroups, setRecommendedGroups] = useState([]);

  useEffect(() => {
    if (currentUserData) {
      fetchGroups();
    }
  }, [currentUserData]);

  const fetchGroups = async () => {
    try {
      const groupsSnapshot = await getDocs(collection(db, "category"));
      const groups = groupsSnapshot.docs.flatMap((doc) =>
        Object.values(doc.data())
      );

      if (
        currentUserData.likeCategory &&
        currentUserData.likeCategory.length > 0
      ) {
        // 사용자의 likeCategory 배열과 그룹 제목을 매칭해 필터링
        const filteredGroups = groups.filter((group) =>
          currentUserData.likeCategory.some(
            (category) => category === group.title
          )
        );

        // 추천 그룹이 없으면 모든 그룹 보여주기
        setRecommendedGroups(
          filteredGroups.length > 0 ? filteredGroups : groups
        );
      } else {
        // likeCategory가 없으면 전체 그룹을 보여줌
        setRecommendedGroups(groups);
      }
    } catch (error) {
      console.error("그룹 데이터를 불러오지 못했습니다.", error);
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    autoplaySpeed: 8000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
            {recommendedGroups.map((group, i) => (
              <Item key={i}>
                <div className="ctegoryImg">
                  <img src={group.img} alt="" />
                </div>
                <div className="info">
                  <h3>{group.title}</h3>
                  <h4>멤버 {group.member}명</h4>
                  <span>그룹 가입</span>
                </div>
              </Item>
            ))}
          </Slider>
        </Items>
      </Inner>
    </Wrapper>
  );
};

export default MainGroup;
