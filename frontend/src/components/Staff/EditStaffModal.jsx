import axios from "axios";
import React, { useState } from "react";

const EditStaffModal = ({ staff, onClose, onStaffUpdated }) => {
  const [formData, setFormData] = useState({
    id: staff._id,
    nameAdmin: staff.nameAdmin,
    userName: staff.userName,
    password: staff.password,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSend = { ...formData };

      // Nếu mật khẩu không được thay đổi, xóa nó khỏi dữ liệu gửi đi
      if (formData.password === staff.password) {
        delete dataToSend.password;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_LOCAL_API_URL}/admin`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        onStaffUpdated(response.data);
        onClose();
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật nhân viên:", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật nhân viên");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">Chỉnh sửa nhân viên</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên nhân viên</label>
              <input
                type="text"
                name="nameAdmin"
                value={formData.nameAdmin}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tài khoản</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                required
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới (để trống nếu không đổi)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 font-semibold transition-all duration-300 ease-in-out"
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out font-semibold transform hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật nhân viên'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaffModal;
