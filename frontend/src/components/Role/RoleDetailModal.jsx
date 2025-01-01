import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Checkbox, Button, message } from "antd";
import permissions from "../../permission.json";

import { translatePermission } from "../../utils/translationMap";

const RoleDetailModal = ({ isOpen, onClose, role, onUpdate }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    form.setFieldsValue(role);
  }, [form, role]);

  const handleSubmit = async (values) => {
    try {
      const updatedRole = {
        _id: role._id, // Đảm bảo có ID
        name: values.name,
        permissionID: values.permissionID,
      };
      await onUpdate(updatedRole);
      setIsEditing(false);
      message.success("Cập nhật vai trò thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật vai trò:", error);
      message.error("Có lỗi xảy ra khi cập nhật vai trò.");
    }
  };

  return (
    <Modal
      title="Chi tiết vai trò"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ID vai trò" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên vai trò"
          rules={[{ required: true, message: "Vui lòng nhập tên vai trò" }]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="permissionID"
          label="Quyền"
          rules={[
            { required: true, message: "Vui lòng chọn ít nhất một quyền" },
          ]}
        >
          <Checkbox.Group disabled={!isEditing} className="w-full">
            <div className="grid grid-cols-2 gap-2">
              {permissions.map((permission) => (
                <Checkbox key={permission.id} value={permission.id}>
                  {translatePermission(permission.action, permission.subject)}
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        </Form.Item>
        <div className="mt-4">
          {isEditing ? (
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsEditing(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button type="primary" onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </Button>
            </div>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default RoleDetailModal;
