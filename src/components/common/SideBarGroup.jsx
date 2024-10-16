import { Paragraph_20_n } from "../../styles/GlobalStyles.styles";
import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5"; // 아이콘 import
import { motion } from "framer-motion"; // 애니메이션 라이브러리 import
import { DataStateContext } from "../../App"; // App에서 데이터 Context import
import { getDocs, collection } from "firebase/firestore"; // Firebase Firestore 함수 import
import { db } from "../../firebase";

const Wrapper = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  z-index: 3;
  position: absolute;
  top: 100px;
  right: 20px;
  width: 382px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 28px 20px;
  border-radius: var(--border-radius-30);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none;
  background-color: ${(props) => props.theme.ContainColor};
  @media screen and (max-width: 1050px) {
    right: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 330px;
    top: 70px;
  }
`;

const TopTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  h2 {
    ${Paragraph_20_n}
  }
  margin-bottom: 10px;
  span {
    cursor: pointer;
  }
`;
const Title = styled.div`
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: space-between;
`;

const Group = styled.div`
  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); */
  color: ${(props) => props.theme.textColor};
  border-radius: var(--border-radius-30);
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: var(--font-size-title-04);
  }
`;
const GroupContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  img {
    background-color: #ddd;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  & > span {
    padding: 5px 10px;
    background-color: #e3e6ea;
    border-radius: var(--border-radius-08);
    color: var(--color-facebookblue);
  }
  @media screen and (max-width: 768px) {
  }
`;
const GroupTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  gap: 3px;
  width: 60%;
  h2 {
    font-size: var(--font-size-subtitle);
    font-weight: normal;
  }
  div {
    display: flex;
    justify-content: flex-start;
    gap: 4px;
    font-size: 14px;
    color: var(--color-gray-01);
  }
  @media screen and (max-width: 768px) {
    width: 40%;
    div {
      flex-direction: column;
      span {
        font-size: 12px;
      }
      span:nth-child(2) {
        display: none;
      }
    }
  }
`;
/* eslint-disable react/prop-types */
const SideBarGroup = ({ openGroup, closeModal }) => {
  const { currentUserData, category, mockData } = useContext(DataStateContext);
  const categoryData = category[0] || {};
  const categories = Object.keys(categoryData)
    .filter((key) => !isNaN(Number(key))) // 키가 숫자인 프로퍼티만 선택합니다.
    .map((key) => categoryData[key]);

  const [recommendedGroups, setRecommendedGroups] = useState([]);

  const closeRef = useRef(null);

  const handleClickOutside = (event) => {
    if (closeRef.current && !closeRef.current.contains(event.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    // 모달이 마운트되면 클릭 이벤트 추가
    document.addEventListener("click", handleClickOutside);

    return () => {
      // 모달이 언마운트되면 클릭 이벤트 제거
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchRecommendedGroupsAndPages();
  }, [currentUserData]);

  const fetchRecommendedGroupsAndPages = async () => {
    try {
      const groupsSnapshot = await getDocs(collection(db, "category"));
      const allGroups = groupsSnapshot.docs.map((doc) => doc.data());

      const groups = selectItems(allGroups, "group");

      setRecommendedGroups(groups);
    } catch (error) {
      console.error("추천 그룹을 불러오지 못했습니다:", error);
    }
  };

  const selectItems = (allItems, type) => {
    const filteredItems = allItems.filter((item) => item.type === type);

    const userSelectedItems =
      currentUserData?.likeCategory?.length > 0
        ? filteredItems.filter((item) =>
            currentUserData.likeCategory.includes(item.title)
          )
        : [];

    const itemsToShow =
      userSelectedItems.length > 0 ? userSelectedItems : filteredItems;

    const shuffledItems = itemsToShow.sort(() => Math.random() - 0.5);

    return shuffledItems.slice(0, 3);
  };
  const possibleTexts = [
    "크리에이터",
    "블로거",
    "작가",
    "예술가",
    "카페",
    "동호회",
  ];

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      ref={closeRef}
      onClick={(e) => e.stopPropagation()}
    >
      <TopTitle>
        <h2>회원님을 위한 커뮤니티</h2>
        <span>
          <IoClose onClick={openGroup} />
        </span>
      </TopTitle>
      <Title>
        <h3>추천그룹</h3>
      </Title>
      <Group>
        {recommendedGroups.length > 0
          ? recommendedGroups.map((group, index) => {
              const randomText =
                possibleTexts[Math.floor(Math.random() * possibleTexts.length)];
              return (
                <GroupContents key={index}>
                  <img src={currentUserData.img} alt={group.title} />
                  <GroupTitle>
                    <h2>{group.title}</h2>
                    <div>
                      <span>{randomText}</span>
                      <span>・</span>
                      <span>멤버 {group.member}명</span>``
                    </div>
                  </GroupTitle>
                  <span>팔로우</span>
                </GroupContents>
              );
            })
          : mockData.category.slice(6, 9).map((cat, i) => {
              const randomText =
                possibleTexts[Math.floor(Math.random() * possibleTexts.length)];
              return (
                <GroupContents key={i}>
                  <img src={cat.image} alt={cat.name} />
                  <GroupTitle>
                    <h2>{cat.name}</h2>
                    <div>
                      <span>{randomText}</span>
                      <span>・</span>
                      <span>팔로워 {cat.members}명</span>
                    </div>
                  </GroupTitle>
                  <span>팔로우</span>
                </GroupContents>
              );
            })}
      </Group>
      <Title>
        <h3>추천페이지</h3>
      </Title>
      <Group>
        {mockData.category.slice(3, 6).map((cat, i) => {
          const randomText =
            possibleTexts[Math.floor(Math.random() * possibleTexts.length)];
          return (
            <GroupContents key={i}>
              <img src={cat.image} alt={cat.name} />
              <GroupTitle>
                <h2>{cat.name}</h2>
                <div>
                  <span>{randomText}</span>
                  <span>・</span>
                  <span>팔로워 {cat.members}명</span>
                </div>
              </GroupTitle>
              <span>팔로우</span>
            </GroupContents>
          );
        })}
      </Group>
    </Wrapper>
  );
};

export default React.memo(SideBarGroup);
