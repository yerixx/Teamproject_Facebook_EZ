import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import PostUploadField from '../detail/PostUploadField';
import './Comment.css';

const Comment = ({ profilePic, username, initialContent, onDelete }) => {
    const [content, setContent] = useState(initialContent);
    const [likes, setLikes] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleToggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

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
            <div className='commentContentWrapper'>
                <div className="comment-content">
                    <h4>{username}</h4>
                    {isEditing 
                        ? (
                            <input 
                                type="text" 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)} 
                            />
                        ) 
                        : (
                            <p>{content}</p>
                        )}
                </div>
                <div className="actions">
                    <button 
                        className={liked ? 'liked' : ''} // 클래스 추가
                        onClick={handleToggleLike}
                    >
                        {liked ? '좋아요 취소' : '좋아요'} {likes}
                    </button>
                    <button onClick={handleToggleEdit}>
                        {isEditing ? '저장' : '수정'}
                    </button>
                    <button onClick={onDelete}>삭제</button>
                </div>
            </div>
        </div>
    );
};

const App1 = () => {
    const [comments, setComments] = useState([
        { id: 1, profilePic: "/img/commentProfile1.jpg", username: "김예지", content: "이것은 댓글 컴포넌트의 첫 번째 댓글입니다." },
        { id: 2, profilePic: "/img/commentProfile2.jpg", username: "박예림", content: "파이어베이스 어떻게 연결하지?" },
        { id: 3, profilePic: "/img/commentProfile1.jpg", username: "박예림", content: "이것은 댓글 컴포넌트의 세 번째 댓글입니다" },
    ]);

    const handleDeleteComment = (id) => {
        const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
        if (confirmDelete) {
            setComments((prevComments) => prevComments.filter(comment => comment.id !== id));
        }
    };

    return (
        <div className="app">
            <h2>댓글</h2>
            {comments.map(comment => (
                <Comment 
                    key={comment.id}
                    profilePic={comment.profilePic}
                    username={comment.username}
                    initialContent={comment.content}
                    onDelete={() => handleDeleteComment(comment.id)}
                />
            ))}
            <PostUploadField/>
        </div>
    );
};

export default App1;
