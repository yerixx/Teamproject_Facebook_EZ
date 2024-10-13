import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

import defaultProfile from "/img/defaultProfile.jpg";

import styled from "styled-components";
import {
  MainTitle_26_b,
  SubDescription_16_n,
  SubDescription_12_m,
  SubDescription_14_n,
  Paragraph_20_n,
} from "../../styles/GlobalStyles.styles.js";

const WrapperFrom = styled.form`
  z-index: 1;
  position: absolute;
  top: -100px;
  width: 100%;
  height: 261px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 60px;
  align-items: center;
  position: relative;
  padding: 0 90px;
  background: var(--color-white);
  border-radius: 30px 30px 0 0;

  @media (max-width: 768px) {
    top: -30px;
    max-width: 100%;
    height: 200px;
    padding: 0;
  }
`;
const ProfileContain = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
const ProfileImgCont = styled.div`
  position: relative;
  display: flex;
  gap: 30px;
  @media (max-width: 768px) {
    padding-left: 24px;
    align-items: center;
    gap: 15px;
  }
  .profileImg {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    @media (max-width: 768px) {
      width: 90px;
      height: 90px;
    }
  }
  .editIcon {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: 10px;
    right: -10px;
    padding: 8px;
    background: var(--color-white);
    border-radius: 50%;
    box-shadow: var(--box-shadow-01);
    color: var(--color-black);
    z-index: 1;
    transition: all 0.3s;
    &:hover {
      opacity: 0.8;
    }
    cursor: pointer;
    @media (max-width: 768px) {
      right: -10px;
    }
  }
`;

const ProfileText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 6px;
  .profileTop {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
      align-items: center;
      padding-right: 20px;
    }
    .profileName {
      ${MainTitle_26_b}
      @media (max-width: 768px) {
        ${Paragraph_20_n}
        font-weight:700;
        width: fit-content;
        flex-wrap: wrap;
      }
    }
  }
`;
const EditProfileDesc = styled.div`
  position: relative;
  padding: 4px 0;
  color: var(--color-gray-01);
  display: flex;
  flex-direction: column;
  gap: 10px;
  .editBox {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 10px;
    textarea {
      ${SubDescription_16_n};
      resize: none;
      padding: 0 10px;
      &:focus {
        outline: none;
      }
      @media (max-width: 768px) {
        ${SubDescription_14_n};
        width: 94%;
      }
    }
    .editBtns {
      display: flex;
      justify-content: end;
      gap: 10px;
      * {
        ${SubDescription_16_n};
        width: 50px;
        border: none;
        padding: 4px 10px;
        border-radius: 8px;
        color: var(--color-gray-01);
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background: var(--color-facebookblue);
          color: var(--color-white);
          font-weight: 600;
        }
        @media (max-width: 768px) {
          ${SubDescription_12_m};
          height: 26px;
          &:last-child {
            margin-right: 20px;
          }
        }
      }
    }
  }
`;
const ProfileDesc = styled.div`
  ${SubDescription_16_n}
  padding:4px 0;
  color: var(--color-gray-01);
  @media (max-width: 768px) {
    ${SubDescription_14_n}
  }
`;
const Button = styled.div`
  display: flex;
  gap: 20px;
  * {
    ${SubDescription_16_n}
    width:120px;
    height: 42px;
    border: none;
    border-radius: var(--border-radius-08);
    cursor: pointer;
    transition: all 0.3s;
    &:nth-child(1) {
      background: var(--color-facebookblue);
      color: var(--color-white);
    }
    /* &:nth-child(1), */
    &:nth-child(2) {
      background: var(--color-light-gray-01);
      color: var(--color-gray-01);
    }
    &:hover {
      background: var(--color-facebookblue);
      color: var(--color-white);
      font-weight: 600;
    }
    /* 미디어 쿼리 */
    @media (max-width: 768px) {
      ${SubDescription_12_m}
      max-width:76px;
      height: 34px;
    }
  }
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const ProfileCard = () => {
  const [isEditing, setEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImg, setProfileImg] = useState(defaultProfile);
  const [desc, setDesc] = useState("A Photographer @pylpic");

  const fileRef = useRef(null);
  const auth = getAuth();
  const storage = getStorage();
  const firestore = getFirestore();

  // Firebase에서 로그인한 사용자 가져오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // 사용자 정보 저장
        fetchProfileData(user); // Firestore에서 프로필 데이터 가져오기
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Firestore에서 프로필 정보 가져오기
  const fetchProfileData = async (user) => {
    const userDocRef = doc(firestore, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      setProfileImg(data.profileImage || defaultProfile);
      setDesc(data.description || "A Photographer @pylpic");
    }
  };

  // 이미지 파일 변경 처리
  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const fileRef = ref(storage, `profileImages/${user.uid}/profileImage`);
      try {
        await uploadBytes(fileRef, file); // 파일을 Firebase Storage에 업로드
        const fileURL = await getDownloadURL(fileRef); // 업로드된 파일의 URL 가져오기
        setProfileImg(fileURL); // State 업데이트

        // Firestore에 URL 저장
        const userDocRef = doc(firestore, "users", user.uid);
        await updateDoc(userDocRef, {
          profileImage: fileURL,
        });
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  // 프로필 설명 및 이미지 저장 처리
  const onSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const userDocRef = doc(firestore, "users", user.uid);
      try {
        await updateDoc(userDocRef, {
          description: desc,
          profileImage: profileImg,
        });
        alert("프로필이 성공적으로 업데이트되었습니다.");
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert("프로필 업데이트 중 오류가 발생했습니다.");
      }
    }
  };

  const profileEdite = () => {
    const confirmEdit = window.confirm("프로필을 수정 하시겠습니까?");
    if (confirmEdit) setEditing((prev) => !prev);
  };

  const handleIconClick = () => {
    fileRef.current.click();
  };

  const editCencel = () => {
    const confirmCencel = window.confirm(
      "프로필 수정 작업을 취소 하시겠습니까?"
    );
    if (confirmCencel) {
      setEditing(false);
      setDesc("A Photographer @pylpic");
    }
  };
  const editSave = (e) => {
    const confirmSave = window.confirm("프로필을 설정을 저장하시겠습니까?");
    if (confirmSave) {
      setEditing(false);
    }
  };
  return (
    <WrapperFrom onSubmit={onSubmit}>
      <ProfileContain>
        <ProfileImgCont>
          <img className="profileImg" src={profileImg} alt="Profile" />
          <input
            type="file"
            id="fileInput"
            name="fileInput"
            ref={fileRef}
            onChange={handleImgChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <FontAwesomeIcon
            onClick={handleIconClick}
            className="editIcon"
            icon={faCamera}
          />
        </ProfileImgCont>
        <ProfileText>
          <div className="profileTop">
            <h1 className="profileName">
              {user ? `${user.displayName || "사용자 이름"}` : "로그인 필요"}
              {/* {currentUserData.userName.firstName}
              {currentUserData.userName.lastName} */}
            </h1>
            <Button>
              <button>스토리추가</button>
              <button onClick={profileEdite}>프로필수정</button>
            </Button>
          </div>
          {isEditing ? (
            <EditProfileDesc>
              <div className="editBox">
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <div className="editBtns">
                  <button onClick={editCencel} type="submit">
                    취소
                  </button>
                  <button onClick={editSave} type="submit">
                    확인
                  </button>
                </div>
              </div>
            </EditProfileDesc>
          ) : (
            <ProfileDesc> {desc} </ProfileDesc>
          )}
        </ProfileText>
      </ProfileContain>
    </WrapperFrom>
  );
};

export default ProfileCard;
