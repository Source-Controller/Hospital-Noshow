import React from "react";
import LineChart from "../../elements/charts/lineChart";

const PerfMetricsAuroc = ({ data }) => {  
  const label = "AUROC";

  return (
    <div className="perfMetrics">
      <span>{label}</span>
      <LineChart
        label={`Result:${data.total}%`}
        labels={data.labels}
        backgroundColor={data.backgroundColor}
        data={data.auroc}
      />
    </div>
  );
};

export default PerfMetricsAuroc;
