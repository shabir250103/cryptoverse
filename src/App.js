import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Home from "./pages/Home";
import CryptoDetails from "./pages/CryptoDetails";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "antd/dist/reset.css";
import "./App.css";

const { Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh", display: "flex" }}>
        <Sidebar />
        <Layout style={{ flex: 1 }}>
          <Header />
          <Content style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;