import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SiKakao } from "react-icons/si";
import { IoCopyOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import {
  MainTitle_18_b,
  MainTitle_22_b,
} from "../../styles/GlobalStyles.styles";

const Kakao = ({ shareKakao }) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    // 1. Kakao SDK 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    document.body.appendChild(script);

    // 2. SDK 로드 완료 후 초기화
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("e0ade8708d9d362fd3988c329366a281"); // 여기에 본인의 JavaScript 키를 입력하세요
        console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
      }
    };
    setUrl(window.location.href);
    // 3. 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    width: 300px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: -220px;
    right: -110px;
    & > svg {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 20px;
    }
    h3 {
      ${MainTitle_18_b}
    }
  `;

  const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
  `;

  const Button = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f1f1f1;
    }

    img {
      width: 50px;
      height: 50px;
    }

    span {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
    }
  `;

  // 4. 카카오톡 공유 함수
  const shareToKakao = () => {
    if (window.Kakao) {
      Kakao.Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "feed",
        content: {
          title: "오늘의 디저트",
          description: "아메리카노, 빵, 케익",
          imageUrl:
            "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: "웹으로 이동",
            link: { mobileWebUrl: url, webUrl: url },
          },
        ],
      });
    } else {
      console.error("Kakao SDK is not loaded yet.");
    }
  };
  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("URL이 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("URL 복사 실패:", err);
    }
  };
  return (
    <Wrapper>
      <IoCloseOutline onClick={shareKakao} />
      <h3>공유하기</h3>
      <ButtonContainer>
        <Button onClick={shareToKakao}>
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
            alt="카카오톡 공유"
          />
          <span>카카오톡</span>
        </Button>
        <Button onClick={copyUrlToClipboard}>
          <IoCopyOutline size={50} />
          <span>링크 복사</span>
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Kakao;
