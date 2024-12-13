import React from "react";
import "./Login.css";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <LoginForm />
      <p>
        Ainda não tem uma conta? <Link to="/auth/register">Registre-se</Link>
      </p>
    </div>
  );
}

export default LoginPage;
