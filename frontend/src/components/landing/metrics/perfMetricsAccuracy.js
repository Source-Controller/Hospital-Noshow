import React from "react";
import LineChart from "../../elements/charts/lineChart";

const PerfMetricsAccuracy = ({ data }) => {  
  const label = "Accuracy";

  return (
    <div className="perfMetrics">
      <span>{label}</span>
      <LineChart
        label={`Result:${data.total}%`}
        labels={data.labels}
        backgroundColor={data.backgroundColor}
        data={data.accuracies}
      />
    </div>
  );
};

export default PerfMetricsAccuracy;
