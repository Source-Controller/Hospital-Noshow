import React, { useEffect, useState } from "react";

function DropdownMenu({ options, selectedValue, setSelectedValue }) {
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  // const endpoint = selectedValue;
  // let url = 'http://localhost:8000/user/department/' + endpoint + '/';

  // useEffect(() => {
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Handle the data received from the API
  //       console.log(data);
  //       // setMydata(data);
  //     })
  //     .catch(error => {
  //       // Handle any errors that occurred during the fetch
  //       console.error("Error fetching data:", error);
  //     });

  //   // navigate("/");
  // }, [selectedValue]);

  return (
    <div className="dropdownMenu">
      <label htmlFor="topic">Choose a department:</label>
      <select
        id="topic"
        name="topic"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* <p> {selectedValue}</p> */}
    </div>
  );
}

export default DropdownMenu;
