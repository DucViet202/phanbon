import React, { useState } from "react";
import useFetchRoles from "../../hooks/useFetchRoles";
import GradientBorderBox from "../../duong-vien/GradientBorderbox";
import RoleDetailModal from "../../components/Role/RoleDetailModal";
import AddRoleModal from "../../components/Role/AddRoleModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { message } from "antd";
import {
  FaUserTie,
  FaUserCog,
  FaUserShield,
  FaUser,
  FaInfoCircle,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import permissions from "../../permission.json";
import { translatePermission } from "../../utils/translationMap";

const Role = () => {
  const { roles, fetchRoles, addRole, updateRole } = useFetchRoles();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = roles?.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetailModal = (role) => {
    setSelectedRole(role);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedRole(null);
  };

  const handleUpdateRole = async (updatedRole) => {
    try {
      await updateRole(updatedRole);
      message.success({
        content: "Cập nhật vai trò thành công!",
        className: "custom-message-success",
      });
      handleCloseDetailModal();
    } catch (error) {
      console.error("Lỗi khi cập nhật vai trò:", error.response || error);
      let errorMessage = "Có lỗi xảy ra khi cập nhật vai trò.";
      if (error.response) {
        switch (error.response.status) {
          case 404:
            errorMessage =
              "Không tìm thấy vai trò để cập nhật. Vui lòng thử lại.";
            break;
          case 400:
            errorMessage = "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.";
            break;
          case 401:
            errorMessage = "Bạn không có quyền cập nhật vai trò này.";
            break;
          // Thêm các trường hợp khác nếu cần
        }
      }
      message.error({
        content: errorMessage,
        className: "custom-message-error",
      });
    }
  };

  const getRoleIcon = (roleName) => {
    const lowerCaseName = roleName.toLowerCase();
    if (lowerCaseName.includes("admin"))
      return <MdAdminPanelSettings className="text-red-500" />;
    if (lowerCaseName.includes("quản lý"))
      return <FaUserTie className="text-blue-500" />;
    if (lowerCaseName.includes("nhân viên"))
      return <FaUser className="text-green-500" />;
    if (lowerCaseName.includes("kỹ thuật"))
      return <FaUserCog className="text-yellow-500" />;
    return <FaUserShield className="text-purple-500" />;
  };

  const handleAddRole = async (newRole) => {
    try {
      await addRole(newRole);
      setIsAddModalOpen(false);
      message.success({
        content: "Thêm vai trò mới thành công!",
        className: "custom-message-success",
      });
    } catch (error) {
      console.error("Lỗi khi thêm vai trò:", error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            message.error({
              content: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
              className: "custom-message-error",
            });
            break;
          case 401:
            message.error({
              content: "Bạn không có quyền thêm vai trò mới.",
              className: "custom-message-error",
            });
            break;
          case 409:
            message.error({
              content: "Vai trò này đã tồn tại.",
              className: "custom-message-error",
            });
            break;
          default:
            message.error({
              content: "Có lỗi xảy ra khi thêm vai trò mới.",
              className: "custom-message-error",
            });
        }
      } else {
        message.error({
          content: "Không thể kết nối đến server. Vui lòng thử lại sau.",
          className: "custom-message-error",
        });
      }
    }
  };

  const getPermissionName = (permissionID) => {
    const permission = permissions.find((p) => p.id === permissionID);
    return permission
      ? translatePermission(permission.action, permission.subject)
      : "Không xác định";
  };

  if (!roles) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 sm:mb-0">
            DANH SÁCH PHÂN QUYỀN
          </h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Tìm kiếm vai trò..."
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Thêm vai trò
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoles.map((role) => (
            <GradientBorderBox key={role._id}>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {getRoleIcon(role.name)}
                    <h2 className="text-lg font-semibold ml-2">{role.name}</h2>
                  </div>
                  <button
                    onClick={() => handleOpenDetailModal(role)}
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    title="Xem chi tiết"
                  >
                    <FaInfoCircle size={20} />
                  </button>
                </div>
                <h3 className="font-medium mb-1">Quyền:</h3>
                <ul className="list-disc list-inside mb-4">
                  {role.permissionID.map((permissionID) => (
                    <li key={permissionID} className="text-sm">
                      {getPermissionName(permissionID)}
                    </li>
                  ))}
                </ul>
              </div>
            </GradientBorderBox>
          ))}
        </div>
      </div>
      {selectedRole && (
        <RoleDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          role={selectedRole}
          onUpdate={handleUpdateRole}
        />
      )}
      <AddRoleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRole={handleAddRole}
      />
    </div>
  );
};

export default Role;
