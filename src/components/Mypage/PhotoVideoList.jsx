import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PhotoVideoItem from "./PhotoVideoItem";
import { DataStateContext } from "../../App";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import ModalCont from "../Modal/ModalCont";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: var(--inner-width-02);
  height: 100%;
  padding: 90px 90px;
  margin: 0 auto;
  gap: 15px;
  @media (max-width: 768px) {
    border: 1px solid #f00;
    width: 100%;
    padding: 100px 24px 60px;
    gap: 20px;
  }
`;

const PhotoVideoList = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const { currentUserData } = useContext(DataStateContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!currentUserData) return; // currentUserData가 없는 경우 실행하지 않음
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(postsQuery);
        const postData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            userId: doc.data().userId,
            ...doc.data(),
          }))
          .filter((post) => post.userId === currentUserData.userId); // 현재 사용자 게시물만 필터링
        setUserPosts(postData);
      } catch (err) {
        console.error("Post 데이터를 가져오는 중 오류 발생:", err);
      }
    };
    fetchPosts();
  }, [currentUserData]);

  const openModal = (post) => {
    setSelectedPost(post); // 선택된 포스트 저장
  };

  const closeModal = () => {
    setSelectedPost(null); // 모달 닫기
  };

  return (
    <>
      <Wrapper>
        {userPosts
          .filter((post) => post.image) // 이미지를 가진 포스트만 필터링
          .map((post) => (
            <PhotoVideoItem
              key={post.id}
              postId={post.id}
              userId={post.userId}
              imageSrc={post.image}
              contentDesc={post.content}
              createdAt={post.createdAt}
              ModalOpen={() => openModal(post)} // 포스트 객체를 전달
            />
          ))}
      </Wrapper>
      {selectedPost && (
        <ModalCont
          post={selectedPost} // 선택된 포스트 전체를 전달
          onClose={closeModal} // 모달 닫기 함수 전달
        />
      )}
    </>
  );
};

export default PhotoVideoList;
