import React from "react";
import { FaUser, FaIdCard, FaUserTag, FaShieldAlt, FaTimes } from "react-icons/fa";

const StaffDetailsModal = ({ staffDetail, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] p-6 rounded-t-3xl relative">
          <h2 className="text-3xl font-bold text-white">Chi tiết nhân viên</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <InfoItem icon={<FaIdCard />} label="Mã nhân viên" value={staffDetail.adminId} />
            <InfoItem icon={<FaUser />} label="Tên nhân viên" value={staffDetail.nameAdmin} />
            <InfoItem icon={<FaUserTag />} label="Tài khoản" value={staffDetail.userName} />
            <InfoItem
              icon={<FaShieldAlt />}
              label="Trạng thái"
              value={staffDetail.isBlock ? "Đã khóa" : "Đang hoạt động"}
              valueClassName={staffDetail.isBlock ? "text-red-600" : "text-green-600"}
            />
            <div className="flex items-start space-x-4">
              <FaShieldAlt className="text-gray-500 mt-1" size={20} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                <ul className="list-disc list-inside space-y-1">
                  {staffDetail.role.map((role) => (
                    <li key={role._id} className="text-lg font-semibold">{role.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, valueClassName = "" }) => (
  <div className="flex items-center space-x-4">
    <div className="text-gray-500">{React.cloneElement(icon, { size: 20 })}</div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <p className={`text-lg font-semibold ${valueClassName}`}>{value}</p>
    </div>
  </div>
);

export default StaffDetailsModal;
