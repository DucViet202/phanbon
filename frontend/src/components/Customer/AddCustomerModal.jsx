import axios from "axios";
import React, { useState } from "react";

const AddCustomerModal = ({ onClose, onAddSuccess }) => {
  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    userEmail: "",
    userAddress: "",
    status: "active",
    listSaleinvoice: [],
  });
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_URL}/user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Thêm khách hàng thành công");
        onAddSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Lỗi khi thêm khách hàng:", error);
      alert("Có lỗi xảy ra khi thêm khách hàng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">Thêm khách hàng mới</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="tel"
                value={formData.userPhone}
                onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
              <textarea
                value={formData.userAddress}
                onChange={(e) => setFormData({ ...formData, userAddress: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                rows="3"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              Thêm khách hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
