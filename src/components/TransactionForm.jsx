import React, { useState } from "react";
import axios from "axios";
import { reactBackendUrl } from "../env/envoriment";

const TransactionForm = ({ transactions = {}, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    accountId: 0,
    type: "DEPOSIT" || "WITHDRAWAL" || "TRANSFER" || "PAYMENT",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (transactions.id) {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token not found");
          return;
        }
        await axios.put(
          `${reactBackendUrl}/transactions/${transactions.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token not found");
          return;
        }
        const { amount, ...rest } = formData;
        const formattedAmount = parseFloat(amount);
        const accountId = +formData.accountId;
        await axios.post(
          `${reactBackendUrl}/transactions`,
          {
            ...rest,
            amount: parseFloat(formattedAmount),
            accountId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{transactions.id ? "Editar Transação" : "Nova Transação"}</h3>
      <label>
        Conta:
        <input
          type="number"
          name="accountId"
          value={formData.accountId}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Tipo:
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        >
          <option value="DEPOSIT">Depósito</option>
          <option value="WITHDRAWAL">Retirada</option>
          <option value="TRANSFER">Transferência</option>
          <option value="PAYMENT">Pagamento</option>
        </select>
      </label>
      <label>
        Valor:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Descrição:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      {errors.message && <p>{errors.message}</p>}
      <button type="submit" className="button-new-transaction">
        Salvar
      </button>
    </form>
  );
};

export default TransactionForm;
