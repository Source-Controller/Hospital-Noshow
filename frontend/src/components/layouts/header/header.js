import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import Profile from "./profile";
import "./header.scss";
import DropdownMenu from "./dropdownMenu";
import background from '../../../assets/images/logo.png'

const Header = ({ setSelectedCategory, user }) => {
  const [showProfile, setShowProfile] = useState(false);

  const [selectedValue, setSelectedValue] = useState("All");

  const handleShow = () => {
    setShowProfile(!showProfile);
  };

  const options = [
    "all",
    "Ophthalmology",
    "Obstetrics and Gynecology",
    "Urogynecology",
    "Pediatric Urology",
    "Internal Medicine",
    "Pediatric Otolaryngology",
    "Endocrinology",
    "Cardiology",
    "Pulmonology",
    "Family Medicine",
    "Rheumatology",
    "Gynecologic Oncology",
    "Audiology",
    "Otolaryngology",
    "Orthopedic Surgery",
    "Pediatric Neurology",
    "Vascular Surgery",
    "Pediatric Cardiology",
    "Pediatric Ophthalmology",
    "Pediatric Nephrology",
    "Hematology",
    "Sleep Medicine",
    "Dermatology",
    "Pediatrics",
    "Pediatric Plastic Surgery",
    "Urology",
    "Neurology",
    "Colon and Rectal Surgery",
    "Pediatric Gastroenterology",
    "Pediatric Neurosurgery",
    "Gastroenterology",
    "General Surgery",
    "Pediatric Genetics",
    "Pediatric Endocrinology",
    "Neurosurgery",
    "Nephrology",
    "Pediatric Allergy",
    "Pediatric Surgery",
    "Physical Medicine and Rehabilitation",
    "Pediatric Pulmonology",
    "Geriatric Medicine",
    "Infectious Diseases",
    "Oral Surgery",
    "Plastic Surgery",
    "Oncology",
    "*No specialty",
    "Neuropsychology",
    "Pediatric Hematology",
    "Pediatric Rheumatology",
    "Pain Medicine",
    "Psychiatry",
    "Radiology",
    "Adolescent Medicine",
    "Psychology",
    "Pediatric Psychiatry",
    "Maternal and Fetal Medicine",
    "Nutrition",
    "Pediatric Infectious Disease",
    "Primary Care",
    "Allergy and Immunology",
    "Employee Health",
    "Behavioral Health",
    "Physical Therapy",
    "Interventional Radiology",
  ];

  useEffect(() => {
    setSelectedCategory(selectedValue);
  }, [selectedValue]);

  return (
    <div id="logo-header">
      <div className="logo-div">
        {/* <img src={background} width={'100%'} height={'30%'} /> */}
        
        {/* <h2>Logo</h2> */}
      </div>

      <div className="header-main">
        <div className="header-select">

          <DropdownMenu
            options={options}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />


        </div>
        <div className="logo-left">
          {/* <a
            className="button-lg"
            style={{ cursor: "pointer" }}
            href="http://google.gmail.com"
          >
            <span>Email</span>
            <FontAwesomeIcon icon={faEnvelope} />
          </a> */}

          {/* {user.avatar ? (
            <img src={user.avatar} id="user_avatar" onClick={handleShow} />
          ) : ( */}
            <div className="header-avatar" onClick={handleShow}>
              <span>{user.username}</span>
              <FontAwesomeIcon icon={faUser} id="userAvatarAlt" />
            </div>
          {/* )} */}
        </div>
      </div>

      {showProfile ? (
        <div
          className="profile-div"
          onMouseLeave={() => {
            setShowProfile(!showProfile);
          }}
        >
          <Profile user={user} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
