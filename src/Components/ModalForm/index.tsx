import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";

type Props = {
  open: boolean;
  record: any;
  editableKeys?: string[];
  onClose: () => void;
  onSave: (updated: any) => void;
};

export default function EditModal({
  open,
  record,
  editableKeys = [],
  onClose,
  onSave,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (record && open) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [record, open, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...record, ...values });
      onClose();
    } catch {
    }
  };

  return (
    <Modal
      title={record ? `Edit Record #${record.id}` : "Edit Record"}
      open={open}
      onCancel={onClose}
      centered
      bodyStyle={{ 
        maxHeight: 'calc(100vh - 200px)', 
        overflowY: 'auto' 
      }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {editableKeys.map((key) => (
          <Form.Item
            key={key}
            name={key}
            label={key.toUpperCase()}
          >
            <Input />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
}