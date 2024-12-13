import React from "react";
import PropTypes from "prop-types";

const AccountsList = ({ accounts }) => {
  if (!accounts || accounts.length === 0) {
    return <p>Não há contas para exibir.</p>;
  }

  return (
    <ul className="accounts-list">
      {accounts.map((account) => (
        <li key={account.id} className="account-item">
          <h3>Conta: {account.accountNumber}</h3>
          <p>Agência: {account.agency}</p>
          <p>Saldo: R${account.balance}</p>
          <p>Tipo: {account.type}</p>
        </li>
      ))}
    </ul>
  );
};

// Validação de Props
AccountsList.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      accountNumber: PropTypes.string.isRequired,
      agency: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AccountsList;