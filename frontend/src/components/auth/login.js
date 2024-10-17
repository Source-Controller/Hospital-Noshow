import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginUser, registerUser, useAuthState, useAuthDispatch } from "../../context";
import InputForm from "../../components/elements/inputForm";
import "./home.scss";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginInfo = {
        username,
        password,
    };


    const handlelogin = (e) => {
        e.preventDefault();
        console.log(loginInfo)

        axios
            .post("http://127.0.0.1:8000/user/login/", loginInfo)
            .then((res) => {
                console.log(res,'1')
                if (res.status === 200) {

                    console.log(res.data,'userinfo');
                    // setUserInfo(res.data);
                    console.log(res.data.user_info,'2')
                    localStorage.setItem('token', JSON.stringify(res.data.user_info));      localStorage.setItem('hospitalData',res.data.json_data);

                    if (res.data.user_info.manage) {

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

    return (

        <div className="home-container">
            <div className="login-main">


                {/* {errorMessage ? <p className="error">{errorMessage}</p> : null} */}
                <span>SIGN IN</span>

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

                <button type="button" onClick={handlelogin}>
                    Sign In
                </button>
                <div className="btn-group">
                    <span>Don't have an Account? </span>
                    <a href="#" onClick={() => { navigate('/register') }}>
                        Create Account
                    </a>

                </div>
            </div>

        </div>

    );
};

export default Login;
