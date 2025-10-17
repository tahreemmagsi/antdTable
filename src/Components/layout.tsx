import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

const { Sider, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/">Editable Table</Link>,
    },
    {
      key: "2",
      label: <Link to="/partial">Partial Edit</Link>,
    },
    {
      key: "3",
      label: <Link to="/configurable">Configurable Edit</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider 
        style={{ 
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ padding: "24px", background: "#f0f2f5" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}