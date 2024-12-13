import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rg, setRg] = useState("");
  const [gender, setGender] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!name) {
      validationErrors.name = "Name is required";
    }
    if (!document) {
      validationErrors.document = "Document is required";
    }
    if (document.length !== 11 && document.length !== 14) {
      validationErrors.document = "Document must be 11 or 14 characters";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (!rg) {
      validationErrors.rg = "RG is required";
    }
    try {
      const response = await axios.post(
        `${reactBackendUrl}
            /auth/register`,
        {
          name,
          document,
          email,
          password,
          rg,
          gender,
          userAvatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const token = response.data?.data.access_token;
      localStorage.setItem("token", token);
      navigate("/auth/login");
    } catch (error) {
      setErrors(validationErrors);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="document">Document:</label>
        <input
          type="text"
          id="document"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
        />
        {errors.document && <span className="error">{errors.document}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="rg">RG:</label>
        <input
          type="text"
          id="rg"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
        />
        {errors.rg && <span className="error">{errors.rg}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="userAvatar">User Avatar:</label>
        <input
          type="text"
          id="userAvatar"
          value={userAvatar}
          onChange={(e) => setUserAvatar(e.target.value)}
        />
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
