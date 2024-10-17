import React, { useState } from "react";
import "./fileUpload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
export default function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
    // Additional validation logic
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    await axios.post("http://127.0.0.1:8000/user/csv/",
      formData,
    ).then((res) => {
      console.log(res.data.data)
      localStorage.setItem('hospitalData',res.data.data);
      setTimeout(() => {
        window.location.reload();
      },3000)
      clearTimeout();
    })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      })

  };

  return (
    <div className="fuf-main">
      <div className="parent">
        <div className="file-upload">
          <div>
            <FontAwesomeIcon
              className="file-icon"
              icon="fa-solid fa-cloud-arrow-up"
            />

            <h5> {selectedName || "Click here to upload"}</h5>
          </div>
          {/* <p>(Maximun file size 10MB)</p> */}
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="button" onClick={handleClick}>
          Upload
        </button>
      </div>
    </div>
  );
}
