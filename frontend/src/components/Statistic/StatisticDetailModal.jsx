import React from "react";
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

const StatisticDetailModal = ({ products, onClose, date }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Chi tiết báo cáo");
    XLSX.writeFile(workbook, `chi_tiet_bao_cao_${format(new Date(date), 'dd-MM-yyyy')}.xlsx`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] p-4 md:p-6 rounded-t-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-white">Chi tiết báo cáo ngày {format(new Date(date), 'dd/MM/yyyy')}</h2>
        </div>
        <div className="p-4 md:p-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên SP</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng doanh thu</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng nhập hàng</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lợi nhận</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số ĐH</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị TB</th>
                <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL bán</th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">{product.productName}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">{product.totalSales.toLocaleString()} đ</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">{product.totalPurchases.toLocaleString()} đ</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">{product.totalRevenue.toLocaleString()} đ</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">{product.totalOrders}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">{product.averageOrderValue.toLocaleString()} đ</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">{product.quantitySold}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 md:mt-6 p-4 md:p-6 flex justify-end space-x-4">
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            Xuất Excel
          </button>
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
  );
};

export default StatisticDetailModal;