import React, { useEffect, useState } from "react";
import api from "../services/api"; // Configuração do Axios
import AccountsList from "../components/AccountsList";
import "./Accounts.css";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="accounts-container">
      <h2>Minhas Contas</h2>
      {loading ? <p>Carregando...</p> : <AccountsList accounts={accounts} />}
      <div className="accounts-footer">
        <a href="/dashboard" className="button">
          Voltar
        </a>
        <a href="/new-account" className="button button-secondary">
          Nova Conta
        </a>
      </div>
    </div>
  );
};

export default AccountsPage;
