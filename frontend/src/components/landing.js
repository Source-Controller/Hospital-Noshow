import React from "react";
import Apointments from "./landing/Apointment";
import MultipleBarCharts from "./elements/multipleChart/multiBarChart";
import NoShowStatus from "./landing/noshowstatus/noshowStatus";

import PerfMetricsAccuracy from "./landing/metrics/perfMetricsAccuracy";
import PerfMetricsAuroc from "./landing/metrics/perfMetricsAuroc";
import PerfMetricsAuprc from "./landing/metrics/perfMetricsAuprc";
import PerfMetricsFscore from "./landing/metrics/perfMetricsFscore";
import AnnualSaving from "./landing/annualSaving/annualSaving";
// import testdata from '../data.json';

const Landing = ({ data,filter }) => {
  // const userRole = user && user.role;
  // console.log(data,'dataddd');
  // console.log(data,'dataddd');


  return (
    data ?(<div className="landing-main">
      <Apointments apointData={data.apointments} filter={filter} />
      <MultipleBarCharts
        data={data.apptStatus}
        filter={filter}
        id={"noshow-multiBarchart"}
        title={`History of Appointment Status(<span>total: ${data.apptAmount}</span>)`}
        argumentField={"date"}
        valueField={["Completed", "Arrived", "Scheduled"]}
      />
      <NoShowStatus
        NoShowStatusData={data.noshow_pred_probability}
        totalNoshows={data.totalNoshows}
        filter={filter}
      />
      <div className="metrics">
        <span>Prediction Performance</span>
        <div className="metrics1">
          <PerfMetricsAccuracy data={data.accuracy} />
          <PerfMetricsAuroc data={data.auroc}  />
        </div>
        <div className="metrics2">
          <PerfMetricsAuprc data={data.auprc} />
          <PerfMetricsFscore data={data.fscore} />
        </div>
      </div>
      <AnnualSaving data={data.annualsaving} />


    </div>
    ) : (
      <div className="nodata-div">No data...</div>
    )
  );
};

export default Landing;
