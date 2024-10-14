import React, { useRef, useState } from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import testCat from "/img/testcat.jpg";

const Wrapper = styled.section`
  width: 100%;
  /* => CoverImg height와 같이 수정해야함 */
  height: 475px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 140px;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 400px;
    margin-bottom: 0;
  }
`;
const Inner = styled.article`
  width: var(--inner-width-02);
  height: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const CoverImg = styled.img`
  position: relative;
  background: var(--color-gray-01);
  width: 100%;
  /*Wrapper height와 같이 수정해야함  */
  height: 475px;
  object-fit: cover;

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
