import React from "react";
import LineChart from "../../elements/charts/lineChart";

const PerfMetrics = ({data}) => {
  const label = 'Performance Metrics';

  return (
    <div className="perfMetrics">
      <span>{label}</span>
    <LineChart label={label} labels={data.labels} backgroundColor={data.backgroundColor} data={data.perfMetrics} />
    </div>
  )
}

export default PerfMetrics;