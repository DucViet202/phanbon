import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchAdmins from "../../hooks/useFetchAdmins";
import axios from "axios";
import { FaUser, FaLock, FaIdCard, FaEdit } from 'react-icons/fa';
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Profile = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState();
  const listAdmins = useFetchAdmins();
  if (!listAdmins) return <LoadingSpinner />;
  const admin = listAdmins.find((ad) => ad._id === id);
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) {
      alert("Form đang bị rỗng");
      return;
    }
    const roles = admin.role.map((role) => role._id);

    if (formData.password && formData.password === "") {
      alert("Password không được rỗng");
      return;
    }
    // Xóa kiểm tra nameAdmin

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_LOCAL_API_URL}/admin`,
        { ...formData, roleId: roles, id: admin._id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        // Xóa việc cập nhật username trong localStorage
        alert("Chỉnh sửa thành công!");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] rounded-full flex items-center justify-center">
            <FaUser className="text-white text-2xl" />
          </div>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">{`Thông tin của ${admin.adminId}`}</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ProfileField icon={<FaIdCard />} label="Id" value={admin.adminId} />
          <ProfileField icon={<FaUser />} label="Username" value={admin.userName} />
          <ProfileField
            icon={<FaLock />}
            label="Password"
            isInput
            type="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Nhập mật khẩu mới"
          />
          {/* Xóa trường Name */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] hover:from-[#2d9b62] hover:to-[#bce68c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#32AC6D] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <FaEdit className="mr-2" />
            Cập nhật thông tin
          </button>
        </form>
      </div>
    </main>
  );
};

const ProfileField = ({ icon, label, value, isInput, ...inputProps }) => (
  <div className="flex items-center border-b border-gray-200 py-3 group">
    <div className="text-gray-400 mr-3 group-hover:text-[#32AC6D] transition-colors duration-200">
      {icon}
    </div>
    <label className="font-medium text-gray-700 min-w-[80px]">{label}:</label>
    {isInput ? (
      <input
        {...inputProps}
        className="ml-2 flex-1 appearance-none border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-[#32AC6D] rounded transition duration-200"
      />
    ) : (
      <span className="ml-2 text-gray-600">{value}</span>
    )}
  </div>
);

export default Profile;
