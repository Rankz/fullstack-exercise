import moment from "moment";
import { Provider } from "../../../api/hooks/useProviders";
import { Transaction } from "../../../api/hooks/useTransactions";

export const getSelectedProvider = (
  providers: Provider[],
  transaction?: Transaction | null
) => {
  if (!providers.length || !transaction) {
    return null;
  }

  return providers.find((provider) =>
    transaction?.description.includes(provider.transactionSearchQuery)
  );
};

export const formatDate = (date: string) => {
  return moment(date).format("DD MMMM YYYY");
};

export const sortTransactionsInDateOrder = (array: Transaction[]) => {
  return array.sort((transaction1, transaction2) => {
    const date1 = new Date(transaction1.bookedDateTime);
    const date2 = new Date(transaction2.bookedDateTime);

    if (date1 > date2) {
      return -1;
    } else if (date1 < date2) {
      return 1;
    } else {
      return 0;
    }
  });
};
