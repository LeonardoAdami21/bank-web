import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  return (
    <nav className="account-nav">
      <div className="profile-container">
        <img
          src="https://via.placeholder.com/40"
          alt="Perfil"
          className="profile-pic"
        />
        <span className="username">Olá, Usuário</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/transactions">Transações</Link>
        <Link to="/accounts">Contas</Link>
        <Link to="/auth/logout">Sair</Link>
      </div>
    </nav>
  );
};

export default NavBar;
