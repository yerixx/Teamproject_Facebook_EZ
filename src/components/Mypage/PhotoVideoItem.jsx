import React, { useContext } from "react";
import styled from "styled-components";
import { DataStateContext } from "../../App.jsx";

//font
import {
  SubTitle_16_b,
  SubDescription_14_n,
  SubDescription_12_m,
} from "../../styles/GlobalStyles.styles.js";

const Inner = styled.article`
  display: flex;
  width: 230px;
  height: 310px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.albumBorder};
  border-radius: var(--border-radius-08);
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 160px;
    height: 200px;
  }
`;
const Contents = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.albumBorder};
  border-radius: var(--border-radius-08);
  box-shadow: var(--box-shadow-01);
  @media (max-width: 768px) {
    width: 160px;
    height: 200px;
  }
`;
const ContImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  @media (max-width: 768px) {
    width: 160px;
    height: 140px;
  }
`;
const ContText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 26px 30px 30px;
  @media (max-width: 768px) {
    gap: 4px;
  }
  .contTitle {
    ${SubTitle_16_b}
    width: 100%;
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.iconColorB};
    @media (max-width: 768px) {
      ${SubDescription_12_m}
      width:160px;
      padding-top: 10px;
      padding-left: 10px;
    }
  }
  .createdAt {
    ${SubDescription_14_n}
    color:var(--color-gray-02);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
      ${SubDescription_12_m}
      padding-left: 10px;
    }
  }
  @media (max-width: 768px) {
    width: 80%;
    padding: 0;
  }
`;

const PhotoVideoItem = ({
  userId,
  imageSrc,
  contentDesc,
  createdAt,
  ModalOpen,
  ModalClose,
}) => {
  const isLiked = false; // 초기 좋아요 여부
  const { currentUserData } = useContext(DataStateContext);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };
  const isAuthor = currentUserData?.uid === userId;
  return (
    <Inner>
      <Contents>
        <div>
          {imageSrc && (
            <ContImg
              onClick={() => ModalOpen()}
              src={imageSrc}
              alt="contentImage"
              style={{ display: imageSrc ? "block" : "none" }}
            />
          )}
        </div>
        <ContText>
          <div className="contTitle">{contentDesc}</div>
          <div className="createdAt">{formatDate(createdAt)} </div>
        </ContText>
      </Contents>
    </Inner>
  );
};

export default PhotoVideoItem;
