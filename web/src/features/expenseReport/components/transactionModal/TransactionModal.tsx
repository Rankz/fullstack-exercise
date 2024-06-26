import React from "react";

import "../../../../App.css";
import { Transaction } from "../../../../api/hooks/useTransactions";
import { Provider } from "../../../../api/hooks/useProviders";
import { formatDate } from "../../utils/utility";

interface TransactionModalProps {
  transaction: Transaction;
  onClose: () => void;
  allProviderTransactions: Transaction[];
  averageMonthlySpend: number;
  startDate?: string;
  endDate?: string;
  selectedProvider: Provider | null | undefined;
  transactionAmount: number;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  onClose,
  selectedProvider,
  transactionAmount,
  averageMonthlySpend,
  startDate,
  endDate,
  allProviderTransactions,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="modal-header">
          <img src={selectedProvider?.logo} alt="Logo" className="logo" />
          <h2>{selectedProvider?.name}</h2>
        </div>
        <p>
          <strong>Transaction Amount:</strong> £{transactionAmount}
        </p>
        <p>
          <strong>Average Monthly Spend:</strong> £{averageMonthlySpend}
        </p>
        <div className="history">
          <h3>History</h3>
          <p>
            <strong>Start Date:</strong> {startDate}
          </p>
          <p>
            <strong>End Date:</strong> {endDate}
          </p>
          <h4>Transactions</h4>
          <div className="history-list">
            <ul className="no-bullets">
              {allProviderTransactions.map((transactions) => (
                <li key={transactions.id}>
                  {formatDate(transactions.bookedDateTime)} -
                  <strong> £{transactions.amount.value}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
