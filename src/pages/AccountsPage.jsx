import React, { useEffect, useState } from "react";
import api from "../services/api"; // Configuração do Axios
import AccountsList from "../components/AccountsList";
import "./Accounts.css";
import AccountsForm from "../components/AccountsForm";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
      }

      const response = await api.get("/accounts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(response.data);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedAccount(null);
    fetchAccounts();
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setShowForm(true);
  };

  const handleDelete = async (accountId) => {
    try {
      await api.delete(`/accounts/${accountId}`);
      setAccounts(accounts.filter((account) => account.id !== accountId));
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    }
  };

  return (
    <div className="accounts-container">
      <NavBar />
      <h2>Gerenciamento de Contas</h2>
      {showForm ? (
        <AccountsForm
          accounts={selectedAccount}
          onSuccess={handleFormSuccess}
        />
      ) : (
        <>
          <AccountsList
            accounts={accounts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <button onClick={() => setShowForm(true)} className="button">
            Nova Conta
          </button>
        </>
      )}
    </div>
  );
};

export default AccountsPage;
