import React, { useEffect, useState } from "react";
import axios from "axios";
import { reactBackendUrl } from "../env/envoriment";
import "./TransactionList.css";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token not found");
          return;
        }
        const response = await axios.get(`${reactBackendUrl}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Backend URL
        const transactions = response.data?.data || [];
        setTransactions(transactions);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
        return;
      }
      await axios.delete(`${reactBackendUrl}/transactions/${id}`);
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id),
      );
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  return (
    <div className="transactions-container">
      <h2>Lista de Transações</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="transactions-list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <h3 className="transaction-type">{transaction.type}</h3>
              <p className="transaction-account">{transaction.accountId}</p>
              <p className="transaction-amount">{transaction.amount}</p>
              <p className="transaction-description">
                {transaction.description}
              </p>
              <button
                className="button delete"
                onClick={() => deleteTransaction(transaction.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
