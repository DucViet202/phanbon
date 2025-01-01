import React from "react";
import { Modal, Form, Input, Checkbox, Button, Row, Col, Select } from "antd";
import permissions from "../../permission.json";
import { translatePermission } from "../../utils/translationMap";

const { Option } = Select;

const AddRoleModal = ({ isOpen, onClose, onAddRole }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await onAddRole(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm vai trò:", error);
    }
  };

  return (
    <Modal
      title="Thêm vai trò mới"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700} // Tăng kích thước modal để có nhiều không gian hơn
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Tên vai trò"
          rules={[{ required: true, message: "Vui lòng nhập tên vai trò" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="permissionID"
          label="Quyền"
          rules={[
            { required: true, message: "Vui lòng chọn ít nhất một quyền" },
          ]}
        >
          <Checkbox.Group style={{ width: "100%" }}>
            <Row gutter={[16, 8]}>
              {permissions.map((permission) => (
                <Col span={8} key={permission.id}>
                  <Checkbox value={permission.id}>
                    {translatePermission(permission.action, permission.subject)}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm vai trò
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoleModal;
