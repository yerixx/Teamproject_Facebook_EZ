import React, { useContext } from "react";
import Header from "../components/Header";
import { DataStateContext } from "../App";

const Main = () => {
  const data = useContext(DataStateContext);
  const { users, posts } = data;
  console.log(data);

  return (
    <div>
      <Header />
      <h1>
        {users[0]?.name.firstName}
        {users[0]?.name.lastName}
      </h1>
      <h1>{posts[0]?.content}</h1>
      main
    </div>
  );
};

export default Main;
