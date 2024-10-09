import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostItem from "../detail/PostItem";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: 60px;
`;

const PostList = () => {
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
        console.error("게시물 데이터를 가져오는 중 오류 발생:", err);
      }
    };
    fetchPosts();
  }, []);

  const onDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <Wrapper>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          postId={post.id}
          imageSrc={post.image}
          contentDesc={post.content}
          onDeletePost={onDeletePost}
        />
      ))}
    </Wrapper>
  );
};

export default PostList;
