import React from "react";

import TransactionModal from "./components/transactionModal/TransactionModal";
import TransactionList from "./components/transactionList/TransactionList";
import useExpenseReport from "./useExpenseReport";
import "../../index.css";

const ExpenseReport: React.FC = () => {
  const {
    transactions,
    selectedTransaction,
    handleTransactionClick,
    handleCloseModal,
    averageMonthlySpend,
    startDate,
    endDate,
    allTransactionsForSelectedProvider,
    selectedProvider,
    providers,
  } = useExpenseReport();

  return (
    <div className="expense-report">
      <h1>All Transactions</h1>
      <TransactionList
        onTransactionClick={handleTransactionClick}
        transactions={transactions}
        providers={providers}
      />
      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
          allProviderTransactions={allTransactionsForSelectedProvider}
          averageMonthlySpend={averageMonthlySpend}
          startDate={startDate}
          endDate={endDate}
          selectedProvider={selectedProvider}
          transactionAmount={
            selectedTransaction ? +selectedTransaction.amount.value : 0
          }
        />
      )}
    </div>
  );
};

export default ExpenseReport;
