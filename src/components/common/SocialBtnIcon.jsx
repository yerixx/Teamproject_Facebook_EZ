import React, { useState, useContext } from "react";
import { DataDispatchContext } from "../../App.jsx";
import CommentList from "../detail/CommentList";
import styled from "styled-components";

import {
  MainTitle_18_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles.js";

// react-icon
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";

const SocialIcon = styled.div`
  ${MainTitle_18_n}
  display:flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px 20px;
  border-bottom: 1px solid var(--color-light-gray-01);
  .socialIcon {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    @media (max-width: 768px) {
      width: 50%;
      justify-content: center;
      margin-right: 20px;
      font-size: 20px;
      &:last-child {
        margin-right: 0px;
      }
    }
    &:hover {
      color: var(--color-facebookblue) !important;
    }
    .socialIconText {
      ${SubDescription_16_n}
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
`;

const SocialBtnIcon = ({ postId, isLiked }) => {
  const { onToggleLike } = useContext(DataDispatchContext);
  const [toggle, setToggle] = useState(false);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  const handleCommentToggle = () => {
    setToggle((prev) => !prev);
  };
  const handleLikeToggle = async (e) => {
    e.preventDefault();
    try {
      await onToggleLike(postId, like);
      setLike((prev) => !prev);
    } catch (err) {
      console.error("Like error", err);
    }
  };
  const handlSaveToggle = () => {
    setSave((prev) => !prev);
  };

  const shareKakao = () => {
    confirm("게시물을 공유하시겠습니까?");
    if (confirm) {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "오늘의 디저트",
          description: "아메리카노, 빵, 케익",
          imageUrl:
            "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
        itemContent: {
          profileText: "Kakao",
          profileImageUrl:
            "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          titleImageUrl:
            "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          titleImageText: "Cheese cake",
          titleImageCategory: "Cake",
          items: [
            {
              item: "Cake1",
              itemOp: "1000원",
            },
            {
              item: "Cake2",
              itemOp: "2000원",
            },
            {
              item: "Cake3",
              itemOp: "3000원",
            },
            {
              item: "Cake4",
              itemOp: "4000원",
            },
            {
              item: "Cake5",
              itemOp: "5000원",
            },
          ],
          sum: "총 결제금액",
          sumOp: "15000원",
        },
        social: {
          likeCount: 10,
          commentCount: 20,
          sharedCount: 30,
        },
        buttons: [
          {
            title: "웹으로 이동",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
          {
            title: "앱으로 이동",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
        ],
      });
    }
  };

  return (
    <>
      <SocialIcon>
        <div
          onClick={handleLikeToggle}
          style={{
            color: !like ? "var(--color-black)" : "var(--color-facebookblue)",
          }}
          className="socialIcon"
        >
          <FaRegHeart />
          <div className="socialIconText">좋아요</div>
        </div>
        <div onClick={handleCommentToggle} className="socialIcon">
          <FaRegComment />
          <div className="socialIconText">댓글</div>
        </div>
        <div className="socialIcon">
          <FiShare />
          <div onClick={shareKakao} className="socialIconText">
            공유하기
          </div>
        </div>
        <div
          onClick={handlSaveToggle}
          style={{
            color: !save ? "var(--color-black)" : "var(--color-facebookblue)",
          }}
          className="socialIcon"
        >
          <FaRegBookmark />
          <div className="socialIconText">저장하기</div>
        </div>
      </SocialIcon>
      <div style={{ display: !toggle ? "none" : "block" }}>
        <CommentList />
      </div>
    </>
  );
};

export default SocialBtnIcon;
