import { useCallback } from "react";
import axios from "axios";

export type Transaction = {
  id: string;
  dates: {
    value: string;
    booked: string;
  };
  types: {
    type: string;
  };
  amount: {
    value: string;
    currencyCode: string;
  };
  status: string;
  accountId: string;
  description: string;
  bookedDateTime: string;
  merchantInformation: object;
};

interface UseTransactions {
  getTransactions: () => Promise<Transaction[]>;
}

const useTransactions = (): UseTransactions => {
  const getTransactions = useCallback(async (): Promise<Transaction[]> => {
    const { data } = await axios.get<Transaction[]>(
      "http://localhost:3000/transactions"
    );
    return data;
  }, []);

  return {
    getTransactions,
  };
};

export default useTransactions;
