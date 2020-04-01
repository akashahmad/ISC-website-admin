import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import { CREATE_ADMIN } from '../../apollo/Mutations/createadminmutation'
import uuid from 'uuid'
import publicIp from 'public-ip'
import ipInt from 'ip-to-int'

const AddAdministrator = (props) => {

    let { history } = props;
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [roleId, setRoleId] = useState([]);
    const [status, setStatus] = useState([]);
    const [select, setSelect] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [btnText, setBtnText] = useState("Save");
    const [ipAddress, setIpAddress] = useState();
    const [data] = useMutation(CREATE_ADMIN);
    const [RoleValidtion, setRoleValidation] = useState(false);

    let uid = uuid();

    useEffect(() => {
        publicIp.v4().then(ip => {
            setIpAddress(ip);
        })
    }, [])

    const hide = () => {
        if (select === false) {
            setSelect(true);
        }
        else {
            setPassword(uid.toString());
            setConfirmPassword(setPassword);
            setSelect(false);
        }
    }

    const addAdmin = (event) => {
        event.preventDefault();
        let currentDate = new Date();
        currentDate = currentDate.toISOString();



        if (select == false) {
            if (!roleId) {
                setRoleValidation(true)
            }
            else {
                data({
                    variables: {
                        Name: name,
                        Email: email,
                        Password: uid.toString(),
                        RoleId: parseInt(roleId),
                        Status: "Enable",
                        CreatedDate: currentDate,
                        CreatedIp: ipInt(ipAddress).toInt(),
                        CreatedBy: 1
                    }
                }).then(res => {
                    history.push("/administrator")
                })
            }
        }
        else if (select === true) {
            if (!roleId) {
                setRoleValidation(true)
            }
            else if (password == confirmPassword) {
                data({
                    variables: {
                        Name: name,
                        Email: email,
                        Password: password,
                        RoleId: parseInt(roleId),
                        Status: "Enable",
                        CreatedDate: currentDate,
                        CreatedIp: ipInt(ipAddress).toInt(),
                        CreatedBy: 1
                    }
                }).then(res => {
                    history.push("/administrator")
                })
            }
        }
    }


    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add Administrator</h6>
                <button onClick={() => history.push("/administrator")} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
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
                                    <label>Name</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={name} required
                                        onChange={event => { setName(event.target.value) }} />
                                </div>
                            </div>
                            {/* Email*/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Email</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" type="email" value={email} required
                                        onChange={event => setEmail(event.target.value)} />
                                </div>
                            </div>
                            {/* Select Password*/}
                            <div className="mrg-left-60 fnt-poppins mrg-top-20">
                                <div>
                                    <label>Select Password</label>
                                </div>
                                <div className="mrg-top-10">
                                    <select className="inputs-of-admistrator fnt-poppins" onChange={() => hide(false)}>
                                        <option>Random Password</option>
                                        <option>Custom Password</option>
                                    </select>
                                </div>
                            </div>
                            {/* Select Role*/}
                            <div className="mrg-left-60 fnt-poppins mrg-top-20">
                                <div>
                                    <label>Select Role</label>
                                </div>
                                <div className="mrg-top-10">
                                    <select className="inputs-of-admistrator fnt-poppins" required
                                        onChange={event => {
                                            setRoleValidation(false)
                                            setRoleId(event.target.value)
                                        }
                                        }>
                                        <option >Select Role</option>
                                        <option value="1">Super Admin</option>
                                        <option value="2">Moderator</option>
                                        <option value="3">Creater</option>
                                    </select>
                                    
                                </div>
                            </div>
                            {/* Password*/}
                            {select &&
                                <>
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Password</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input type="password" className="inputs-of-admistrator" value={password} required
                                                onChange={event => setPassword(event.target.value)} />
                                        </div>
                                    </div>
                                </>
                            }
                            {/* extra data */}
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <button className="cursor-pointer cancel-btn-of-form fnt-poppins">Cancel</button>
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