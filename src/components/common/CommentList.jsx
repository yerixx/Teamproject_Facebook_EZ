import React from "react";

const CommentList = ({ comments, postId, onDeleteComment }) => (
  <div className="comments">
    {comments.length > 0 ? (
      comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>
            <strong>{comment.userName}</strong>: {comment.content}
          </p>
          <button onClick={() => onDeleteComment(postId, comment.id)}>
            삭제
          </button>
        </div>
      ))
    ) : (
      <p>댓글이 없습니다.</p>
    )}
  </div>
);

export default CommentList;
