import React from "react";

import FileUploadForm from "./sidebar/fileUpload/fileUpload";
import WeatherInfo from "./sidebar/weatherInfo/weatherInfo";
import TotalStatus from "./sidebar/totalStatus";

const Sidebar = ({ user,filter }) => {

  const testdata = JSON.parse(localStorage.getItem('hospitalData'));

  const filteredData = filter.toLowerCase() === "all" ? testdata.totalStatus.filter(item => item.department_name === 'all') : testdata.totalStatus.filter(item => item.department_name.toLowerCase() === filter.toLowerCase());

  console.log(filteredData,'filterddatattt');

  return (
    <div className="sidebar-wrapper">
      {testdata ? (
        <>
        <TotalStatus totalStatus={filteredData} />
        <WeatherInfo weatherData={testdata.weathers} />
        </>
      ) : (
        <div className="nodata-div">No data...</div>
      )}
      {user.is_superuser ? (

        <FileUploadForm />  
      ) : (
        <div className="fuf-main" />

      )}
    </div>
  );
};

export default Sidebar;
