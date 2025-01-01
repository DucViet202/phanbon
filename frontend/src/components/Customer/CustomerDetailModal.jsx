import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const CustomerDetailModal = ({ customerId, onClose }) => {
  const [customerDetail, setCustomerDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      if (!customerId) {
        setError("Không tìm thấy ID khách hàng. Vui lòng thử lại.");
        setLoading(false);
        return;
      }

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_URL}/user/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCustomerDetail(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết khách hàng:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.");
        setLoading(false);
      }
    };

    fetchCustomerDetail();
  }, [customerId]);

  if (loading) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">Đang tải...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold text-red-600">{error}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Đóng
        </button>
      </div>
    </div>
  );

  if (!customerDetail) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">Chi tiết khách hàng</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Mã khách hàng</p>
              <p className="text-lg font-semibold">{customerDetail.userId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tên khách hàng</p>
              <p className="text-lg font-semibold">{customerDetail.userName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Số điện thoại</p>
              <p className="text-lg font-semibold">{customerDetail.userPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold">{customerDetail.userEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Địa chỉ</p>
              <p className="text-lg font-semibold">{customerDetail.userAddress || "Không có thông tin"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Trạng thái</p>
              <p className="text-lg font-semibold">{customerDetail.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ngày tạo</p>
              <p className="text-lg font-semibold">
                {format(new Date(customerDetail.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cập nhật lần cuối</p>
              <p className="text-lg font-semibold">
                {format(new Date(customerDetail.updatedAt), "dd/MM/yyyy HH:mm", { locale: vi })}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Danh sách hóa đơn</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Mã hóa đơn</th>
                  <th className="p-2 text-right">Tổng tiền</th>
                  <th className="p-2 text-left">Chi tiết sản phẩm</th>
                </tr>
              </thead>
              <tbody>
                {customerDetail.listSaleinvoice.map((invoice) => (
                  <tr key={invoice._id} className="border-b">
                    <td className="p-2">{invoice.salesInvoiceId}</td>
                    <td className="p-2 text-right">{invoice.sumBill.toLocaleString()} đ</td>
                    <td className="p-2">
                      <ul>
                        {invoice.saleProduct.map((product, index) => (
                          <li key={index}>
                            Mã SP: {product.productId}, SL: {product.quantityProduct}, 
                            Thành tiền: {parseInt(product.sumPrice).toLocaleString()} đ
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-200"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;
