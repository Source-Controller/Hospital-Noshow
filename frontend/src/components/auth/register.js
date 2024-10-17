import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, useAuthState, useAuthDispatch } from "../../context";
import InputForm from "../../components/elements/inputForm";
import "./home.scss";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [manage, setRole] = useState(false);

  const registerInfo = {
    email,
    password,
    username,
    manage
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log(registerInfo);
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/register/', registerInfo);
      // Handle successful registration

      if (response.status === 201) {

        localStorage.setItem('token', JSON.stringify(response.data.user_info));      localStorage.setItem('hospitalData',response.data.json_data);

        if (response.data.manage) {
          navigate('/dashboard')
        }

        else {
          navigate('/doctor')

        }


      }
      // if(response.status === 400) alert("Bad Request")
    } catch (error) {
      // Handle registration error
      if (error.response.status === 400) {
        // Handle validation errors
        const errorData = error.response.data;
        console.log(errorData)


        // Display error messages to the user
      }

    }
  };


  return (
    <div className="home-container">

      <div className="register-main" >
        <span> SIGN UP</span>
        {/* {errorMessage ? <p className="error">{errorMessage}</p> : null} */}
        <InputForm
          label={"Username"}
          placeholder={"Username"}
          type={"text"}
          handleChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputForm
          label={"Email"}
          placeholder={"www@example.com"}
          type={"text"}
          handleChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputForm
          label={"Password"}
          placeholder={"password"}
          type={"password"}
          handleChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="form-check">

          <input type="checkbox" id="user-checkbox" onChange={() => { setRole(!manage) }} />
          <label htmlFor="user-checkbox">Manager</label>
        </div>



        <button type="button" onClick={handleRegistration}>
          Sign Up
        </button>
        <div className="btn-group">
          <span>Already have an account?</span>
          <a href="#" onClick={() => { navigate('/') }}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
