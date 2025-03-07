import React from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import { Card, Typography, Spin, Row, Col, Statistic } from "antd";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const { Title, Text } = Typography;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching, error } = useGetCryptoDetailsQuery(coinId);

  if (isFetching) return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  if (error) return <p>Error: {error.message}</p>;

  const crypto = data?.data;

  const chartData = {
    labels: ["1D", "1W", "1M", "3M", "6M", "1Y", "5Y"],
    datasets: [
      {
        label: "Price (USD)",
        data: [
          crypto?.priceUsd * 0.9,
          crypto?.priceUsd * 0.95,
          crypto?.priceUsd,
          crypto?.priceUsd * 1.05,
          crypto?.priceUsd * 1.1,
          crypto?.priceUsd * 1.2,
          crypto?.priceUsd * 1.5,
        ],
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: {
      x: { title: { display: true, text: "Time Period", font: { size: 16 } } },
      y: { title: { display: true, text: "Price in USD", font: { size: 16 } } },
    },
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Title level={1} style={{ fontSize: "40px", color: "#333" }}>{crypto?.name} Details</Title>
      
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} lg={18}>
          <Card hoverable style={{ padding: "25px", borderRadius: "10px", background: "#fff" }}>
            <Title level={3} style={{ fontSize: "28px", color: "#333" }}>Price Trend</Title>
            <div style={{ height: "400px", width: "100%" }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card hoverable style={{ textAlign: "center", padding: "30px", borderRadius: "10px", background: "#fff" }}>
            <img
              src={`https://assets.coincap.io/assets/icons/${crypto?.symbol?.toLowerCase()}@2x.png`}
              alt={crypto?.name}
              style={{ width: "100px", height: "100px", marginBottom: "15px" }}
              onError={(e) => (e.target.style.display = "none")}
            />
            <Title level={2} style={{ fontSize: "32px", color: "#333" }}>{crypto?.name} ({crypto?.symbol})</Title>
            <Row gutter={[16, 16]} justify="center">
              <Col span={12}><Statistic title="Current Price" value={`$${parseFloat(crypto?.priceUsd || 0).toFixed(2)}`} /></Col>
              <Col span={12}><Statistic title="Market Cap" value={`$${parseFloat(crypto?.marketCapUsd || 0).toFixed(2)}`} /></Col>
              <Col span={12}><Statistic title="Volume (24H)" value={`$${parseFloat(crypto?.volumeUsd24Hr || 0).toFixed(2)}`} /></Col>
              <Col span={12}><Statistic title="Supply" value={parseFloat(crypto?.supply || 0).toFixed(2)} /></Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={18}>
          <Card hoverable style={{ padding: "25px", borderRadius: "10px", background: "#fff" }}>
            <Title level={3} style={{ fontSize: "24px", color: "#333" }}>Key Statistics</Title>
            <Row gutter={[32, 16]}>
              <Col span={12}><Statistic title="Rank" value={crypto?.rank} /></Col>
              <Col span={12}><Statistic title="All-Time High" value={`$${parseFloat(crypto?.allTimeHigh || 0).toFixed(2)}`} /></Col>
              <Col span={12}><Statistic title="Total Supply" value={parseFloat(crypto?.supply || 0).toFixed(2)} /></Col>
              <Col span={12}><Statistic title="Circulating Supply" value={`$${parseFloat(crypto?.marketCapUsd || 0).toFixed(2)}`} /></Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={18}>
          <Card hoverable style={{ padding: "25px", borderRadius: "10px", background: "#fff" }}>
            <Title level={3} style={{ fontSize: "24px", color: "#333" }}>About {crypto?.name}</Title>
            <Text style={{ fontSize: "18px", color: "#555" }}> 
              {crypto?.name} is a digital currency with a finite supply, allowing users to send/receive money 
              without a central bank or government, often nicknamed "Digital Gold".
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CryptoDetails;