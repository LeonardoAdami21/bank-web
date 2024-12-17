import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
  }

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login");
  }, [navigate]);

  return (
    <div>
      <h1>Deslogado</h1>
    </div>
  );
}

export default Logout;
