import React from "react";
import {
  Chart,
  CommonSeriesSettings,
  Series,
  ArgumentAxis,
  Grid,
  Crosshair,
  Export,
  Legend,
  Point,
  Label,
  Font,
  Title,
  Subtitle,
  Tooltip,
} from "devextreme-react/chart";
import './noshowStatus.scss';

const NoShowStatus = ({NoShowStatusData,totalNoshows, filter}) => {
  const labels = [
    { value: "noshow_now", name: "NoShow_Now" },
    { value: "noshow_pred", name: "NoShow_pred" },
    { value: "noshow_pred_prob", name: "NoShow_pred_prob" },
  ];

  const filteredData = filter.toLowerCase() === "all" ? NoShowStatusData : NoShowStatusData.filter(item => item.department_name.toLowerCase() === filter.toLowerCase());

  return (
    <Chart id="noShowStatus" dataSource={filteredData}>
      <CommonSeriesSettings type="spline" argumentField="date">
        <Point hoverMode="allArgumentPoints" />
      </CommonSeriesSettings>
      {labels.map((item) => (
        <Series key={item.value} valueField={item.value} name={item.name} />
      ))}
      <ArgumentAxis
        valueMarginsEnabled={false}
        discreteAxisDivisionMode="crossLabels"
      >
        <Grid visible={true} />
      </ArgumentAxis>
      <Crosshair enabled={true} color="#949494" width={3} dashStyle="dot">
        <Label visible={true} backgroundColor="#949494">
          <Font color="#fff" size={12} />
        </Label>
      </Crosshair>
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="bottom"
      />
      <Title text="History of NoShow Status">
        <Subtitle text={`(Number of noshows: ${totalNoshows})`} />
      </Title>
      <Export enabled={true} />
      <Tooltip enabled={true} />
    </Chart>
  );
};

export default NoShowStatus;
