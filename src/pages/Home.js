import React from "react";
import { useGetCryptosQuery, useGetGlobalStatsQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { Card, Row, Col, Typography, Statistic, Spin, Alert } from "antd";

const { Title } = Typography;

const Home = () => {
  const { data: cryptosData, isFetching, error } = useGetCryptosQuery();
  const { data: globalStats, isFetching: isFetchingStats } = useGetGlobalStatsQuery();

  if (isFetching || isFetchingStats) return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  if (error) return <Alert message="Failed to load data" type="error" showIcon />;

  return (
    <div style={{ padding: "20px" }}>
      {/* Global Crypto Stats */}
      <Title level={2}>Global Crypto Stats</Title>
      <Row gutter={[32, 32]} style={{ marginBottom: "30px" }}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats?.totalCryptos || "No Data"} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={globalStats?.totalMarketCap ? `$${(globalStats.totalMarketCap / 1e12).toFixed(2)}T` : "No Data"} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={globalStats?.totalVolume24h ? `$${(globalStats.totalVolume24h / 1e9).toFixed(2)}B` : "No Data"} />
        </Col>
        <Col span={12}>
          <Statistic title="Bitcoin Dominance" value={globalStats?.bitcoinDominance ? `${globalStats.bitcoinDominance.toFixed(2)}%` : "No Data"} />
        </Col>
      </Row>

      {/* Top Cryptocurrencies */}
      <Title level={3}>Top 10 Cryptocurrencies</Title>
      <Row gutter={[32, 32]}>
        {cryptosData?.data?.slice(0, 10).map((coin, index) => (
          <Col xs={24} sm={12} lg={6} key={coin.id}>
            <Link to={`/crypto/${coin.id}`}>
              <Card hoverable>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span>{index + 1}. {coin.name}</span>
                  <img
                    src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                    alt={coin.name}
                    style={{ width: "50px", height: "50px", marginBottom: "10px" }}
                    onError={(e) => (e.target.style.display = "none")} // Hide broken images
                  />
        

                </div>
                <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
                <p>Market Cap: ${parseFloat(coin.marketCapUsd / 1e9).toFixed(2)}B</p>
                <p>Daily Change: {coin.changePercent24Hr ? `${parseFloat(coin.changePercent24Hr).toFixed(2)}%` : "N/A"}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Show More */}
      <Link to="/cryptocurrencies" style={{ float: "right", marginTop: "20px", fontSize: "16px", fontWeight: "bold" }}>
        Show More
      </Link>
    </div>
  );
};

export default Home;
