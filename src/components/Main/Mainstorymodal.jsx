import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi"; // 닫기 아이콘
import { CiCamera } from "react-icons/ci"; // 카메라 아이콘
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage 함수
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Firestore 함수
import { DataDispatchContext } from "../../App"; // 컨텍스트 임포트 경로 확인
import { storage, db, auth } from "../../firebase"; // Firebase 설정 파일 임포트

// 전체 모달을 감싸는 스타일 컴포넌트
const Wrapper = styled.div`
  position: fixed; /* 화면에 고정 위치 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은 배경 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  z-index: 1000; /* 다른 요소들보다 위에 표시 */
`;

// 모달 내부 컨텐츠의 스타일 컴포넌트
const Inner = styled.div`
  width: 900px;
  border-radius: 30px; /* 둥근 모서리 */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  background-color: #fff; /* 흰색 배경 */
  padding: 20px;

  /* 모달의 타이틀 섹션 */
  .maodaltile {
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    font-size: 26px;
    border-bottom: 1px solid #d3d3d3; /* 하단 경계선 */
    height: 60px;
    position: relative;
    margin-bottom: 15px;

    /* 스토리 올리기 제목 */
    .title {
      font-weight: bold; /* 굵은 글씨 */
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
      cursor: pointer; /* 마우스 커서 변경 */
    }
  }

  /* 게시물 작성 섹션 */
  .posting {
    padding: 0 60px;

    /* 게시물 이미지 미리보기 섹션 */
    .postimg {
      width: 650px;
      height: 600px;
      display: flex;
      justify-content: center; /* 가로 중앙 정렬 */
      margin-bottom: 20px;

      img {
        width: 90%; /* 이미지 너비 */
        border-radius: 8px; /* 둥근 모서리 */
      }
    }

    /* 폼 섹션 */
    form {
      display: flex;
      flex-direction: column; /* 세로 방향 정렬 */
      align-items: center; /* 중앙 정렬 */

      /* 이미지 업로드 섹션 */
      .camera {
        padding: 4px 10px;
        border: 1px solid #d3d3d3; /* light gray */
        width: 40%;
        height: 360px;
        font-size: 70px;
        display: flex;
        justify-content: center; /* 가로 중앙 정렬 */
        align-items: center; /* 세로 중앙 정렬 */
        margin-bottom: 20px;
        cursor: pointer; /* 마우스 커서 변경 */
        transition: all 0.3s; /* 호버 시 부드러운 전환 효과 */

        &:hover {
          color: #1877f2; /* 호버 시 텍스트 색상 변경 (예: Facebook blue) */
        }

        /* 카메라 아이콘 및 텍스트 섹션 */
        .camera_icon {
          display: flex;
          flex-direction: column; /* 세로 방향 정렬 */
          align-items: center; /* 중앙 정렬 */

          .text {
            font-size: 20px; /* 텍스트 크기 */
          }
        }
      }

      /* 텍스트 입력 섹션 */
      .posttext {
        width: 100%;
        margin-bottom: 20px;

        textarea {
          width: 100%;
          height: 100px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          resize: none;
          font-size: 16px;
        }
      }

      /* 제출 버튼 */
      button {
        background: #1877f2; /* 버튼 배경색 (예: Facebook blue) */
        width: 100%;
        height: 55px;
        border-radius: 8px; /* 둥근 모서리 */
        border: none; /* 테두리 제거 */
        font-size: 26px;
        font-weight: bold; /* 굵은 글씨 */
        color: #fff; /* 글씨 색상 */
        display: flex;
        align-items: center;
        justify-content: center; /* 중앙 정렬 */
        cursor: pointer; /* 마우스 커서 변경 */

        &:disabled {
          background: #ccc; /* 비활성화 시 버튼 색상 */
          cursor: not-allowed; /* 비활성화 시 커서 변경 */
        }
      }
    }
  }
`;

// Mainstorymodal 컴포넌트 정의
const Mainstorymodal = ({ onClose }) => {
  // 상태 관리: 게시물 텍스트
  const [postText, setPostText] = useState("");
  // 상태 관리: 게시물 이미지
  const [postImage, setPostImage] = useState(null);
  // 상태 관리: 업로드 진행 상태
  const [uploading, setUploading] = useState(false);
  // 상태 관리: 에러 메시지
  const [error, setError] = useState(null);
  const { onCreatePost } = useContext(DataDispatchContext);

  // 이미지 파일이 선택되었을 때 처리하는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택된 파일 가져오기
    if (file) {
      setPostImage(file); // 선택된 파일을 상태에 저장
    }
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (file) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setUploading(true); // 업로드 상태 시작
    setError(null); // 이전 에러 초기화
    // console.log("업로드 시작");
    try {
      let imageUrl = "";

      // if (postImage) {
      //   // console.log("이미지 업로드 시작:", postImage.name);
      //   // Firebase Storage에 이미지 업로드
      const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
      // 고유한 파일 이름 생성
      const snapshot = await uploadBytes(storageRefInstance, postImage); // 파일 업로드
      imageUrl = await getDownloadURL(snapshot.ref); // 업로드된 파일의 다운로드 URL 가져오기
      console.log("이미지 업로드 완료:", imageUrl);
      // }

      console.log("Firestore에 스토리 저장 시작");
      // Firestore에 스토리 데이터 저장
      await addDoc(collection(db, "stories"), {
        text: postText, // 게시물 텍스트
        imageUrl: imageUrl, // 업로드된 이미지 URL
        createdAt: Timestamp.fromDate(new Date()), // 생성 시간
        // 필요한 경우 추가 필드 (예: userId, userName 등)
      });
      console.log("Firestore에 스토리 저장 완료");

      console.log("onCreatePost 호출 시작");
      await onCreatePost("testUserId", "TestUser", postText, imageUrl);
      console.log("onCreatePost 호출 완료");

      // 업로드 성공 후 상태 초기화 및 모달 닫기
      setPostText(""); // 텍스트 초기화
      setPostImage(null); // 이미지 초기화
      onClose(); // 부모 컴포넌트의 onClose 함수 호출
      alert("스토리가 성공적으로 업로드되었습니다!"); // 성공 알림
    } catch (err) {
      console.error("스토리 업로드 중 오류 발생:", err); // 콘솔에 오류 출력
      console.error("오류 메시지:", err.message); // 오류 메시지 출력
      console.error("오류 코드:", err.code); // 오류 코드 출력
      setError("스토리 업로드에 실패했습니다. 다시 시도해주세요."); // 사용자에게 에러 메시지 표시
    } finally {
      setUploading(false); // 업로드 상태 종료
      console.log("업로드 상태 종료");
    }
  };

  // 모달 닫기 버튼 클릭 시 호출되는 함수
  const handleCloseModal = () => {
    onClose(); // 부모 컴포넌트의 onClose 함수 호출
  };

  return (
    <Wrapper>
      <Inner>
        {/* 모달 타이틀 섹션 */}
        <div className="maodaltile">
          <div className="title">스토리 올리기</div>
          <div className="xmark" onClick={handleCloseModal}>
            <FiX /> {/* 닫기 아이콘 */}
          </div>
        </div>

        {/* 게시물 작성 섹션 */}
        <div className="posting">
          <form onSubmit={handleSubmit}>
            {/* 이미지가 선택되지 않았을 때만 카메라 섹션을 표시 */}
            {!postImage && (
              <div className="camera">
                <label htmlFor="modal-camera-input" className="camera_icon">
                  <CiCamera /> {/* 카메라 아이콘 */}
                  <div className="text">스토리 업로드하기</div>{" "}
                  {/* 안내 텍스트 */}
                </label>
                <input
                  id="modal-camera-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }} // 실제 파일 입력은 숨김 처리
                  onChange={handleImageChange} // 파일 선택 시 호출되는 함수
                />
              </div>
            )}

            {/* 이미지가 선택되었을 때 미리보기 표시 */}
            {postImage && (
              <div className="postimg">
                <img src={URL.createObjectURL(postImage)} alt="스토리 이미지" />{" "}
                {/* 선택된 이미지 미리보기 */}
              </div>
            )}

            {/* 에러 메시지 표시 */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* 제출 버튼 */}
            <button type="submit" disabled={uploading}>
              {uploading ? "업로드 중..." : "게시하기"}
              {/* 업로드 상태에 따라 버튼 텍스트 변경 */}
            </button>
          </form>
        </div>
      </Inner>
    </Wrapper>
  );
};

export default Mainstorymodal;
