import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = ({ labels, label, backgroundColor, data }) => {  

  const state = {
    labels,
    datasets: [
      {
        label,
        backgroundColor,
        fill: false,
        lineTension: 0.5,
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,        
        data,
      },
    ],
  };
  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: {label},
            fontSize: 22
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

export default LineChart;
