import React, { useState, useContext, useEffect } from "react";
import { DataDispatchContext, DataStateContext } from "../../App.jsx";
import styled from "styled-components";
import { CiCamera } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { storage, db } from "../../firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SubDescription_14_n } from "../../styles/GlobalStyles.styles.js";

// Styled-components 정의 (생략)

const UploadModal = ({
  closeModal,
  postId,
  imageSrc,
  contentDesc,
  isEditing,
  currentUserData,
}) => {
  const { onUpdatePost, onCreatePost } = useContext(DataDispatchContext);
  const { currentUserData: userData } = useContext(DataStateContext);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadText, setUploadText] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setUploadText(contentDesc || "");
    }
  }, [isEditing, contentDesc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile && !uploadText && !contentDesc) {
      alert("내용을 입력해주세요");
      return;
    }

    setIsLoading(true);
    let imageUrl = imageSrc;

    if (uploadFile) {
      try {
        imageUrl = await uploadImage(uploadFile);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        setIsLoading(false);
        return;
      }
    }

    try {
      if (isEditing) {
        await onUpdatePost(postId, {
          content: uploadText || contentDesc,
          image: imageUrl || null,
          updatedAt: new Date().toISOString(),
        });
        alert("게시물이 수정되었습니다.");
      } else {
        await onCreatePost({
          userId: "testUserId",
          userName: "TestUser",
          content: uploadText,
          image: imageUrl,
          createdAt: new Date().toISOString(),
        });
        alert("게시물이 성공적으로 업로드되었습니다.");
      }

      setUploadText("");
      setUploadFile(null);
      closeModal();
    } catch (err) {
      console.error("게시물 처리 중 오류:", err);
      setError("게시물 업로드에 실패했습니다.");
      alert("게시물 업로드에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (err) {
      console.error("이미지 업로드 오류:", err);
      throw err;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      setUploadFile(file);
    } else {
      alert("업로드할 수 있는 파일의 최대 크기는 5MB입니다");
    }
  };

  return (
    <Wrapper>
      <Inner>
        <ModalTitle>
          <div className="title">
            {isEditing ? "게시물 수정하기" : "게시물 올리기"}
          </div>
          <div className="xmark" onClick={closeModal}>
            <FiX />
          </div>
        </ModalTitle>
        <Posting>
          <InfoItem>
            <div className="info">
              <img
                className="profileImg"
                src={userData?.fileImage || imageSrc}
                alt="profile Image"
              />
              <div className="profilename">
                {userData?.userName?.firstName || "이름"}
                {userData?.userName?.lastName || "성"}
              </div>
            </div>
            <label htmlFor="upload-image">
              <CiCamera style={{ cursor: "pointer", fontSize: "30px" }} />
            </label>
          </InfoItem>
          <textarea
            value={uploadText}
            onChange={(e) => setUploadText(e.target.value)}
            placeholder="오늘 어떤 일이 있으셨나요?"
            required
          />
          {(uploadFile || imageSrc) && (
            <PostingImg>
              <img
                src={uploadFile ? URL.createObjectURL(uploadFile) : imageSrc}
                alt="게시물 이미지"
              />
            </PostingImg>
          )}
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <PostingBtn
            onClick={handleSubmit}
            disabled={isLoading || (!uploadFile && !imageSrc)}
            hasImage={!!uploadFile}
            hasVideo={false} // 비디오 기능이 없을 경우
          >
            {isLoading ? "게시 중..." : isEditing ? "수정하기" : "게시하기"}
          </PostingBtn>
        </Posting>
      </Inner>
    </Wrapper>
  );
};

export default UploadModal;
