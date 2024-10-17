import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Themes from "../components/themes";
import Landing from "../components/landing";
import Header from "../components/layouts/header/header";
import testdata from '../json_file.json';
import FooterDoc from "../components/layouts/footer/footerDoc";
import Forbidden from "./forbidden";

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem('token'));
  const data = JSON.parse(localStorage.getItem('hospitalData'));

  const [selectedCategory, setSelectedCategory] = useState("");

  
  

  return (
    <>

      {user ? (

        <div id="page-container">
          <Header setSelectedCategory={setSelectedCategory} user={user} />

          <div className="main-container">
            <Sidebar user={user} filter={selectedCategory}/>
            <Landing data={data} filter={selectedCategory} />
            <Themes />
          </div>

          < div id="page-footer">
            <FooterDoc />
          </div>
        </div >

      ) : (
        <Forbidden />
      )}
    </>
  );
};

export default Dashboard;
