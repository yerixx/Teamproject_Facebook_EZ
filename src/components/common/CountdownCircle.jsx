// CountdownCircle.js
import React, { useEffect, useState } from "react";
import "./CountdownCircle.css"; // CSS 파일 import

const CountdownCircle = () => {
  const [count, setCount] = useState(7);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 애니메이션 시작
    setIsAnimating(true);

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) return prevCount - 1;
        clearInterval(interval);
        return prevCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`circle ${isAnimating ? "animate" : ""}`}>
      <span className="count">{count}</span>
    </div>
  );
};

export default CountdownCircle;
