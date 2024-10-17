import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const PieChart = ({ labels, label, backgroundColor, data }) => {
  const state = {
    labels,
    datasets: [
      {
        label,
        backgroundColor,
        data,
      },
    ],
  };

  return (
    <div>
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: { label },
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default PieChart;
