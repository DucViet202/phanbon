import React, { useState } from "react";
import axios from "axios";

const EditReceiveDebtModal = ({ debt, onClose }) => {
  const [formData, setFormData] = useState({
    paymentTerm: debt.paymentTerm,
    paid: debt.paid,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${import.meta.env.VITE_LOCAL_API_URL}/receivable/${debt._id}`,
        {
          paymentTerm: formData.paymentTerm,
          paid: formData.paid,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Chỉnh sửa công nợ thành công");
        onClose();
        window.location.reload(); // Tải lại trang để cập nhật dữ liệu
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật công nợ:", error);
      setError("Có lỗi xảy ra khi cập nhật công nợ. Vui lòng thử lại.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa công nợ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentTerm">
              Hạn trả (ngày)
            </label>
            <select
              id="paymentTerm"
              name="paymentTerm"
              value={formData.paymentTerm}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="30 days">30 ngày</option>
              <option value="60 days">60 ngày</option>
              <option value="90 days">90 ngày</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paid">
              Số tiền đã trả
            </label>
            <input
              type="number"
              id="paid"
              name="paid"
              value={formData.paid}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReceiveDebtModal;
