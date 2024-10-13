import React, { useState, useEffect } from 'react';
import CommentUpload from './CommentUpload';
import { db } from '../../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import App from '../../App';
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
                        className={liked ? 'liked' : ''} 
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
    const [comments, setComments] = useState([]);
    const commentsCollectionRef = collection(db, "comments");

    useEffect(() => {
        const unsubscribe = onSnapshot(commentsCollectionRef, (snapshot) => {
            const fetchedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComments(fetchedComments);
        });

        return () => unsubscribe();
    }, []);

    const handleCreateComment = async (newComment) => {
        await addDoc(commentsCollectionRef, newComment);
    };

    const handleDeleteComment = async (id) => {
        const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "comments", id));
            } catch (error) {
                console.error("댓글 삭제 중 오류가 발생했습니다:", error);
            }
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
            <CommentUpload onCreateComment={handleCreateComment} />
        </div>
    );
};

export default App1;
