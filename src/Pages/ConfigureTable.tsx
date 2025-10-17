import { useEffect, useState } from "react";
import { Table, Select } from "antd";
import { fetchComments, updateComment } from "../Api/commentApi";
import type { Comment } from "../types";
import EditModal from "../Components/ModalForm";

export default function ConfigurableTable() {
  const [data, setData] = useState<Comment[]>([]);
  const [editableFields, setEditableFields] = useState<string[]>(["body"]);
  const [selected, setSelected] = useState<Comment | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchComments().then(setData);
  }, []);

  const handleSave = (updated: Comment) => {
    const newData = data.map((c) => (c.id === updated.id ? updated : c));
    setData(newData);
    updateComment(updated);
  };

  const columns = Object.keys(data[0] || {}).map((key) => ({
    title: key.toUpperCase(),
    dataIndex: key,
    key,
  }));

  return (
    <>
      <h2>Configurable Editable Table</h2>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select editable fields"
        value={editableFields}
        onChange={(v) => setEditableFields(v)}
        options={Object.keys(data[0] || {}).map((key) => ({
          label: key.toUpperCase(),
          value: key,
        }))}
      />

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        bordered
        onRow={(record) => ({
          onClick: () => {
            setSelected(record);
            setOpen(true);
          },
        })}
 scroll={{ x: "max-content" }} 
  pagination={{ responsive: true }} 
  style={{
    background: "#fff",
    width: "100%",
    overflowX: "auto",
  }}      />
      <EditModal
        open={open}
        record={selected}
        editableKeys={editableFields}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
