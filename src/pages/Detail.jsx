import React from "react";
import MypageCont from "../components/detail/MypageCont";
import MypageUpload from "../components/detail/MypageUpload"
import MypageCover from "../components/detail/MypageCover";

const Detail = () => {
  return <div>
    <MypageCover/>
    <MypageUpload placeholder="무슨생각을 하고 계신가요?" />
    <MypageCont />
    <MypageUpload />
  </div>;
};

export default Detail;
