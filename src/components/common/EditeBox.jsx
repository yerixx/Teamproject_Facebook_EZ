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
    padding: 6px 11px;
    margin-bottom: 8px;
    border-radius: 8px;
    transition: all 0.1s;
  }
`;

const EditeBox = ({ Title, desc }) => {
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 감지 후 드롭다운 닫기
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
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEditPost = () => {
    if (confirm("게시물을 수정 하시겠습니까?")) {
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
        <li className="optionItem" onClick={handleEditPost}>
          {desc || "게시물 수정하기"}
        </li>
      </ul>
    </Wrapper>
  );
};

export default EditeBox;
