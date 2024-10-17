import React from "react";
import LineChart from "../../elements/charts/lineChart";

const PerfMetricsFscore = ({ data }) => {  
  const label = "F1 score";

  return (
    <div className="perfMetrics">
      <span>{label}</span>
      <LineChart
        label={`Result:${data.total}%`}
        labels={data.labels}
        backgroundColor={data.backgroundColor}
        data={data.fscore}
      />
    </div>
  );
};

export default PerfMetricsFscore;
