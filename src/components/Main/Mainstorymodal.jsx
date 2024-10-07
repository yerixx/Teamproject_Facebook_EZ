import React, { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi"; // 닫기 아이콘
import { CiCamera } from "react-icons/ci"; // 카메라 아이콘

// 전체 모달을 감싸는 스타일 컴포넌트
const Wrapper = styled.div`
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 내부 컨텐츠의 스타일 컴포넌트
const Inner = styled.div`
  width: 900px;
  border-radius: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 20px;

  /* 모달의 타이틀 섹션 */
  .maodaltile {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    border-bottom: 1px solid var(--color-light-gray-01);
    height: 60px;
    position: relative;
    margin-bottom: 15px;
    /* 스토리 올리기 제목 */
    .title {
      font-weight: bold;
    }
    /* 닫는 버튼 */
    .xmark {
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      position: absolute;
      top: 17px;
      right: 20px;
      cursor: pointer;
    }
  }

  /* 사용자 정보 및 카메라 아이콘 섹션 */
  .infoitem {
    display: flex;
    justify-content: space-between;
    margin: 0 60px;
    align-items: center;

    .info {
      font-size: 16px;
      font-weight: bold;
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 15px;

      .profile {
        background: var(--color-gray-01);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }

      .profilename {
        color: var(--color-gray-01);
      }
    }
    /* 이미지 올리는 아이콘 */
    .camera {
      font-size: 30px;
      cursor: pointer;
    }
  }

  /* 게시물 작성 섹션 */
  .posting {
    padding: 0 60px;

    .posttext {
      display: flex;
      margin: 20px 0;
    }

    .postimg {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;

      img {
        width: 90%;
        border-radius: 8px;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* 입력 텍스트칸 */
      textarea {
        width: 100%;
        height: 100px;
        border-radius: 8px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        resize: vertical; /* 세로 방향으로 크기 조절 가능 */
        margin-bottom: 20px;
      }
      /* 제출 버튼 */
      button {
        background: var(--color-facebookblue);
        width: 100%;
        height: 55px;
        border-radius: 8px;
        border: none;
        font-size: 26px;
        font-weight: bold;
        color: var(--color-white);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
`;

// Mainstorymodal 컴포넌트 정의
const Mainstorymodal = ({ onClose, onSubmit }) => {
  // 상태 관리: 게시물 텍스트
  const [postText, setPostText] = useState("");
  // 상태 관리: 게시물 이미지
  const [postImage, setPostImage] = useState(null); // const로 유지
  // 상태 관리: 모달 열림 상태 (현재는 사용되지 않음)
  const [setIsModalOpen] = useState(false);

  // 이미지 파일이 선택되었을 때 처리하는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 선택한 이미지 파일을 URL로 변환하여 상태에 저장
      setPostImage(URL.createObjectURL(file));
    }
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    // 게시물 데이터를 부모 컴포넌트로 전달
    onSubmit({ text: postText, image: postImage });
  };

  // 모달 닫기 버튼 클릭 시 호출되는 함수
  const handleCloseModal = () => {
    onClose(); // 부모 컴포넌트의 onClose 함수 호출
    setIsModalOpen(); // 모달 상태 업데이트 (현재는 사용되지 않음)
  };

  return (
    <Wrapper>
      <Inner>
        <div className="maodaltile">
          <div className="title">스토리 올리기</div>
          <div className="xmark" onClick={handleCloseModal}>
            <FiX />
          </div>
        </div>
        <div className="infoitem">
          <div className="info">
            <div className="profile"></div>
            <div className="profilename">김정하</div>
          </div>
          <div className="camera">
            <label htmlFor="modal-camera-input">
              <CiCamera />
            </label>
            <input
              id="modal-camera-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }} // 실제 파일 입력은 숨김
              onChange={handleImageChange} // 파일 선택 시 핸들러 호출
            />
          </div>
        </div>
        <div className="posting">
          <form onSubmit={handleSubmit}>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="스토리를 입력하세요."
              required
            />
            {postImage && (
              <div className="postimg">
                <img src={postImage} alt="스토리 이미지" />
              </div>
            )}
            <button type="submit">게시하기</button>
          </form>
        </div>
      </Inner>
    </Wrapper>
  );
};

export default Mainstorymodal;
