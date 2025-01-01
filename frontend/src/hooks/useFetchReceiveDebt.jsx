import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchReceiveDebt = () => {
  const [receiveDebts, setReceiveDebts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = window.localStorage.getItem("accessToken");

  const fetchReceiveDebts = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_URL}/receivable`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setReceiveDebts(result.data.invoices);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchReceiveDebts();
  }, [fetchReceiveDebts]);

  const refetch = () => {
    fetchReceiveDebts();
  };

  return { receiveDebts, isLoading, error, refetch };
};

export default useFetchReceiveDebt;
