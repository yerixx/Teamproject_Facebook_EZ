import React, { useState, useEffect } from "react";
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

// 개별 댓글 컴포넌트
const Comment = ({ profilePic, username, content, onDelete }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="comment">
      <img
        src={profilePic}
        alt={`${username}'s profile`}
        className="profile-pic"
      />
      <div className="commentContentWrapper">
        <div className="comment-content">
          <h4>{username}</h4>
          <p>{content}</p>
        </div>
        <div className="actions">
          <button className={liked ? "liked" : ""} onClick={handleToggleLike}>
            {liked ? "좋아요 취소" : "좋아요"} {likes}
          </button>
          <button onClick={onDelete}>삭제</button>
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const commentsRef = collection(db, "posts", postId, "comments");

  useEffect(() => {
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleCreateComment = async (content) => {
    const newComment = {
      content,
      createdAt: new Date().toISOString(),
    };
    await addDoc(commentsRef, newComment);
  };

  const handleDeleteComment = async (id) => {
    await deleteDoc(doc(db, "posts", postId, "comments", id));
  };

  return (
    <div>
      <h4>댓글</h4>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          profilePic={comment.profilePic}
          username={comment.username}
          content={comment.content}
          onDelete={() => handleDeleteComment(comment.id)}
        />
      ))}
      <CommentUpload onCreateComment={handleCreateComment} />
    </div>
  );
};

export default CommentSection;
