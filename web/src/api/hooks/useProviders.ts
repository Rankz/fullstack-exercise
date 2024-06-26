import axios from "axios";
import { useCallback } from "react";

export type Provider = {
  name: string;
  logo: string;
  transactionSearchQuery: string;
};

interface UseProviders {
  getProviders: () => Promise<Provider[]>;
}

const useProviders = (): UseProviders => {
  const getProviders = useCallback(async (): Promise<Provider[]> => {
    const { data } = await axios.get<Provider[]>(
      "http://localhost:3000/providers"
    );
    return data;
  }, []);

  return {
    getProviders,
  };
};

export default useProviders;
