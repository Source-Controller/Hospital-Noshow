import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Themes from "../components/themes";
import Footer from "../components/layouts/footer/footer";
import LandingDoc from "../components/landingDoc";
import HeaderDoc from "../components/layouts/header/headerDoc";
// import testdata from '../json_file.json';
import Forbidden from "./forbidden";

const Doctor = () => {

  const [transData, setTransData] = useState([]);
  const [subFilteredData, setSubFilteredData] = useState([]);

  const testdata = JSON.parse(localStorage.getItem('hospitalData'));
  const user = JSON.parse(localStorage.getItem('token'));
    
  useEffect(() => {
    if (testdata && testdata.patients) {
      const filteredData = testdata.patients.filter(item => item.physician_username === user.username);
      const filteredcalendar = testdata.calendar_shows.filter(item => item.username === user.username);     
      setSubFilteredData(filteredData);
      setTransData(filteredcalendar);
    }
  }, []);

  return user ? (
    transData.length == 0 ? (
      <p>Loading...</p>
    ) : (

      testdata ? (
        <div id="page-container">
          <HeaderDoc user={user} />
          <div className="main-container">
            {/* <Sidebar user={user} />             */}
            <LandingDoc calcData={transData} patientData={subFilteredData} />
            <Themes />
          </div>
          <div id="page-footer">
            <Footer user={user} />
          </div>
        </div>
      ) : (<div className="nodata-div">No data....</div>)
    )
  ) : (
    <Forbidden />
  );
};

export default Doctor;