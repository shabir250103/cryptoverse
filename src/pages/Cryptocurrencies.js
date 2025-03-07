import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { Card, Row, Col, Typography, Spin, Input } from "antd";

const { Title } = Typography;
const { Search } = Input;

const Cryptocurrencies = () => {
  const { data, isFetching, error } = useGetCryptosQuery();
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  if (isFetching) return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  if (error) return <p>Error: {error.message}</p>;

  const cryptos = data?.data ?? []; // Ensure cryptos is always an array

  // Filter cryptos based on search term
  const filteredCryptos = cryptos.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>All Cryptocurrencies</Title>

      {/* Search Bar */}
      <Search
        placeholder="Search cryptocurrency..."
        allowClear
        enterButton="Search"
        size="large"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", maxWidth: "400px" }}
      />

      <Row gutter={[32, 32]}>
        {filteredCryptos.length > 0 ? (
          filteredCryptos.map((coin) => (
            <Col xs={24} sm={12} lg={6} key={coin.id}>
              <Link to={`/crypto/${coin.id}`}>
                <Card hoverable title={coin.name} style={{ textAlign: "center" }}>
                  <img
                    src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                    alt={coin.name}
                    style={{ width: "50px", height: "50px", marginBottom: "10px" }}
                    onError={(e) => (e.target.style.display = "none")} // Hide broken images
                  />
                  <p>Price: ${parseFloat(coin.priceUsd ?? 0).toFixed(2)}</p>
                  <p>Market Cap: ${parseFloat(coin.marketCapUsd ?? 0).toFixed(2)}</p>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <p>No cryptocurrencies found.</p> // Show message if API returns empty data
        )}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;
