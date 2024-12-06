import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(""); // 상태 추가

  const handleButtonClick = (type) => {
    if (type === "word") {
      navigate("/word");navigate("/word", { state: { searchText } }); // 입력 내용 전달
    } else if (!user) {
      navigate("/login");
    } else {
      navigate(`/${type}`);
    }
  };

  return (
    <div className="homepage-container">
      <input type="text" placeholder="Search..." className="search-box" 
      value={searchText} // 상태와 연결
      onChange={(e) => setSearchText(e.target.value)} // 상태 업데이트
      />
      <div className="button-group">
        <button onClick={() => handleButtonClick("word")}>말입력</button>
        <button onClick={() => handleButtonClick("challenge")}>암기</button>
        <button onClick={() => handleButtonClick("dictionary")}>사전</button>
      </div>
    </div>
  );
};

export default HomePage;
