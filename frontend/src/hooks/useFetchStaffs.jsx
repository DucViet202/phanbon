import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useFetchStaffs = () => {
  const [staffs, setStaffs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = window.localStorage.getItem("accessToken");

  const fetchStaffs = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_URL}/admin`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setStaffs(result.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs]);

  const refetch = () => {
    fetchStaffs();
  };

  return { staffs, isLoading, error, refetch };
};

export default useFetchStaffs;
