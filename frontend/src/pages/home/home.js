import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, useAuthState, useAuthDispatch } from "../../context";
import InputForm from "../../components/elements/inputForm";
import "./home.scss";
import axios from "axios";
const Home = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(false);
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");

  const [data, setData] = useState(null);

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleSignIn = async () => {
    // setShow(!show);
    try {
      let response = await loginUser(dispatch, { email, password });
      if (!response.user) return;
      props.history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const loginInfo = {
    username,
    password,
  };

  const handlelogin = () => {
    // e.preventDefault();
    console.log(loginInfo)

    axios
      .post("http://127.0.0.1:8000/auth/login", loginInfo)
      .then((res) => {
        if (res.status === 200) {

          if (res.role === 'admin') {
            navigate("/dashboard");
            
          } else {
            navigate("/doctor");
            
          }
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };


  // const handleSignUp = async () => {
  //   setShow(!show);
  //   try {
  //     let response = await registerUser(dispatch, { username, email, password });
  //     if (!response.user) return;
  //     props.history.push("/dashboard");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [errormessage, setErrormessage] = useState("");
  const registerInfo = {
    email,
    password,
    username
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log(registerInfo);
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/register', registerInfo);
      // Handle successful registration

      if (response.status === 200) {
        if (response.role === 'admin') {
          navigate("/dashboard");
          
        } else {
          navigate("/doctor");
          
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
      <div className="login-left" style={{ zIndex: show ? 2 : -2 }}>
        {errorMessage ? <p className="error">{errorMessage}</p> : null}

        <InputForm
          label={"username"}
          placeholder={"www@example.com"}
          type={"text"}
          handleChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputForm
          label={"password"}
          placeholder={"password"}
          type={"password"}
          handleChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <div className="form-check">
          <input
            type="checkbox"
            id="user-checkbox"
            checked={role}
            onChange={() => {
              setRole(!role);
            }}
          />
          <label for="user-checkbox">Login as Administrator</label>
        </div>
        <button type="button" onClick={handlelogin}>
          Sign In
        </button>
      </div>
      <div className="login-right" style={{ zIndex: show ? 2 : -2 }}>
        <div className="bg-div" />
        <h3>Sign In</h3>
        <p>Welcome to Hospital</p>
        <span>Get started to Sign In</span>
        <div className="login-right-sub">
          <span>
            {" "}
            if you don't have any account then
            <br />
            <a
              href="#"
              onClick={() => {
                setShow(!show);
              }}
            >
              Click here
            </a>{" "}
            to Register!
          </span>
        </div>
      </div>
      <div className="register-right" style={{ zIndex: show ? -2 : 2 }}>
        {errorMessage ? <p className="error">{errorMessage}</p> : null}
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

        <button type="button" onClick={handleRegistration}>
          Sign Up
        </button>
      </div>
      <div className="register-left" style={{ zIndex: show ? -2 : 2 }}>
        <h3>Sign Up</h3>
        <p>Register your Info</p>
        <span>Get started to Sign In</span>
        <div className="login-right-sub">
          <span>
            {" "}
            if you aleady have account then
            <br />
            <a
              href="#"
              onClick={() => {
                setShow(!show);
              }}
            >
              Click here
            </a>{" "}
            to Login!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
