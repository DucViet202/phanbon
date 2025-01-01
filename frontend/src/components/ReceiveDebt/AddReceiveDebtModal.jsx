import React, { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

const AddReceiveDebtModal = ({ onClose, onAddSuccess }) => {
  const [formData, setFormData] = useState({
    userId: "",
    paymentTerm: "30 days",
    paid: 0,
    salesInvoiceId: "",
  });
  const [error, setError] = useState("");
  const [salesInvoices, setSalesInvoices] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchSalesInvoices = debounce(async (searchTerm) => {
    if (!searchTerm) {
      setSalesInvoices([]);
      return;
    }
    setIsSearching(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_URL}/salesinvoice/search/${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSalesInvoices(response.data.saleinvoices);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm hóa đơn:", error);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "salesInvoiceId") {
      searchSalesInvoices(value);
    }
  };

  const handleSelectInvoice = (invoice) => {
    setFormData({
      ...formData,
      salesInvoiceId: invoice._id,
      userId: invoice.userId ? invoice.userId._id : "",
    });
    setSalesInvoices([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_URL}/receivable/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        onAddSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Lỗi khi thêm công nợ:", error);
      setError("Có lỗi xảy ra khi thêm công nợ. Vui lòng thử lại.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">Thêm công nợ mới</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="salesInvoiceId">
                Mã hóa đơn bán hàng
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="salesInvoiceId"
                  name="salesInvoiceId"
                  value={formData.salesInvoiceId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  placeholder="Nhập mã hóa đơn bán hàng"
                />
                {isSearching && <div className="absolute right-3 top-2">Đang tìm...</div>}
                {salesInvoices.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {salesInvoices.map((invoice) => (
                      <li
                        key={invoice._id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectInvoice(invoice)}
                      >
                        {invoice.salesInvoiceId}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="userId">
                ID Khách hàng
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent bg-gray-100"
                placeholder="ID Khách hàng"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="paymentTerm">
                Điều khoản thanh toán
              </label>
              <select
                id="paymentTerm"
                name="paymentTerm"
                value={formData.paymentTerm}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              >
                <option value="30 days">30 ngày</option>
                <option value="60 days">60 ngày</option>
                <option value="90 days">90 ngày</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="paid">
                Số tiền đã trả
              </label>
              <input
                type="number"
                id="paid"
                name="paid"
                value={formData.paid}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                placeholder="Số tiền đã trả"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 font-semibold transition-all duration-300 ease-in-out"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out font-semibold transform hover:scale-105"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReceiveDebtModal;