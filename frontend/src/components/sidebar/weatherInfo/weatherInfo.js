import React from "react";
import "./weatherInfo.scss";

const WeatherInfo = ({ weatherData }) => {

  // const data = [
  //   ["Mon", "2/5/2024", "sunny", "25", "75"],
  //   ["Tue", "2/5/2024", "sunny", "25", "75"],
  //   ["Wed", "2/5/2024", "sunny", "25", "75"],
  //   ["Thr", "2/5/2024", "sunny", "25", "75"],
  //   ["Fri", "2/5/2024", "sunny", "25", "75"],
  //   ["Sat", "2/5/2024", "sunny", "25", "75"],
  //   ["Sun", "2/5/2024", "sunny", "25", "75"],
  // ];

  return (
    weatherData ? (
      <div className="winfo-main">
        <span className="wtable-title">Weather Information</span>
        <div className="wtable-container">
          <table>
            <thead>
              <tr>
                <th>Week</th>
                <th>Date</th>
                <th>Weather</th>
                <th>Temp</th>
                <th>Humi</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.map((item, index) => (
                <tr key={index}>
                  {item.map((dt, index) => (
                    <th key={index}>{dt}</th>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="nodata-div">No data...</div>
    )
  );
};

export default WeatherInfo;