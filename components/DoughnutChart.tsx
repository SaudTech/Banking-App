"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: React.FC<DoughnutChartProps> = ({ accounts }) => {
  const data = {
    datasets: [
      {
        label: "Banks",
        data: [25000, 37000],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverOffset: 4,
      },
    ],
    labels: ["HDFC", "Union"],
  }
  return <Doughnut data={data} options={
    {
      cutout: "60%",
      plugins: {
        legend: {
          display: false,
        },
      },
    }
  } />;
};

export default DoughnutChart;
