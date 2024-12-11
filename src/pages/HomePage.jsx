import React from "react";
import "./Home.css";

function HomePage() {
  return (
    <div>
      <header className="header">
        <h1>Bem-vindo ao Nosso Site</h1>
        <div className="auth-buttons">
          <button className="button">Login</button>
          <button className="button">Registro</button>
        </div>
      </header>

      <nav className="nav">
        <a href="#" className="nav-link">
          Home
        </a>
        <a href="#" className="nav-link">
          Sobre
        </a>
        <a href="#" className="nav-link">
          Serviços
        </a>
        <a href="#" className="nav-link">
          Contato
        </a>
      </nav>

      <div className="container">
        <h2>Bem-vindo ao Sistema</h2>
        <p>Gerencie suas informações de maneira rápida e segura.</p>
        <div className="features">
          <div className="feature-card">
            <h3>Contas</h3>
            <p>Gerencie suas contas bancárias.</p>
          </div>
          <div className="feature-card">
            <h3>Cartões</h3>
            <p>Controle seus cartões de crédito e débito.</p>
          </div>
          <div className="feature-card">
            <h3>Transações</h3>
            <p>Acompanhe todas as suas movimentações.</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Nosso Site. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default HomePage;
