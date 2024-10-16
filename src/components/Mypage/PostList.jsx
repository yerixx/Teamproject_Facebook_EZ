import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PostItem from "../Mypage/PostItem";
import ModalCont from "../Modal/ModalCont";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { DataDispatchContext, DataStateContext } from "../../App";

const Wrapper = styled.div`
  height: fit-content;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: 60px;
`;

const PostList = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isContOpen, setIsContOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postedCont, setPostedCont] = useState(null);
  const { onDeletePost } = useContext(DataDispatchContext);
  const { posts, currentUserData } = useContext(DataStateContext);

  useEffect(() => {
    if (currentUserData && posts) {
      const filteredPosts = posts.filter(
        (post) => post.userId === currentUserData.userId
      );
      setUserPosts(filteredPosts);
    }
  }, [posts, currentUserData]);

  const handleModalOpen = () => {
    try {
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalContClose = () => {
    setIsContOpen(false);
    // setPostedCont(null); // 이 부분을 제거합니다.
  };

  const handleModalContOpen = (post) => {
    setPostedCont(post); // post를 먼저 설정한 후 모달을 엽니다.
    setIsContOpen(true);
  };

  const sortedPosts = userPosts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <>
      <Wrapper>
        {sortedPosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onDeletePost={onDeletePost}
            handleModalOpen={handleModalOpen}
            handleModalContOpen={() => handleModalContOpen(post)}
          />
        ))}
      </Wrapper>
      {isContOpen && (
        <ModalCont
          post={postedCont}
          handleModalContClose={handleModalContClose}
        />
      )}
    </>
  );
};
export default PostList;
