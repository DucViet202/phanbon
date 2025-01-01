import React, { useState } from "react";
import ReceiveDebtModal from "./ReceiveDebtModal";
import EditReceiveDebtModal from "./EditReceiveDebtModal";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const ReceiveDebtCard = ({ receiveDebt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
  };

  return (
    <>
      <div className="hidden md:grid grid-cols-11 gap-4 p-4 items-center hover:bg-gray-50 transition-colors duration-150">
        <div className="col-span-1 text-sm">{receiveDebt.ReceivableId}</div>
        <div className="col-span-2 text-sm font-medium">{receiveDebt.userId?.userName || 'Không có thông tin'}</div>
        <div className="col-span-1 text-sm">{receiveDebt.userId?.userPhone || 'Không có'}</div>
        <div className="col-span-1 text-sm">{parseInt(receiveDebt.debt).toLocaleString()} đ</div>
        <div className="col-span-1 text-sm">{parseInt(receiveDebt.paid).toLocaleString()} đ</div>
        <div className="col-span-1 text-sm">{receiveDebt.paymentTerm}</div>
        <div className="col-span-1 text-sm">{parseInt(receiveDebt.salesInvoiceId?.sumBill).toLocaleString()} đ</div>
        <div className="col-span-1 text-sm">{formatDate(receiveDebt.dueDate)}</div>
        <div className="col-span-2 space-x-2 text-center items-center">
          <button
            onClick={openModal}
            className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm"
          >
            Chi tiết
          </button>
          <button
            onClick={openEditModal}
            className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors duration-300 text-sm"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden p-4 space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Mã công nợ:</span>
          <span>{receiveDebt.ReceivableId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Khách hàng:</span>
          <span>{receiveDebt.userId?.userName || 'Không có thông tin'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Số điện thoại:</span>
          <span>{receiveDebt.userId?.userPhone || 'Không có'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Nợ:</span>
          <span>{parseInt(receiveDebt.debt).toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Đã trả:</span>
          <span>{parseInt(receiveDebt.paid).toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Điều khoản thanh toán:</span>
          <span>{receiveDebt.paymentTerm}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Tổng hóa đơn:</span>
          <span>{parseInt(receiveDebt.salesInvoiceId?.sumBill).toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Hạn thanh toán:</span>
          <span>{formatDate(receiveDebt.dueDate)}</span>
        </div>
        <div className="flex justify-between space-x-2 mt-2">
          <button
            onClick={openModal}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm"
          >
            Chi tiết
          </button>
          <button
            onClick={openEditModal}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 text-sm"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ReceiveDebtModal
          receivableId={receiveDebt._id}
          onClose={closeModal}
        />
      )}
      {isEditModalOpen && (
        <EditReceiveDebtModal debt={receiveDebt} onClose={closeEditModal} />
      )}
    </>
  );
};

export default ReceiveDebtCard;
