import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormTitle, FormDesc, Pager, Button } from "./login-components";
import categoryImg01 from "../../img/signup-category01.jpg";
import categoryImg02 from "../../img/signup-category02.jpg";
import categoryImg03 from "../../img/signup-category03.jpg";
import categoryImg04 from "../../img/signup-category04.jpg";
import categoryImg05 from "../../img/signup-category05.jpg";
import categoryImg06 from "../../img/signup-category06.jpg";
import categoryImg07 from "../../img/signup-category07.jpg";
import categoryImg08 from "../../img/signup-category08.jpg";
import categoryImg09 from "../../img/signup-category09.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";

const Wrapper = styled.div`
  height: 750px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--color-light-gray-02);
  box-shadow: var(--box-shadow-01);
  border-radius: var(--border-radius-08);
  @media screen and (max-width: 768px) {
    width: 390px;
    min-width: 390px;
    height: auto;
    justify-content: center;
    gap: 20px;
    padding: 0 15px;
    background: var(--color-white);
    box-shadow: none;
  }
`;
const CategoryUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 30px;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    .img-wrapper {
      width: 114px;
      height: 114px;
      border-radius: var(--border-radius-08);
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s;
      }
    }
    &:hover,
    &:active {
      .img-wrapper {
        img {
          transform: scale(1.05);
        }
      }
    }
    &.checked {
      .img-wrapper {
        img {
          transform: scale(1.05);
          filter: brightness(0.6);
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 0;
    gap: 9px;
  }
`;

const SignupCategory = ({ updateUserData, userData, mobileSize, progress }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryItems = [
    { id: 1, src: categoryImg01, title: "반려동물" },
    { id: 2, src: categoryImg02, title: "해외축구" },
    { id: 3, src: categoryImg03, title: "여행" },
    { id: 4, src: categoryImg04, title: "사진" },
    { id: 5, src: categoryImg05, title: "자연" },
    { id: 6, src: categoryImg06, title: "맛집" },
    { id: 7, src: categoryImg07, title: "요리" },
    { id: 8, src: categoryImg08, title: "예능" },
    { id: 9, src: categoryImg09, title: "영화" },
  ];
  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(category);
      if (isSelected) {
        return prev.filter((item) => item !== category);
      } else {
        if (prev.length < 3) {
          return [...prev, category];
        }
        return prev;
      }
    });
  };
  useEffect(() => {
    updateUserData("likeCategory", selectedCategories);
  }, [selectedCategories]);

  const handlePrevSignupStep = () => {
    searchParams.set("progress", "1");
    setSearchParams(searchParams);
  };
  return (
    <Wrapper style={{ display: progress === "2" ? "flex" : "none" }}>
      {mobileSize ? null : (
        <FormTitle>회원님을 위한 맞춤 홈피드를 준비할게요</FormTitle>
      )}
      <FormDesc>선택된 3개 분야로 그룹을 추천해 드릴게요</FormDesc>
      <CategoryUl>
        {categoryItems.map((item) => (
          <li
            key={item.id}
            className={selectedCategories.includes(item.title) ? "checked" : ""}
            onClick={() => handleCategorySelect(item.title)}
          >
            <div className="img-wrapper">
              <img src={item.src} alt={item.title} />
            </div>
            <p>{item.title}</p>
          </li>
        ))}
      </CategoryUl>
      <div>
        {mobileSize ? null : (
          <Pager>
            <span className="active"></span>
            <span></span>
          </Pager>
        )}
        {mobileSize ? null : (
          <Button onClick={() => setSearchParams({ progress: "1" })}>
            이전
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default SignupCategory;
