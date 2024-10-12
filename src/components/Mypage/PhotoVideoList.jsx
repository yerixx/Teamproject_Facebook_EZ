import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PhotoVideoItem from "./PhotoVideoItem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

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
  const [posts, setPosts] = useState([]);

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
        setPosts(postData);
      } catch (err) {
        console.error("Post 데이터를 가져오는 중 오류 발생:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      {posts
        .filter((post) => post.image)
        .map((post) => (
          <PhotoVideoItem
            key={post.id}
            postId={post.id}
            imageSrc={post.image}
            contentDesc={post.content}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};

export default PhotoVideoList;
