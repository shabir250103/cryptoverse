import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, FundOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider collapsible style={{ height: "100vh" }}>
      <div className="logo" style={{ height: "64px", textAlign: "center", color: "white", fontSize: "20px", lineHeight: "64px" }}>
        Cryptoverse
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FundOutlined />}>
  <Link to="/cryptocurrencies">Cryptocurrencies</Link>
</Menu.Item>

      </Menu>
    </Sider>
  );
};

export default Sidebar;