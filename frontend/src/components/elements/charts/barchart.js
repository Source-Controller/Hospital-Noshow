import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const BarChart = ({ labels, label, backgroundColor, data}) => {  

const state = {
  labels,
  datasets: [
    {
      label,
      backgroundColor,
      borderColor: "rgba(219, 79, 79, 0.77)",
      borderWidth: 2,
      data,
    },
  ],
};


  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: {label},
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

export default BarChart;
