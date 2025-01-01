import React, { useState } from "react";
import * as XLSX from 'xlsx';
import useFetchDashboard from "../../hooks/useFetchdashboard";
import StatisticCard from "../../components/Statistic/StatisticCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Statistic = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const formatDate = (date) => format(date, 'yyyy-MM-dd');

  const {
    data: revenueData,
    loading,
    error,
    refetch,
  } = useFetchDashboard(formatDate(startDate), formatDate(endDate));

  const handleSearch = () => {
    refetch();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(revenueData.reports);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Báo cáo doanh thu");
    XLSX.writeFile(workbook, "bao_cao_doanh_thu.xlsx");
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">Đã xảy ra lỗi: {error}</div>;
  if (!revenueData) return <div className="text-center py-8">Không có dữ liệu</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] mb-4 md:mb-0">
            BÁO CÁO DOANH THU
          </h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="p-2 border border-gray-300 rounded-md"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleSearch}
              className="w-full md:w-auto bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out font-semibold transform hover:scale-105"
            >
              Tìm kiếm
            </button>
            <button
              onClick={exportToExcel}
              className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out font-semibold transform hover:scale-105"
            >
              Xuất Excel
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-hidden px-4 md:px-6">
        <div className="bg-white shadow-md rounded-lg h-full flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 sticky top-0 z-10">
            <div className="md:col-span-1 text-center">Ngày</div>
            <div className="md:col-span-1 text-center">Tổng doanh thu</div>
            <div className="md:col-span-1 text-center">Tổng nhập hàng</div>
            <div className="md:col-span-1 text-center">Lợi nhuận</div>
            <div className="md:col-span-1 text-center">Số đơn hàng</div>
            <div className="md:col-span-1 text-center">Giá trị TB</div>
            <div className="md:col-span-1 text-center">Thao tác</div>
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="divide-y divide-gray-200">
              {revenueData.reports.map((report, index) => (
                <StatisticCard key={index} statistic={report} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hiển thị tổng kết */}
      <div className="mt-6 px-4 md:px-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] p-4 md:p-6">
            <h2 className="text-2xl font-bold text-white">Tổng kết</h2>
          </div>
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 shadow">
                <p className="text-sm font-semibold text-gray-600 mb-2">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-blue-600">{revenueData.summary.totalSales.toLocaleString()} đ</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 shadow">
                <p className="text-sm font-semibold text-gray-600 mb-2">Tổng nhập hàng</p>
                <p className="text-2xl font-bold text-red-600">{revenueData.summary.totalPurchases.toLocaleString()} đ</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 shadow">
                <p className="text-sm font-semibold text-gray-600 mb-2">Tổng lợi nhuận</p>
                <p className="text-2xl font-bold text-[#1E3A8A]">{revenueData.summary.totalRevenue.toLocaleString()} đ</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4 shadow">
                <p className="text-sm font-semibold text-gray-600 mb-2">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-purple-600">{revenueData.summary.totalOrders}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 shadow">
                <p className="text-sm font-semibold text-gray-600 mb-2">Giá trị đơn hàng TB</p>
                <p className="text-2xl font-bold text-orange-600">{revenueData.summary.averageOrderValue.toLocaleString()} đ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
