import React, { useState } from 'react';
import SupplierDetailModal from './SupplierDetailModal';

const SupplierCard = ({ supplier, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (updatedSupplier) => {
    onUpdate(updatedSupplier);
    handleCloseModal();
  };

  return (
    <>
      <div className="p-4 hover:bg-gray-50 transition-colors duration-150">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-6 md:gap-4 items-center">
          <div className="col-span-1 text-sm text-center">{supplier.supplierId}</div>
          <div className="col-span-2 text-sm font-medium text-center">{supplier.supplierName}</div>
          <div className="col-span-1 text-sm text-center">{supplier.supplierPhone}</div>
          <div className="col-span-1 text-sm text-center">{supplier.supplierEmail}</div>
          <div className="col-span-1 flex justify-center space-x-2">
            <button
              onClick={handleOpenModal}
              className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm"
            >
              Chi tiết
            </button>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Mã NCC</span>
            <span className="text-gray-900">{supplier.supplierId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Tên NCC</span>
            <span className="text-gray-900 font-medium">{supplier.supplierName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">SĐT</span>
            <span className="text-gray-500">{supplier.supplierPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Email</span>
            <span className="text-gray-500">{supplier.supplierEmail}</span>
          </div>
          <div className="mt-2 flex justify-center">
            <button
              onClick={handleOpenModal}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm w-full"
            >
              Chi tiết
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SupplierDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          supplier={supplier}  // Đảm bảo supplier object có đầy đủ thông tin, bao gồm _id
          onUpdate={handleUpdate}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default SupplierCard;