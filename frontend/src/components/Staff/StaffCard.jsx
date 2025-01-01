import React, { useState, useCallback } from "react";
import StaffDetailsModal from "./StaffDetailsModal";
import EditStaffModal from "./EditStaffModal";

const StaffCard = ({ staff, onStaffUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [localStaff, setLocalStaff] = useState(staff);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleStaffUpdated = useCallback((updatedStaff) => {
    setLocalStaff(updatedStaff);
    onStaffUpdated(updatedStaff);
    closeEditModal();
  }, [onStaffUpdated]);

  return (
    <>
      <div className="hidden md:grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors duration-150">
        <div className="col-span-1 text-sm">{localStaff.adminId}</div>
        <div className="col-span-1 text-sm font-medium">{localStaff.userName}</div>
        <div className="col-span-1 text-sm">{localStaff.nameAdmin}</div>
        <div className="col-span-1 text-sm">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            localStaff.isBlock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {localStaff.isBlock ? 'Bị chặn' : 'Hoạt động'}
          </span>
        </div>
        <div className="col-span-1 space-x-2">
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
          <span className="font-semibold">Mã NV:</span>
          <span>{localStaff.adminId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Username:</span>
          <span>{localStaff.userName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Tên nhân viên:</span>
          <span>{localStaff.nameAdmin}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Trạng thái:</span>
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            localStaff.isBlock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {localStaff.isBlock ? 'Bị chặn' : 'Hoạt động'}
          </span>
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
        <StaffDetailsModal
          staffDetail={localStaff}
          onClose={closeModal}
        />
      )}
      {isEditModalOpen && (
        <EditStaffModal 
          staff={localStaff} 
          onClose={closeEditModal} 
          onStaffUpdated={handleStaffUpdated}
        />
      )}
    </>
  );
};

export default StaffCard;
