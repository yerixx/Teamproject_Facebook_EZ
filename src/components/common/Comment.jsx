import React, { useState, useEffect, useContext } from "react";
import CommentUpload from "./CommentUpload";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./Comment.css";
import { DataStateContext } from "../../App";
import { styled } from "styled-components";

// 개별 댓글 컴포넌트
const Comment = ({ comment, onDelete, showDelete }) => {
  console.log(comment);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="comment">
      <img
        src={comment.profilePic || "/img/defaultProfile.jpg"}
        alt={`${comment.formattedUserName}'s profile`}
        className="profile-pic"
      />
      <div className="commentContentWrapper">
        <div className="comment-content">
          <h4>{comment.formattedUserName}</h4>
          <p>{comment.content}</p>
        </div>
        <div className="actions">
          <button className={liked ? "liked" : ""} onClick={handleToggleLike}>
            {liked ? "좋아요 취소" : "좋아요"} {likes}
          </button>
          {showDelete && <button onClick={onDelete}>삭제</button>}
        </div>
      </div>
    </div>
  );
};

const CommentList = styled.div`
  height: 100%;
  max-height: 300px;
  overflow-y: scroll;
  padding: 20px 0;
  @media (max-width: 768px) {
    padding: 0;
    max-height: 200px;
  }
`;

const CommentTitle = styled.div`
  font-weight: 600;
  padding: 10px 20px;
`;

const CommentSection = ({ post }) => {
  const { currentUserData } = useContext(DataStateContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("Post Data:", post); // post 데이터 확인
  }, [post]);

  useEffect(() => {
    if (!post?.id) return; // post.id가 없을 때 return

    const commentsRef = collection(db, "posts", post.id, "comments");

    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched comments:", fetchedComments); // 데이터 확인
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [post?.id]); // post.id가 로딩 후 변경되었는지 추적

  const handleCreateComment = async (postId, content) => {
    console.log("Creating comment with content:", content); // 전달되는 값 확인

    if (!content.trim()) {
      console.error("댓글 내용이 비어 있습니다.");
      return;
    }
    const formattedUserName = currentUserData?.userName
      ? `${currentUserData.userName.firstName}${currentUserData.userName.lastName}`
      : "Anonymous";
    const newComment = {
      content, // 댓글 내용이 올바르게 들어가야 함
      formattedUserName,
      userId: currentUserData?.userId || "guest",
      createdAt: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(
        collection(db, `posts/${postId}/comments`),
        newComment
      );
      console.log("댓글이 Firestore에 저장되었습니다:", docRef.id);
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
    }
  };
  const handleDeleteComment = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", post.id, "comments", id)); // Firestore에서 댓글 삭제
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      ); // UI에서 삭제 반영
      console.log("댓글이 삭제되었습니다:", id);
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }
  };
  const sortedPosts = comments.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      <CommentTitle>댓글</CommentTitle>
      <CommentList>
        {sortedPosts.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDelete={() => handleDeleteComment(comment.id)}
            showDelete={comment.userId === currentUserData?.userId}
          />
        ))}
      </CommentList>
      <CommentUpload
        postId={post.id}
        onCreateComment={(content) => {
          if (!content.trim()) {
            console.error("댓글 내용이 비어 있습니다.");
            return;
          }
          handleCreateComment(post.id, content);
        }}
      />
    </>
  );
};

export default CommentSection;
