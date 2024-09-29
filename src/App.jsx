import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import GlobalStyles from "./styles/GlobalStyles.styles.js";
import React, { useEffect, useReducer } from "react";

const Wrapper = styled.div``;

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data; //초기화 데이터
    case "ADD_USER": {
      const newState = { ...state, users: [...state.users, action.newUser] };
      return newState;
    }
    case "ADD_POST": {
      // posts 배열에 새 포스트 추가
      const updatedPosts = [action.newPost, ...state.posts];
      return { ...state, posts: updatedPosts };
    }
    case "UPDATE_USER_POSTS": {
      // users 배열에서 해당 userId를 가진 사용자의 posts에 새로운 postId 추가
      const updatedUsers = state.users.map((user) =>
        user.id === action.userId
          ? { ...user, posts: [...user.posts, action.newPostId] } // posts 배열에 새 postId 추가
          : user
      );
      return { ...state, users: updatedUsers };
    }

    case "ADD_COMMENT": {
      // 포스트 ID에 맞는 포스트를 찾아서 댓글 추가
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.postId) {
          // 해당 포스트의 comments 배열에 새로운 댓글 추가
          return {
            ...post,
            comments: [...post.comments, action.newComment],
          };
        }
        return post;
      });

      return { ...state, posts: updatedPosts };
    }

    case "UPDATE_USER": {
      const updatedUsers = state.users.map((user) =>
        user.id === action.updatedUser.id ? action.updatedUser : user
      );
      return { ...state, users: updatedUsers };
    }

    case "DELETE_POST": {
      const updatedPosts = state.posts.filter(
        (post) => post.id !== action.targetId
      );
      return { ...state, posts: updatedPosts };
    }
    default:
      return state;
  }
};

export const DataStateContext = React.createContext();
export const DataDispatchContext = React.createContext();

function App() {
  const initialState = {
    users: [],
    posts: [],
    stories: [],
    groups: [],
    liveCommerce: [],
    likeCategory: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      const response = await fetch("./mockData/mockData.json");
      const data = await response.json();
      dispatch({ type: "INIT", data });
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다.", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onCreatePost = (userId, content, image = null) => {
    const newPostId = Date.now().toString();
    dispatch({
      type: "ADD_POST",
      newPost: {
        id: newPostId,
        userId: userId,
        content: content,
        image: image ? [image] : [null],
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      },
    });
    dispatch({
      type: "UPDATE_USER_POSTS",
      userId: userId,
      newPostId: newPostId,
    });
  };

  // onCreatePost()

  const onCreateComment = (postId, userId, content) => {
    const newCommentId = Date.now().toString(); // 고유한 댓글 ID 생성
    dispatch({
      type: "ADD_COMMENT",
      postId: postId, //댓글이 달릴 포스트 ID
      newComment: {
        id: newCommentId, //고유한 댓글 ID
        userId: userId, //댓글 작성자 ID
        content: content, //댓글 내용
        createdAt: new Date().toISOString(), //댓글 작성 시간
      },
    });
  };

  return (
    <>
      <GlobalStyles />
      <DataStateContext.Provider value={state}>
        <DataDispatchContext.Provider value={{ onCreatePost, onCreateComment }}>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/detail" element={<Detail />} />
            </Routes>
          </Wrapper>
        </DataDispatchContext.Provider>
      </DataStateContext.Provider>
    </>
  );
}

export default App;
