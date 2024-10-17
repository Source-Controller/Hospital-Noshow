import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');
import './styles.scss';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AnnualSaving = ({data}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Annual Saving",
    },
    axisX: {
      title: "Extra Effort (%)",
      // prefix: "%"
    },
    axisY: {
      title: "Revenue(USD)",
      prefix: "$",
    },
    data: [
      {
        yValueFormatString: "Revenue $#,###",
        // xValueFormatString: "%",
        type: "spline",
        dataPoints: data
      },
    ],
  };

  return (
    <div className="annualSaving">
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default AnnualSaving;
