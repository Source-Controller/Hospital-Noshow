import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="profile" style={{zIndex:999}}>
      {/* {user.avatar ? (
        <img src={user.avatar} alt="User Avatar" />
      ) : ( */}
        <FontAwesomeIcon icon={faUser} id="userAvatarAlt2" />
      {/* )} */}

      <h4>{user.username ? user.username : "Username"}</h4>
      {/* <span>{user.email ? user.email : "name@example.com"}</span> */}
      <div />
      <a
        className="profile-out"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/");
          localStorage.removeItem('token');
          localStorage.removeItem('hospitalData');
        }}
      >
        <span>Log Out</span>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </a>
    </div>
  );
};

export default Profile;
