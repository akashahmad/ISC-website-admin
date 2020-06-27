import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Stylejs from './style';
import Logo from '../../assets/Images/ISC_logo.png'
import '../../assets/Style/Common.scss'
import axios from 'axios';
import cookie from 'react-cookies'
import { apiPath } from '../../config'
import { validateEmail } from '../commonComponents/utils'

const Signin = (props) => {

    let { history } = props;
    const [email, setEmail] = useState("");
    const [emailValidator, setEmailValidator] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordValidator, setPasswordValidator] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const [btnText, setBtnText] = useState("Signin");

    // method for authentication
    const userAuthentication = e => {
        e.preventDefault();
        if (!email || !validateEmail(email) || !password || password.length < 8) {
            if (!email) {
                setEmailValidator(true)
                // setBtnText("Signing")
            }
            if (!validateEmail(email)) {
                setEmailValidator(true)
                // setBtnText("Signing")
            }
            if (!password || password.length < 8) {
                setPasswordValidator(true)
                // setBtnText("Signing")
            }
        }
        else {
            setBtnText("Signing");
            let payLoad = { Email: email, Password: password };
            axios.post(apiPath + "/adminLogin", payLoad).then(response => {
                localStorage.setItem("age", remember ? 1296000 : 86400);
                cookie.save('token', response.data.token, { maxAge: (remember ? 1296000 : 86400), path: "/" });
                history.push("/");
                setEmail("");
                setPassword("");
            })
                .catch(err => {
                    if (err.message === "Request failed with status code 404") {
                        setError("Invalid Email or Password");
                        setBtnText("Signin");
                    }
                    else if (err.message === "Request failed with status code 500") {
                        setError("Email does not exist");
                        setBtnText("Signin");
                    }
                });
        }
    };
    return (
        <div className="Container-fluid login-background-color">
            <div className="login">
                <div className="login-picture">
                    <div className="image-portion fnt-poppins">
                        <img src={Logo} alt="" />
                    </div>
                </div>
                <div className="login-form">
                    <form className="input-form" onSubmit={(event) => userAuthentication(event)}>
                        <h2 className="Sign-in fnt-poppins">Sign in</h2>
                        <input className="has-margin-top-60 input-text flirt fnt-poppins" name="User" placeholder="Email"
                            onChange={event => {
                                setEmailValidator(false);
                                setEmail(event.target.value)
                            }}
                        />
                        {emailValidator ?
                            <p className="help is-danger required-field-text">{email ? "Invalid email address" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}

                        <input className="input-text signin-input fnt-poppins" name="password" placeholder="Password" type="Password"
                            onChange={event => {
                                setPasswordValidator(false);
                                setPassword(event.target.value)
                            }}
                        />
                        {passwordValidator ?
                            <p className="help is-danger required-field-text">{password ? "Password length should be 8 characters" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}

                        <div style={{ color: "red" }}>
                            {error}
                        </div>
                        <div className="custom-control checkbox-sigin-page custom-checkbox signin-checkbox">
                            <input id="checked" className="custom-control-input has-margin-top-5" type="checkbox"
                                onChange={event => setRemember(event.target.checked)}
                                checked={remember}
                            />
                            <label for="checked" className="custom-control-label" />
                            <div className="checkbox-data fnt-poppins has-margin-left-10">Remember me</div>
                        </div>
                        <div className="btns-of-add has-margin-left-40 has-margin-top-30 fnt-poppins">
                            <span className="cancel-btn-of-sigin span-btn-style fnt-poppins has-cursor-pointer">Cancel</span>
                            <button className="Save-btn-of-signin has-margin-left-20 fnt-poppins has-cursor-pointer" type="submit">{btnText}</button>
                        </div>
                    </form>
                </div>
            </div>
            <Stylejs />
        </div>);
};
export default withRouter(Signin);
