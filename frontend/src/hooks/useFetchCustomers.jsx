import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const useFetchCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCustomers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const refetch = () => {
    fetchCustomers();
  };

  return { customers, isLoading, error, refetch };
};

export default useFetchCustomers;
