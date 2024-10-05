import React, { useRef, useState } from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import testCat from "/img/testcat.jpg";

const Wrapper = styled.section`
  width: 100%;
  height: 575px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 140px;

  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    /* border:1px solid #f00; */
    max-width: 100%;
    height: 400px;
    margin-bottom: 0;
  }
`;
const Inner = styled.article`
  width: 1050px;
  height: 100%;
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const CoverImg = styled.img`
  position: relative;
  background: var(--color-gray-01);
  width: 100%;
  /* height 변경 금지 */
  height: 550px;
  object-fit: cover;
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;
const EditIcon = styled.div`
  position: relative;
  .editIcon {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: 130px;
    right: 20px;
    padding: 8px;
    background: var(--color-white);
    border-radius: 50%;
    box-shadow: var(--box-shadow-01);
    color: var(--color-black);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      opacity: 0.6;
    }
    @media (max-width: 768px) {
      bottom: 50px;
    }
  }
`;
const TopCover = () => {
  const [coverImg, setCoverImg] = useState(testCat);
  const fileRef = useRef(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setCoverImg(fileURL);
    }
  };

  const handleIconClick = () => {
    fileRef.current.click();
  };

  return (
    <Wrapper>
      <Inner>
        <CoverImg src={coverImg} alt="Test Cat" />
        <input
          ref={fileRef}
          onChange={handleImgChange}
          id="fileInput"
          type="file"
          style={{ display: "none" }}
        ></input>
        <EditIcon>
          <FontAwesomeIcon
            onClick={handleIconClick}
            className="editIcon"
            icon={faCamera}
          />
        </EditIcon>
        <ProfileCard />
      </Inner>
    </Wrapper>
  );
};

export default TopCover;
