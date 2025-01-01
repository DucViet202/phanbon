import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import axios from 'axios';

const ReceiveDebtModal = ({ receivableId, onClose }) => {
  const [debtDetail, setDebtDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDebtDetail = async () => {
      if (!receivableId) {
        setError("Không tìm thấy ID công nợ. Vui lòng thử lại.");
        setLoading(false);
        return;
      }

      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_URL}/receivable/${receivableId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setDebtDetail(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết công nợ:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.");
        setLoading(false);
      }
    };

    fetchDebtDetail();
  }, [receivableId]);

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

  if (!debtDetail) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
        <div className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">Chi tiết công nợ nhận</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Mã công nợ</p>
              <p className="text-lg font-semibold">{debtDetail.ReceivableId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mã hóa đơn</p>
              <p className="text-lg font-semibold">{debtDetail.salesInvoiceId?.salesInvoiceId || 'Không có thông tin'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Khách hàng</p>
              <p className="text-lg font-semibold">{debtDetail.userId?.userName || 'Không có thông tin'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Số điện thoại</p>
              <p className="text-lg font-semibold">{debtDetail.userId?.userPhone || 'Không có thông tin'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng tiền</p>
              <p className="text-lg font-semibold text-green-600">
                {debtDetail.salesInvoiceId?.sumBill
                  ? parseInt(debtDetail.salesInvoiceId.sumBill).toLocaleString()
                  : 'Không có thông tin'} đ
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Đã trả</p>
              <p className="text-lg font-semibold text-blue-600">
                {debtDetail.paid ? parseInt(debtDetail.paid).toLocaleString() : '0'} đ
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Còn nợ</p>
              <p className="text-lg font-semibold text-red-600">
                {debtDetail.debt ? parseInt(debtDetail.debt).toLocaleString() : '0'} đ
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Hạn thanh toán</p>
              <p className="text-lg font-semibold">
                {debtDetail.dueDate
                  ? format(new Date(debtDetail.dueDate), 'dd/MM/yyyy', { locale: vi })
                  : 'Không có thông tin'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Điều khoản thanh toán</p>
              <p className="text-lg font-semibold">{debtDetail.paymentTerm || 'Không có thông tin'}</p>
            </div>
          </div>
          {debtDetail.salesInvoiceId?.saleProduct && debtDetail.salesInvoiceId.saleProduct.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Sản phẩm</h3>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Mã sản phẩm</th>
                    <th className="p-2 text-right">Số lượng</th>
                    <th className="p-2 text-right">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {debtDetail.salesInvoiceId.saleProduct.map((product, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{product.productId}</td>
                      <td className="p-2 text-right">{product.quantityProduct}</td>
                      <td className="p-2 text-right">
                        {parseInt(product.sumPrice).toLocaleString()} đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

export default ReceiveDebtModal;
