import React from "react";
import { Layout, Typography } from "antd";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header style={{ background: "#001529", padding: "0 20px", color: "white" }}>
      <Typography.Title level={3} style={{ color: "white", margin: 0 }}>
        Cryptoverse Dashboard
      </Typography.Title>
    </Header>
  );
};

export default AppHeader;
