import React, { useState } from "react";
import TransactionList from "../components/TransactionsList";
import TransactionForm from "../components/TransactionForm";
import "./Transactions.css";

const TransactionPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleSuccess = () => {
    setShowForm(false);
    setCurrentTransaction(null);
  };

  const handleEdit = (transaction) => {
    setCurrentTransaction(transaction);
    setShowForm(true);
  };

  return (
    <div>
      <h1>Gerenciamento de Transações</h1>

      {showForm && (
        <TransactionForm
          transaction={currentTransaction}
          onSuccess={handleSuccess}
        />
      )}
      <TransactionList onEdit={handleEdit} />
      <button className="button-save" onClick={() => setShowForm(true)}>
        Nova Transação
      </button>
      <button className="button-secondary" onClick={() => setShowForm(false)}>
        Cancelar
      </button>
    </div>
  );
};

export default TransactionPage;
