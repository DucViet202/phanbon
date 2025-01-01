import axios from "axios";
import React, { useState } from "react";

const EditPayDebtModal = ({ debt, onClose }) => {
  const [formData, setFormData] = useState({
    ...debt,
  });
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `${import.meta.env.VITE_LOCAL_API_URL}/payable/${debt._id}/update`,
      {
        status: formData.status,
        paidAmount: parseInt(formData.paidAmount),
        amountOwed: parseInt(formData.amountOwed),
        payExtra: parseInt(formData.payExtra),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      alert("Chỉnh sửa thành công");
      window.location.reload();
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">
            Chỉnh sửa khách hàng
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Số tiền đã trả</label>
              <input
                type="number"
                value={formData.paidAmount}
                onChange={(e) => {
                  setFormData({ ...formData, paidAmount: e.target.value });
                }}
              />
            </div>
            <div>
              <label>Số tiền còn nợ</label>
              <input
                type="number"
                value={formData.amountOwed}
                onChange={(e) => {
                  setFormData({ ...formData, amountOwed: e.target.value });
                }}
              />
            </div>
            <div>
              <label>Trả thêm</label>
              <input
                type="number"
                value={formData.payExtra}
                onChange={(e) => {
                  setFormData({ ...formData, payExtra: e.target.value });
                }}
              />
            </div>
            <div>
              <label>Tình trạng</label>
              <select
                defaultValue={formData.status}
                value={formData.status}
                onChange={(e) => {
                  setFormData({ ...formData, status: e.target.value });
                }}
              >
                <option value="prepay">Trả trước</option>
                <option value="payed">Đã trả</option>
              </select>
            </div>
            <button type="submit">Chỉnh sửa</button>
          </form>
          <button type="button" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPayDebtModal;
