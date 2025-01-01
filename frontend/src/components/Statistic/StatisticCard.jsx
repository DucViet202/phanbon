import React, { useState } from "react";
import StatisticDetailModal from "./StatisticDetailModal";
import { format } from 'date-fns';

const StatisticCard = ({ statistic }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="p-4 hover:bg-gray-50 transition-colors duration-150">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-7 gap-4 items-center">
          <div className="text-sm text-center">{format(new Date(statistic.date), 'dd/MM/yyyy')}</div>
          <div className="text-sm text-center">{statistic.totalSales.toLocaleString()} đ</div>
          <div className="text-sm text-center">{statistic.totalPurchases.toLocaleString()} đ</div>
          <div className="text-sm text-center">{statistic.totalRevenue.toLocaleString()} đ</div>
          <div className="text-sm text-center">{statistic.totalOrders}</div>
          <div className="text-sm text-center">{statistic.averageOrderValue.toLocaleString()} đ</div>
          <div className="flex justify-center">
            <button
              onClick={openModal}
              className="w-auto bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] text-white px-3 py-1 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out font-semibold transform hover:scale-105 text-sm"
            >
              Chi tiết
            </button>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Ngày:</span>
            <span>{format(new Date(statistic.date), 'dd/MM/yyyy')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tổng doanh thu:</span>
            <span>{statistic.totalSales.toLocaleString()} đ</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tổng nhập hàng:</span>
            <span>{statistic.totalPurchases.toLocaleString()} đ</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Lợi nhuận:</span>
            <span>{statistic.totalRevenue.toLocaleString()} đ</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Số đơn hàng:</span>
            <span>{statistic.totalOrders}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Giá trị TB:</span>
            <span>{statistic.averageOrderValue.toLocaleString()} đ</span>
          </div>
          <div className="mt-2">
            <button
              onClick={openModal}
              className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] text-white px-3 py-2 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out font-semibold transform hover:scale-105 text-sm"
            >
              Chi tiết
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <StatisticDetailModal
          products={statistic.productReports}
          onClose={closeModal}
          date={statistic.date}
        />
      )}
    </>
  );
};

export default StatisticCard;
