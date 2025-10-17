import { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchUsers,updateUser } from "../Api/usersApi";
import type { User } from "../types";
import EditModal from "../Components/ModalForm";

export default function PopupEditTable() {
  const [data, setData] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers().then(setData);
  }, []);

  const handleSave = (updated: User) => {
    const newData = data.map((d) => (d.id === updated.id ? updated : d));
    setData(newData);
    updateUser(updated);
  };

  const columns = Object.keys(data[0] || {}).map((key) => ({
    title: key.toUpperCase(),
    dataIndex: key,
    key,
  }));

  return (
    <>
      <h2> Editable Table</h2>
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
  }}
/>

      <EditModal
        open={open}
        record={selected}
        editableKeys={selected ? Object.keys(selected) : []}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
