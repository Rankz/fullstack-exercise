import React from "react";
import "../../../../App.css";

interface TransactionItemProps {
  providerLogo?: string;
  transactionAmount: number;
  providerName?: string;
  onClick: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transactionAmount,
  onClick,
  providerName,
  providerLogo,
}) => {
  return (
    <div className="transaction-item" onClick={onClick}>
      <img src={providerLogo} alt="" />
      <div className="transaction-info">
        <p className="provider">{providerName}</p>
        <strong>
          <p className="amount">£{transactionAmount.toFixed(2)}</p>
        </strong>
      </div>
    </div>
  );
};

export default TransactionItem;
