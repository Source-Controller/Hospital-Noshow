import React from 'react';
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Label,
  Format,
  Legend,
  Export,
} from 'devextreme-react/chart';
import './multiBarChart.scss';

function onPointClick(e) {
  e.target.select();
}
function MultipleBarCharts({data, id, title, argumentField, valueField, filter}) {

  const filteredData = filter.toLowerCase() === "all" ? data : data.filter(item => item.department_name.toLowerCase() === filter.toLowerCase());

  return (
    <Chart
      id={id}
      title={title}      
      dataSource={filteredData}
      onPointClick={onPointClick}
    >
      <CommonSeriesSettings
        argumentField={argumentField}
        type="bar"
        hoverMode="allArgumentPoints"
        selectionMode="allArgumentPoints"
      >
        <Label visible={true}>
          <Format
            type="fixedPoint"
            precision={0}
          />
        </Label>
      </CommonSeriesSettings>
      <Series
        argumentField={argumentField}
        valueField={valueField[0]}
        name={valueField[0]}
      />
      <Series
        valueField={valueField[1]}
        name={valueField[1]}
      />
      <Series
        valueField={valueField[2]}
        name={valueField[1]}
      />
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
      ></Legend>
      <Export enabled={true} />
    </Chart>
  );
}
export default MultipleBarCharts;
