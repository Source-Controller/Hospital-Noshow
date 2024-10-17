import React from "react";
import './styles.scss';

const InputForm = ({ label, type, placeholder, handleChange}) => {

  // const { label, type, placeholder} = props;

  return (
    <div className="inputForm">
      <label htmlFor={label}>{label}</label>
      <input type={type} id={label} name={label} placeholder={placeholder} onChange={handleChange} />
    </div>
  )
}

export default InputForm