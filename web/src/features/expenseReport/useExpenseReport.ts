import { useCallback, useEffect, useState } from "react";
import moment from "moment";

import {
  formatDate,
  getSelectedProvider,
  sortTransactionsInDateOrder,
} from "./utils/utility";
import useProviders, { Provider } from "../../api/hooks/useProviders";
import useTransactions, { Transaction } from "../../api/hooks/useTransactions";

type DateRange = {
  earliestStartDate: string;
  furthestEndDate: string;
} | null;

interface UseExpenseReport {
  providers: Provider[];
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  selectedTransaction: Transaction | null;
  handleTransactionClick: (transaction: Transaction) => void;
  handleCloseModal: () => void;
  allTransactionsForSelectedProvider: Transaction[];
  averageMonthlySpend: number;
  startDate?: string;
  endDate?: string;
  selectedProvider: Provider | null | undefined;
}

const useExpenseReport = (): UseExpenseReport => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getProviders } = useProviders();
  const { getTransactions } = useTransactions();

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleTransactionClick = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTransaction(null);
  }, []);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providerData = await getProviders();
        setProviders(providerData);
      } catch (err) {
        setError("Failed to fetch providers");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, [getProviders]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionData = await getTransactions();
        setTransactions(sortTransactionsInDateOrder(transactionData));
      } catch (err) {
        setError("Failed to fetch transactions");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [getTransactions]);

  const selectedProvider = getSelectedProvider(providers, selectedTransaction);

  const getAllTransactionsForSelectedProvider = () => {
    if (!transactions.length || !selectedProvider) {
      return [];
    }

    const transactionsData = transactions.filter((transaction) =>
      transaction.description.includes(selectedProvider.transactionSearchQuery)
    );

    return sortTransactionsInDateOrder(transactionsData);
  };

  const allTransactionsForSelectedProvider =
    getAllTransactionsForSelectedProvider();

  const getTransactionMonthlySpendData = () => {
    if (!allTransactionsForSelectedProvider.length) {
      return;
    }

    const getKey = (date: string) => {
      const fullDate = moment(date);
      const month = fullDate.format("MMMM");
      const year = fullDate.format("YYYY");

      return `${month}${year}`;
    };

    const monthlySpendData: { [key: string]: number } = {};

    allTransactionsForSelectedProvider.forEach((transaction) => {
      const key = getKey(transaction.bookedDateTime);
      const transactionAmount = +transaction.amount.value;

      if (!monthlySpendData[key]) {
        monthlySpendData[key] = transactionAmount;
      } else {
        monthlySpendData[key] += transactionAmount;
      }
    });

    return monthlySpendData;
  };

  const monthlySpendData = getTransactionMonthlySpendData();

  console.log("monthly spend data: ", monthlySpendData);

  const getAverageMonthlySpend = () => {
    if (!monthlySpendData) {
      return 0;
    }

    const numberOfMonths = Object.keys(monthlySpendData).length;

    if (numberOfMonths === 0) {
      return 0;
    }

    const totalMonthlySpend = Object.values(monthlySpendData).reduce(
      (acc, monthlyAmount) => acc + monthlyAmount,
      0
    );

    return +(totalMonthlySpend / numberOfMonths).toFixed(2);
  };

  const averageMonthlySpend = getAverageMonthlySpend();

  const findDateRange = (): DateRange => {
    if (transactions.length === 0 || !selectedTransaction) {
      return null;
    }

    let earliestStartDate = selectedTransaction.bookedDateTime;
    let furthestEndDate = selectedTransaction.bookedDateTime;

    allTransactionsForSelectedProvider.forEach((transaction) => {
      const currentDate = transaction.bookedDateTime;

      if (currentDate < earliestStartDate) {
        earliestStartDate = currentDate;
      }

      if (currentDate > furthestEndDate) {
        furthestEndDate = currentDate;
      }
    });

    return {
      earliestStartDate: formatDate(earliestStartDate),
      furthestEndDate: formatDate(furthestEndDate),
    };
  };

  const dateRange = findDateRange();

  const startDate = dateRange?.earliestStartDate;
  const endDate = dateRange?.furthestEndDate;

  return {
    providers,
    transactions,
    isLoading,
    error,
    selectedTransaction,
    handleTransactionClick,
    handleCloseModal,
    averageMonthlySpend,
    startDate,
    endDate,
    allTransactionsForSelectedProvider,
    selectedProvider,
  };
};

export default useExpenseReport;
