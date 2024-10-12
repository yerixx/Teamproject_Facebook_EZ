import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { DataDispatchContext } from "../../App";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 150px;
  align-items: center;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 150px;
    font-size: 14px;
  }

  .label {
    display: flex;
    justify-content: end;
    width: inherit;
    padding: 5px 25px;
    border: none;
    background: transparent;
    font-size: 16px;
    cursor: pointer;
  }

  .optionList {
    position: absolute;
    top: 40px;
    right: 20px;
    width: 100%;
    max-height: 0;
    padding: 12px;
    font-size: 14px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 4px 6px 14px rgba(182, 182, 182, 0.8);
    list-style-type: none;
    opacity: 0.2;
    visibility: hidden;
    overflow: hidden;
    transition:
      max-height 0.3s ease,
      opacity 0.1s ease,
      visibility 0.1s;

    @media (max-width: 768px) {
      top: 30px;
      right: 18px;
    }
  }

  &.active .optionList {
    max-height: 200px;
    opacity: 1;
    visibility: visible;
  }

  .optionItem {
    margin-bottom: 8px;
    border-radius: 8px;
    transition: all 0.1s;
  }
`;

const EditeBox = ({ Title, postId, handleEditBtn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { onUpdatePost } = useContext(DataDispatchContext); // Context에서 함수 가져오기

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen); // 드롭다운 토글

  const onEditClick = () => {
    if (postId) {
      console.log(`Editing postId: ${postId}`); // 디버깅 로그
      handleEditBtn(postId); // 수정 버튼 클릭 시 처리
      onUpdatePost(postId, { content: "수정된 내용" }); // 게시물 업데이트
    } else {
      console.error("postId가 정의되지 않았습니다.");
    }
  };

  return (
    <Wrapper className={isOpen ? "active" : ""} ref={dropdownRef}>
      <button className="label" onClick={toggleDropdown}>
        {Title || "옵션"}
      </button>
      <ul className="optionList">
        <li className="optionItem" onClick={onEditClick}>
          수정하기
        </li>
      </ul>
    </Wrapper>
  );
};

export default EditeBox;
