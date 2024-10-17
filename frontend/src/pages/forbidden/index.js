import React from "react";
import './styles.scss';
import { useNavigate } from "react-router-dom";

const Forbidden = () => {

  const navigate = useNavigate();

  return (

    <div className="forbidden-main">
      <h2>Forbidden</h2>
      <span>Your request is not allowed! You must be login First!</span>
      <p  onClick={() => {navigate('/')}}> Go to Login page </p>
    </div>
  )
}

export default Forbidden;

