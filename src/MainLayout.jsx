import React, { useEffect } from "react";
import Sidebar from "./Componetns/Sidebar";
import Navbar from "./Componetns/Navbar";
import "../src/Styles/MainLayout.css";
import { useNavigate } from "react-router-dom";
const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (!auth) {
      navigate("/");
    }
  }, []);

  return (
    <div className="d-flex h-100" >
      <Sidebar />
      <div className="contain bg-body-secondary" >
        <Navbar />
        <div className="mainlayout-children">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
