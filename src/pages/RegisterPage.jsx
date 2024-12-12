import React from "react";
import "./register.css";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="register-container">
      <h2>Registre-se</h2>
      <RegisterForm />
      <p>
        Ja possui uma conta? <Link to="/auth/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
