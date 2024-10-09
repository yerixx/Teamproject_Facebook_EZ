import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 160px;
  height: 30px;
  align-items: center;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  .label {
    display: flex;
    justify-content: end;
    width: inherit;
    border: 0 none;
    outline: 0 none;
    padding: 5px 25px;
    background: transparent;
    font-size: 16px;
    cursor: pointer;
  }
  .optionList {
    position: absolute;
    top: 50px;
    width: 100%;
    background: #fff;
    box-shadow: 4px 6px 14px rgba(182, 182, 182, 0.8);
    color: var(--color-gray-01);
    list-style-type: none;
    padding: 12px 16px;
    border-radius: 8px;
    max-height: 0;
    opacity: 0.2;
    visibility: hidden;
    overflow: hidden;
    transition:
      max-height 0.3s ease,
      opacity 0.1s ease,
      visibility 0.1s;
  }

  &.active .optionList {
    max-height: 200px;
    opacity: 1;
    visibility: visible;
  }

  .optionItem {
    padding: 6px 11px;
    transition: 0.1s;
    margin-bottom: 8px;
    border-radius: 8px;
    transition: all 0.1s;
    &:last-child {
      border-bottom: 0 none;
    }
  }
`;

const EditeBox = ({ Title, desc }) => {
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭다운 요소 참조

  // 외부 클릭 감지 후 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 드롭다운 열림/닫힘 상태 토글
  };

  const profileEdite = () => {
    confirm("게시물을 수정 하시겠습니까?");
    if (confirm) {
      setEditing((prev) => !prev);
    }
    setIsOpen(false);
  };
  return (
    <Wrapper className={isOpen ? "active" : ""} ref={dropdownRef}>
      <button className="label" onClick={toggleDropdown}>
        {Title || "최신순"}
      </button>
      <ul className="optionList">
        <li className="optionItem" onClick={profileEdite}>
          {desc || "게시물 수정하기"}
        </li>
      </ul>
    </Wrapper>
  );
};

export default EditeBox;
