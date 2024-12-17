import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AccountsForm.css";

const AccountsForm = ({ accounts, onSuccess }) => {
  const [formData, setFormData] = useState({
    agency: "",
    balance: 0,
    type: "CHECKING" || "SAVING",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (accounts) {
      setFormData(accounts);
    }
  }, [accounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (accounts) {
        await api.patch(`/accounts/${accounts.id}`, formData);
        return {
          message: "Conta atualizada com sucesso",
        };
      } else {
        const { accountNumber, balance, ...rest } = formData;
        const formattedBalance = parseFloat(balance);
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        await api.post("/accounts", { ...rest, balance: formattedBalance }, { headers });
        console.log("Conta criada com sucesso");
      }
      return onSuccess();
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="account-form">
      <div>
        <label htmlFor="agency">Agência:</label>
        <input
          type="text"
          id="agency"
          name="agency"
          value={formData.agency}
          onChange={handleChange}
        />
        {errors.agency && <p>{errors.agency}</p>}
      </div>
      <div>
        <label htmlFor="balance">Saldo:</label>
        <input
          type="number"
          id="balance"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
        />
        {errors.balance && <p>{errors.balance}</p>}
      </div>
      <div>
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="CHECKING">CHECKING</option>
          <option value="SAVING">SAVING</option>
        </select>
        {errors.type && <p>{errors.type}</p>}
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

AccountForm.propTypes = {
  account: PropTypes.object, // Para edição
  onSuccess: PropTypes.func.isRequired, // Chamar ao concluir
};

export default AccountsForm;
