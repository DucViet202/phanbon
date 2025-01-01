import React, { useState, useEffect, useRef } from "react";
import useFetchRoles from "../../hooks/useFetchRoles";
import axios from "axios";

const AddStaffModal = ({ isOpen, onClose, onStaffAdded }) => {
  const { roles, isLoading: rolesLoading, error: rolesError } = useFetchRoles();
  const [formData, setFormData] = useState({
    nameAdmin: '',
    userName: '',
    password: '',
  });
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [filteredRoles, setFilteredRoles] = useState([]);
  const roleInputRef = useRef(null);

  useEffect(() => {
    if (roles) {
      setFilteredRoles(roles);
    }
  }, [roles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleInputChange = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
    setShowRoleDropdown(true);
    if (value.trim() === '') {
      setFilteredRoles(roles);
    } else {
      const filtered = roles.filter(role => 
        role.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRoles(filtered);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role.name);
    setCheckedBoxes([role._id]);
    setShowRoleDropdown(false);
  };

  const handleClickOutside = (e) => {
    if (roleInputRef.current && !roleInputRef.current.contains(e.target)) {
      setShowRoleDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const resetForm = () => {
    setFormData({
      nameAdmin: '',
      userName: '',
      password: '',
    });
    setSelectedRole('');
    setCheckedBoxes([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (checkedBoxes.length === 0) {
      alert("Vui lòng chọn vai trò");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_URL}/admin`,
        {
          ...formData,
          roleId: checkedBoxes,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        resetForm();
        onStaffAdded(); // Gọi hàm này sau khi thêm thành công
      }
    } catch (error) {
      console.error("Lỗi khi thêm nhân viên:", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi thêm nhân viên");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">Thêm nhân viên mới</h2>
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2 relative" ref={roleInputRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
              <input
                type="text"
                value={selectedRole}
                onChange={handleRoleInputChange}
                onClick={() => setShowRoleDropdown(true)}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                placeholder="Tìm kiếm vai trò"
                required
              />
              {showRoleDropdown && !rolesLoading && !rolesError && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((role) => (
                      <li
                        key={role._id}
                        onClick={() => handleRoleSelect(role)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {role.name}
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">Không tìm thấy vai trò phù hợp</li>
                  )}
                </ul>
              )}
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
              {isSubmitting ? 'Đang thêm...' : 'Thêm nhân viên'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
