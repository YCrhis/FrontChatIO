import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import { useEffect } from "react";

const MainRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      navigate("/chat");
      return;
    } else {
      navigate("/");
    }
  }, [localStorage]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default MainRouter;
