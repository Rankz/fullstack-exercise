import React, { useState } from "react";
import TransactionItem from "../transactionItem/TransactionItem";
import { getSelectedProvider } from "../../utils/utility";
import "../../../../App.css";
import { Transaction } from "../../../../api/hooks/useTransactions";
import { Provider } from "../../../../api/hooks/useProviders";
import ReactPaginate from "react-paginate";

interface TransactionListProps {
  onTransactionClick: (transaction: Transaction) => void;
  transactions: Transaction[];
  providers: Provider[];
}

const TransactionList: React.FC<TransactionListProps> = ({
  onTransactionClick,
  transactions,
  providers,
}) => {
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const itemsPerPage = 20; // Items per page

  // Calculate pagination values
  const offset = currentPage * itemsPerPage;
  const currentTransactions = transactions.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="transaction-list">
      {currentTransactions.map((transaction) => {
        const selectedProvider = getSelectedProvider(providers, transaction);
        return (
          <TransactionItem
            key={transaction.id}
            providerLogo={selectedProvider?.logo}
            providerName={selectedProvider?.name}
            transactionAmount={+transaction.amount.value}
            onClick={() => onTransactionClick(transaction)}
          />
        );
      })}

      {/* Pagination component */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(transactions.length / itemsPerPage)} // Total pages
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default TransactionList;
