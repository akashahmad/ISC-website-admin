import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import { CREATE_ADMIN } from '../../apollo/Mutations/createadminmutation'
import uuid from 'uuid'
import publicIp from 'public-ip'
import ipInt from 'ip-to-int'
import { getParams } from '../../functions'

const AddAdministrator = (props) => {

    let { history, location } = props;
    let path = getParams(location.search);
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [roleId, setRoleId] = useState([]);
    const [select, setSelect] = useState(false);
    const [btnText, setBtnText] = useState("Create");
    const [ipAddress, setIpAddress] = useState();
    const [data] = useMutation(CREATE_ADMIN);
    const [roleValidtion, setRoleValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);

    let uid = uuid();
    useEffect(() => {
        publicIp.v4().then(ip => {
            setIpAddress(ip);
        })
    }, [])

    const addAdmin = (event) => {
        event.preventDefault();
        let currentDate = new Date();
        currentDate = currentDate.toISOString();
        if (confirmPassword !== password) {
            setBtnText("Create");
            setPasswordValidation(true);
        }
        if (!roleId || roleId === "") {
            setBtnText("Create");
            setRoleValidation(true);
        }
        else if (password === "" || confirmPassword === "") {
            setBtnText("Creating...")
            data({
                variables: {
                    Name: name,
                    Email: email,
                    Password: uid.toString(),
                    RoleId: parseInt(roleId),
                    Status: "Enable",
                    CreatedDate: currentDate,
                    CreatedIp: ipInt(ipAddress).toInt()
                }
            }).then(res => {
                if (res.data.createAdmin.error) {
                    window.alert(res.data.createAdmin.error)
                    setBtnText("Create")
                }
                else {
                    history.push("/administrator")
                }
            }).catch(error => {
                setBtnText("Create")
            })
        }
        else if (password === confirmPassword) {
            setBtnText("Creating...")
            data({
                variables: {
                    Name: name,
                    Email: email,
                    Password: password,
                    RoleId: parseInt(roleId),
                    Status: "Enable",
                    CreatedDate: currentDate,
                    CreatedIp: ipInt(ipAddress).toInt()
                }
            }).then(res => {
                if (res.data.createAdmin.error) {
                    window.alert(res.data.createAdmin.error)
                    setBtnText("Create")
                }
                else {
                    history.push("/administrator")
                }
            }).catch(error => {
                setBtnText("Create")
            })
        }
    }


    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add Administrator</h6>
                <button onClick={() => history.goBack("/administrator?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form onSubmit={(event) => addAdmin(event)}>
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                        <div className="blanck-dev"></div>
                        {/* Table Section */}
                        <div className="Form-section-startup">
                            <div className="has-margin-bottom-20 extra-div">
                            </div>
                            {/* Name*/}
                            <div className="mrg-left-60 fnt-poppins">
                                <div>
                                    <label>Name*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={name} required
                                        onChange={event => { setName(event.target.value) }} />
                                </div>
                            </div>
                            {/* Email*/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Email*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" type="email" value={email} required
                                        onChange={event => setEmail(event.target.value)} />
                                </div>
                            </div>
                            {/* Select Password*/}
                            <div className="mrg-left-60 fnt-poppins mrg-top-20">
                                <div>
                                    <label>Select Password*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <select className="inputs-of-admistrator fnt-poppins" onChange={event => {
                                        if (select === false) {
                                            setSelect(true);
                                        }
                                        else if (select === true) {
                                            setPassword(uid.toString());
                                            setConfirmPassword(uid.toString());
                                            setSelect(false);
                                        }
                                    }}>
                                        <option>Random Password</option>
                                        <option>Custom Password</option>
                                    </select>
                                </div>
                            </div>
                            {/* Select Role*/}
                            <div className="mrg-left-60 fnt-poppins mrg-top-20">
                                <div>
                                    <label>Select Role*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <select className="inputs-of-admistrator fnt-poppins" required
                                        onChange={event => {
                                            setRoleValidation(false)
                                            setRoleId(event.target.value)
                                        }
                                        }>
                                        <option value="">Select Role</option>
                                        <option value="1">Super Admin</option>
                                        <option value="2">Moderator</option>
                                        <option value="3">Creater</option>
                                    </select>
                                    <div className="color-red-text has-margin-left-60 has-margin-top-20">
                                        {roleValidtion ? "Select Role" : ""}
                                    </div>
                                </div>
                            </div>
                            {/* Password*/}
                            {select &&
                                <>
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Password*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input type="password" className="inputs-of-admistrator" value={password} required
                                                onChange={event => {
                                                    setPasswordValidation(false)
                                                    setPassword(event.target.value)
                                                }} />
                                        </div>
                                    </div>
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Confirm Password*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input type="password" className="inputs-of-admistrator" value={confirmPassword} required
                                                onChange={event => {
                                                    setPasswordValidation(false)
                                                    setConfirmPassword(event.target.value)
                                                }} />
                                        </div>
                                    </div>
                                    <div className="color-red-text has-margin-left-60 has-margin-top-20">
                                        {passwordValidation ? "Password not matched" : ""}
                                    </div>
                                </>
                            }
                            {/* extra data */}
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <span className="cursor-pointer cancel-btn-of-form fnt-poppins"
                                    onClick={() => history.goBack("/administrator?page=" + path)}
                                >Cancel</span>
                                <button className="cursor-pointer Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">{btnText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default withRouter(AddAdministrator);