import React from "react";
import LineChart from "../elements/charts/lineChart";
const PaEngageMetrics = ({ data }) => {
  const label = "Patient Engagement Metrics";

  return (
    <div className="paEngageMetrics">
      <span>{label}</span>
      <LineChart
        label={label}
        labels={data.labels}
        backgroundColor={data.backgroundColor}
        data={data.paEngaMetrics}
      />
    </div>
  );
};

export default PaEngageMetrics;
