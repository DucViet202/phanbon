import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useFetchRoles = () => {
  const [roles, setRoles] = useState();
  const accessToken = window.localStorage.getItem("accessToken");

  const fetchRoles = useCallback(async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_URL}/role`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setRoles(result.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách vai trò:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const addRole = useCallback(async (newRole) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_LOCAL_API_URL}/role`,
        newRole,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await fetchRoles(); // Cập nhật danh sách vai trò sau khi thêm mới
    } catch (error) {
      console.error("Lỗi khi thêm vai trò mới:", error);
      throw error;
    }
  }, [accessToken, fetchRoles]);

  const updateRole = useCallback(async (updatedRole) => {
    try {
      const url = `${import.meta.env.VITE_LOCAL_API_URL}/role`;

      const response = await axios.put(
        url,
        updatedRole,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      await fetchRoles();
    } catch (error) {

      throw error;
    }
  }, [accessToken, fetchRoles]);

  return { roles, fetchRoles, addRole, updateRole };
};

export default useFetchRoles;