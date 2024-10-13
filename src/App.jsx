import { Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout.jsx";
import LoadingScreen from "./components/common/LoadingScreen.jsx";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Mypage.jsx";
import ModalLive from "./components/Modal/ModalLive.jsx";
import ModalCont from "./components/Modal/ModalCont.jsx";
import GlobalStyles from "./styles/GlobalStyles.styles.js";
import React, { useEffect, useReducer, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { darkTheme } from "./styles/theme.js";
import { lightTheme } from "./styles/theme.js";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

// Page Router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "mypage",
        element: <Detail />,
      },
      {
        path: "modallive",
        element: <ModalLive />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ...state, ...action.data }; //초기화 데이터
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
    case "LIKE_POST": {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.postId) {
          const updatedLikes = action.isLiked ? post.likes - 1 : post.likes + 1; // 좋아요 수 증가/감소
          return {
            ...post,
            likes: updatedLikes, // 업데이트된 좋아요 수
          };
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
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
    // 업데이트는 추후 수정 예정
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
    case "SET_CURRENT_USER_DATA":
      return { ...state, currentUserData: action.data };
    default:
      return state;
  }
};

export const DataStateContext = React.createContext();
export const DataDispatchContext = React.createContext();
export const DarkThemeContext = React.createContext();

function App() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("isDark");
    if (savedTheme) {
      setIsDark(JSON.parse(savedTheme));
    }
  }, []);

  // 다크 모드 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  // Loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await auth.authStateReady(); // 인증 상태가 준비된 후 호출
      await fetchData(); // 데이터를 불러오는 함수 호출
      setIsLoading(false); // 데이터가 모두 준비된 후 로딩 상태 해제
    };
    init();
  }, []);

  const initialState = {
    users: [],
    posts: [],
    stories: [],
    groups: [],
    liveCommerce: [],
    likeCategory: [],
    currentUserData: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const postsSnapshot = await getDocs(collection(db, "posts"));

      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        posts: [],
        ...doc.data(),
      }));

      const posts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched users:", users); // 사용자 데이터 로그
      console.log("Fetched posts:", posts); // 포스트 데이터 로그

      dispatch({ type: "INIT", data: { users, posts } });
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다.", error);
    }
  };

  const fetchUserData = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        dispatch({
          type: "SET_CURRENT_USER_DATA",
          data: {
            ...data,
            profileImage: data.profileImage || "", // 기본값 설정
          },
        });
      } else {
        dispatch({ type: "SET_CURRENT_USER_DATA", data: null });
      }
    } catch (error) {
      console.error("사용자 데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await fetchUserData(user); // 사용자 데이터 가져오기
        setIsLoading(false); // 로딩 완료 후 false 설정
      } else {
        dispatch({ type: "SET_CURRENT_USER_DATA", data: null });
        setIsLoading(false); // 로딩 완료 후 false 설정
      }
    });

    return () => unsubscribe(); // 클린업 함수로 리스너 해제
  }, []);

  const onCreatePost = async (userId, userName, content, image = null) => {
    const newPost = {
      userId,
      userName,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    // 이미지가 존재할 때만 newPost에 image 필드를 추가
    if (image) {
      newPost.image = [image];
    }
    try {
      const docRef = await addDoc(collection(db, "posts"), newPost);
      // Firestore에 추가된 데이터로 상태를 업데이트
      dispatch({
        type: "ADD_POST",
        newPost: { ...newPost, id: docRef.id },
      });

      dispatch({
        type: "UPDATE_USER_POSTS",
        userId,
        newPostId: docRef.id,
      });
    } catch (error) {
      console.error("Firestore에 포스트 추가 중 오류 발생:", error);
    }
  };

  const onUpdatePost = async (postId, updatedData) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, updatedData);
      console.log("게시물이 성공적으로 수정되었습니다");
    } catch (error) {
      console.error("게시물 수정 중 오류:", error);
    }
  };

  const onAddUser = async (
    userId,
    firstName,
    lastName,
    email,
    point = 0,
    won = 0,
    gender = null,
    birthdate = null,
    city = null,
    likeCategory = [],
    profileImage = "",
    backgroundImage = "",
    introduction = ""
  ) => {
    try {
      const userDoc = {
        userId,
        userName: {
          firstName,
          lastName,
        },
        email,
        gender,
        birthdate,
        city,
        likeCategory,
        profileImage,
        backgroundImage,
        introduction,
        wallet: {
          point,
          won,
        },
      };

      console.log("Saving user data:", userDoc); // 추가된 로그
      await setDoc(doc(db, "users", userId), userDoc);

      dispatch({
        type: "ADD_USER",
        newUser: {
          ...userDoc,
          posts: [],
        },
      });
    } catch (error) {
      console.error("Firestore에 유저 추가 중 오류 발생:", error);
    }
  };
  const onToggleLike = async (postId, isLiked) => {
    // try {
    //   const postDocRef = doc(db, "posts", postId);

    //   await updateDoc(postDocRef, {
    //     likes: isLiked ? true : false,
    //   });
    // } catch (err) {
    //   console.error("Like error :", err);
    // }

    dispatch({
      type: "LIKE_POST",
      postId: postId, // 좋아요가 눌린 포스트 ID
      isLiked: isLiked, // 현재 사용자가 이 포스트에 좋아요를 눌렀는지 여부
    });
  };

  const onCreateComment = async (postId, userId, userName, content) => {
    const newComment = {
      id: Date.now().toString(), // 고유한 댓글 ID
      userId: userId, // 댓글 작성자 ID
      userName: userName, // 댓글 작성자 이름
      content: content, // 댓글 내용
      createdAt: new Date().toISOString(), // 댓글 작성 시간
      likes: 0, // 좋아요 기본값
    };
    try {
      // Firestore에서 해당 포스트 문서 참조
      const postDocRef = doc(db, "posts", postId);

      // Firestore의 해당 포스트에 댓글 추가 (comments 필드에 array로 저장)
      await updateDoc(postDocRef, {
        comments: arrayUnion(newComment),
      });

      // 상태 업데이트 (옵션)
      dispatch({
        type: "ADD_COMMENT",
        postId: postId, // 댓글이 달릴 포스트 ID
        newComment: newComment,
      });
    } catch (error) {
      console.error("댓글 추가 중 오류 발생:", error);
    }
  };

  const onDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      dispatch({ type: "DELETE_POST", targetId: postId });
    } catch (error) {
      console.error("Firestore에서 포스트 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      <DarkThemeContext.Provider value={{ isDark, setIsDark }}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyles />
          <DataStateContext.Provider value={state}>
            <DataDispatchContext.Provider
              value={{
                onCreatePost,
                onUpdatePost,
                onAddUser,
                onCreateComment,
                onToggleLike,
                onDeletePost,
              }}
            >
              {/* <Wrapper>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mypage" element={<Detail />} />
              <Route path="/modallive" element={<ModalLive />} />
            </Routes>
          </Wrapper> */}
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <RouterProvider router={router} />
              )}
            </DataDispatchContext.Provider>
          </DataStateContext.Provider>
        </ThemeProvider>
      </DarkThemeContext.Provider>
    </>
  );
}

export default App;
