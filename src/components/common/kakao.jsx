import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoCopyOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { MainTitle_18_b } from "../../styles/GlobalStyles.styles";

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
  top: 50px;
  right: -100px;

  z-index: 30;
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

const Kakao = ({ shareKakao }) => {
  const [url, setUrl] = useState("");
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const closeModal = (e) => {
    e.stopPropagation(); // 모달 외부로 전파되지 않음
    shareKakao(e);
  };

  useEffect(() => {
    setUrl(window.location.href); // 현재 페이지의 URL 설정
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("e0ade8708d9d362fd3988c329366a281"); // 실제 앱 키로 대체하세요
      }
      setIsKakaoReady(true); // SDK 로드 완료 후 활성화
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 4. 카카오톡 공유 함수
  const shareToKakao = () => {
    if (window.Kakao && window.Kakao.Link) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "Facebook",
          description:
            "Facebook을 통해 친구, 가족, 아는 사람들과 서로의 소식을 확인해 보세요.",
          imageUrl: "/img/opengraph.jpg",
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
      console.error("Kakao SDK가 아직 준비되지 않았거나 오류가 있습니다.");
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
        <Button onClick={isKakaoReady ? shareToKakao : null}>
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
