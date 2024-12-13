import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reactBackendUrl } from "../env/envoriment";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);

    try {
      const response = await axios.post(`${reactBackendUrl}/auth/login`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const token = response.data?.data?.access_token;
        localStorage.setItem("token", token);
        navigate("/accounts");
      } else {
        setErrors({
          email: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error(error);
      setErrors({
        email: "Login failed",
      });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="button">
        Entrar
      </button>
      {errors.email && <p className="error">{errors.email}</p>}
      {errors.password && <p className="error">{errors.password}</p>}
    </form>
  );
};

export default LoginForm;
