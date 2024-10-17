import React from "react";
import LineChart from "../../elements/charts/lineChart";

const PerfMetricsAuprc = ({ data }) => {  
  const label = "AUPRC";

  return (
    <div className="perfMetrics">
      <span>{label}</span>
      <LineChart
        label={`Result:${data.total}%`}
        labels={data.labels}
        backgroundColor={data.backgroundColor}
        data={data.auprc}
      />
    </div>
  );
};

export default PerfMetricsAuprc;
