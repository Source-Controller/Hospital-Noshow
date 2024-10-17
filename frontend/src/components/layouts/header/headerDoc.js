import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import Profile from "./profile";
import "./header.scss";
import DropdownMenu from "./dropdownMenu";

const HeaderDoc = ({user}) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleShow = () => {
    setShowProfile(!showProfile);
  };


  return (
    <div id="logo-header">
      <div className="logo-div">
        {/* <h2>Logo</h2> */}
      </div>

      <div className="header-main">
        <div className="header-select">

          <div className="header-noselect" />

        </div>
        <div className="logo-left">
          {/* <a
            className="button-lg"
            style={{ cursor: "pointer" }}
            href="http://google.gmail.com"
          >
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

export default HeaderDoc;
