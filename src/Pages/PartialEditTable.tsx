import { useEffect, useState } from "react";
import { Table, message } from "antd";
import EditModal from "../Components/ModalForm";
import { fetchPosts, updatePost } from "../Api/postApi";
import type { Post } from "../types";

export default function PartialEditTable() {
  const [data, setData] = useState<Post[]>([]);
  const [selected, setSelected] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const editableFields = ["title", "body", "status"];

  useEffect(() => {
    fetchPosts()
      .then((res) => {
        console.log("Fetched data:", res);
        setData(res);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const handleRowClick = (record: Post) => {
    console.log("Row clicked:", record);
    setSelected(record);
    setOpen(true);
  };

  const handleSave = (updated: Post) => {
    const newData = data.map((item) =>
      item.id === updated.id ? updated : item
    );
    setData(newData);
    updatePost(updated);
    message.success("Post updated!");
  };

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          title: key.toUpperCase(),
          dataIndex: key,
          key,
                  width: 200, 

        }))
      : [];

  return (
    <>

      <h2 style={{ marginBottom: 12 }}>Partial Editable Table</h2>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        bordered
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
 scroll={{ x: "max-content" }} 
  pagination={{ responsive: true }} 
  style={{
    background: "#fff",
    width: "100%",
    overflowX: "auto",
  }}      />

      {open && selected && (
        <EditModal
          open={open}
          record={selected}
          editableKeys={editableFields}
          onClose={() => {
            setOpen(false);
            setSelected(null);
          }}
          onSave={handleSave}
        />
      )}
    </>
  );
}
