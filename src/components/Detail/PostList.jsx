import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PostItem from "../detail/PostItem";
import ModalCont from "../Modal/ModalCont";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { DataDispatchContext } from "../../App";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: 60px;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isContOpen, setIsContOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postedCont, setPostedCont] = useState(null);
  const { onDeletePost } = useContext(DataDispatchContext);

  const handleModalOpen = () => {
    try {
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalContOpen = (post) => {
    setIsContOpen(true);
    setPostedCont(post);
  };
  const handleModalContClose = () => {
    setIsContOpen(false);
    setPostedCont(null);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(postsQuery);
        const postData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData); // 초기 데이터 설정
      } catch (err) {
        console.error("Post 데이터를 가져오는 중 오류 발생:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Wrapper>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            postId={post.id}
            imageSrc={post.image}
            createdAt={post.createdAt}
            contentDesc={post.content}
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
