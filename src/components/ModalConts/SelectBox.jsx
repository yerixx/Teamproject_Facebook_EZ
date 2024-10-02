import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 180px;
  height: 38px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1px;
  /* border: 2px solid #f0f; */
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    width: 2px;
    height: 120%;
    position: absolute;
    top: 0;
    right: 35px;
  }
  .label {
    display: flex;
    align-items: center;
    width: inherit;
    border: 0 none;
    outline: 0 none;
    padding: 5px 27px;
    background: transparent;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
  .optionList {
    /* opacity: 0.3; */
    position: absolute;
    top: -13px;
    width: 100%;
    background: #fff;
    box-shadow: 4px 6px 14px rgba(182, 182, 182, 0.8);
    color: var(--color-gray-01);
    list-style-type: none;
    padding: 12px 16px;
    border-radius: 8px;
    overflow: hidden;
    transition: 0.3s ease-in;
    .optionItem {
      /* background: #ddd; */
      padding: 6px 11px 6px;
      transition: 0.1s;
      margin-bottom: 8px;
      border-radius: 8px;
      &:hover {
        background: var(--color-facebookblue);
        color: #fff;
        box-shadow: 3px 4px 8px rgba(170, 170, 170, 0.7);
      }
      &:last-child {
        border-bottom: 0 none;
      }
    }
  }
  .active .optionList {
    max-height: 100px;
  }
`;

const SelectBox = () => {
  return (
    <Wrapper>
      <button className="label">최신순</button>
      <ul className="optionList">
        <li className="optionItem">최신순</li>
        <li className="optionItem">좋아요 많은 순</li>
        <li className="optionItem">관련성 높은 순</li>
      </ul>
    </Wrapper>
  );
};

export default SelectBox;
