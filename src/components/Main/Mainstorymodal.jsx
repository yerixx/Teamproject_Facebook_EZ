import React, { useState, useContext } from "react"; // React와 useState, useContext 훅을 임포트
import styled from "styled-components"; // styled-components를 사용하여 스타일 컴포넌트 작성
import { FiX } from "react-icons/fi"; // 닫기 아이콘을 위한 FiX 아이콘 임포트
import { CiCamera } from "react-icons/ci"; // 카메라 아이콘을 위한 CiCamera 아이콘 임포트
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage 관련 함수 임포트
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Firestore 관련 함수 임포트
import { DataDispatchContext } from "../../App"; // 데이터 디스패치 컨텍스트 임포트
import { storage, db } from "../../firebase"; // Firebase 스토리지와 데이터베이스 임포트
import {
  SubDescription_12_m,
  SubDescription_14_n,
} from "../../styles/GlobalStyles.styles";

// 전체 모달을 감싸는 스타일 컴포넌트
const WrapperForm = styled.form`
  position: fixed;
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

// 모달 내부 콘텐츠의 스타일 컴포넌트
const Inner = styled.div`
  width: 400px;
  border-radius: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 20px;
  @media screen and (max-width: 768px) {
    width: 70%;
  }
  .modaltitle {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    border-bottom: 1px solid #d3d3d3;
    height: 60px;
    position: relative;
    margin-bottom: 15px;
    .title {
      font-weight: bold;
    }
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
    }
    .camera {
      font-size: 30px;
      cursor: pointer;
    }
  }

  .storyupload {
    padding: 0 60px;
    .storyimage, .storyvideo {
      width: 100%;
      max-width: 650px;
      height: 600px;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      img, video {
        width: 100%;
        height: 60%;
        border-radius: 8px;
      }
    }

    .storyvideo {
      /* 비디오 전용 추가 스타일 */
      video {
        border: 2px solid #d3d3d3;
        border-radius: 8px;
        /* 추가적인 스타일을 원하시면 여기에 작성 */
      }
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      .camera {
        padding: 4px 10px;
        border: 1px solid #d3d3d3;
        width: 100%;
        height: 360px;
        font-size: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          color: var(--color-facebookblue);
        }

        .camera_icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          .text {
            font-size: 20px;
          }
        }
      }
      .storytext {
        width: 100%;
        height: 100px;
        border-radius: 8px;
        padding: 10px;
        ${SubDescription_14_n}
        border: 1px solid #ccc;
        resize: vertical;
        margin-bottom: 20px;
        @media screen and (max-width: 768px) {
          border: 1px solid red;
          ${SubDescription_12_m}
        }
      }
      button {
        background: var(--color-facebookblue);
        width: 100%;
        height: 55px;
        border-radius: 8px;
        border: none;
        font-size: 26px;
        font-weight: bold;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      }
    }
  }
`;

// Mainstorymodal 컴포넌트 정의
const Mainstorymodal = ({ onClose }) => {
  const [storyText, setStoryText] = useState(""); // 스토리 텍스트 상태
  const [storyImage, setStoryImage] = useState(null); // 이미지 파일 상태
  const [storyVideo, setStoryVideo] = useState(null); // 비디오 파일 상태
  const [uploading, setUploading] = useState(false); // 업로드 상태
  const [error, setError] = useState(null); // 에러 메시지 상태
  const { onCreateStory } = useContext(DataDispatchContext); // 데이터 디스패치 컨텍스트에서 함수 가져오기

  // 이미지 파일 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택된 파일
    if (file) setStoryImage(file); // 파일이 존재하면 상태 업데이트
  };

  // 비디오 파일 처리
  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // 선택된 파일
    if (file) setStoryVideo(file); // 파일이 존재하면 상태 업데이트
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    setUploading(true); // 업로드 시작
    setError(null); // 에러 초기화

    try {
      let imageUrl = ""; // 이미지 URL 초기화
      let videoUrl = ""; // 비디오 URL 초기화

      // 이미지 업로드 처리
      if (storyImage) {
        const imageRef = ref(
          storage,
          `images/${storyImage.name}-${Date.now()}`
        );
        const imageSnapshot = await uploadBytes(imageRef, storyImage);
        imageUrl = await getDownloadURL(imageSnapshot.ref);
      }

      // 비디오 업로드 처리
      if (storyVideo) {
        const videoRef = ref(
          storage,
          `videos/${storyVideo.name}-${Date.now()}`
        );
        const videoSnapshot = await uploadBytes(videoRef, storyVideo);
        videoUrl = await getDownloadURL(videoSnapshot.ref);
      }

      // Firestore에 스토리 추가
      await addDoc(collection(db, "story"), {
        text: storyText,
        imageUrl,
        videoUrl,
        createdAt: Timestamp.fromDate(new Date()),
      });

      await onCreateStory("testUserId", "TestUser", storyText, imageUrl, videoUrl); // 스토리 생성 후 처리
      setStoryText(""); // 텍스트 초기화
      setStoryImage(null); // 이미지 초기화
      setStoryVideo(null); // 비디오 초기화
      onClose(); // 모달 닫기
      alert("스토리가 성공적으로 업로드되었습니다!"); // 성공 메시지
    } catch (err) {
      console.error("오류 발생:", err);
      setError("스토리 업로드에 실패했습니다."); // 에러 상태 업데이트
      alert("스토리 업로드에 실패했습니다.");
    } finally {
      setUploading(false); // 업로드 상태 종료
    }
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <Inner>
        <div className="modaltitle">
          <div className="title">스토리 올리기</div>
          <div className="xmark" onClick={onClose}>
            <FiX />
          </div>
        </div>
        <div className="storyupload">
          <div>
            {!storyImage && !storyVideo && (
              <div className="camera">
                <label htmlFor="modal-camera-input" className="camera_icon">
                  <CiCamera />
                  <div className="text">스토리 업로드하기</div>
                </label>
                <input
                  id="modal-camera-input"
                  type="file"
                  accept="image/*, video/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    e.target.files[0].type.startsWith("image/")
                      ? handleImageChange(e)
                      : handleVideoChange(e)
                  } // 파일 유형에 따라 처리
                />
              </div>
            )}
            {storyImage && (
              <div className="storyimage">
                <img
                  src={URL.createObjectURL(storyImage)} // 선택한 이미지 미리보기
                  alt="스토리 이미지"
                />
              </div>
            )}
            {storyVideo && (
              <div className="storyvideo">
                <video controls>
                  <source
                    src={URL.createObjectURL(storyVideo)} // 선택한 비디오 미리보기
                    type={storyVideo.type}
                  />
                </video>
              </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={uploading}>
              {uploading ? "업로드 중..." : "스토리 게시하기"}
            </button>
          </div>
        </div>
      </Inner>
    </WrapperForm>
  );
};

export default Mainstorymodal; // 컴포넌트 내보내기
