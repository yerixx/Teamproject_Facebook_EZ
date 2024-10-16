import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth 불러오기
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import background from "/img/background.jpg";

const Wrapper = styled.section`
  width: 100%;
  /* => CoverImg height와 같이 수정해야함 */
  height: 475px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 140px;
  height: 475px;
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
  border-radius: 30px 30px 0 0;
  object-fit: cover;

  @media (max-width: 768px) {
    border-radius: 0;
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
  const [coverImg, setCoverImg] = useState(background);
  const [user, setUser] = useState(null);

  const fileRef = useRef(null);
  const auth = getAuth();
  const storage = getStorage();
  const firestore = getFirestore();

  // Firebase에서 로그인한 사용자 가져오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // 사용자 정보 저장
        fetchCoverImage(user); // 사용자 정보를 가져왔을 때 이미지를 불러옴
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // 컴포넌트가 언마운트될 때 구독 해제
  }, [auth]);

  // Firestore에서 coverImage 가져오기
  const fetchCoverImage = async (user) => {
    const userDocRef = doc(firestore, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      setCoverImg(data.coverImage || background);
    }
  };

  // 이미지 파일 변경 처리
  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const fileRef = ref(storage, `covers/${user.uid}/coverImage`);
      try {
        await uploadBytes(fileRef, file); // 파일을 Firebase Storage에 업로드
        const fileURL = await getDownloadURL(fileRef); // 업로드된 파일의 URL 가져오기
        setCoverImg(fileURL); // State 업데이트

        // Firestore에 URL 저장
        const userDocRef = doc(firestore, "users", user.uid);
        await updateDoc(userDocRef, {
          coverImage: fileURL,
        });
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
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
