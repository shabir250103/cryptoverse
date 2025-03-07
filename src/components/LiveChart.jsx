import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LiveChart = ({ priceHistory }) => {
  const chartData = {
    labels: priceHistory.map((entry) => new Date(entry[0]).toLocaleTimeString()),
    datasets: [
      {
        label: "Live Price (USD)",
        data: priceHistory.map((entry) => entry[1]),
        borderColor: "#1890ff",
        backgroundColor: "rgba(24, 144, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LiveChart;
