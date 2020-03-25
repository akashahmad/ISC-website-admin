import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../../apollo/Mutations/createUser'
import uuid from 'uuid'
import publicIp from 'public-ip'
import ipInt from 'ip-to-int'

const AddUser = (props) => {

    let { history } = props;
    const [select, setSelect] = useState(false);
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState([]);
    const [ipAddress, setIpAddress] = useState();
    const [btnText, setBtnText] = useState("Save");
    const [data] = useMutation(CREATE_USER);

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
            setSelect(false);
            setPassword(uid.toString());
            setConfirmPassword(uid.toString());
        }
    }

    const addUser = (event) => {
        event.preventDefault();
        let currentDate = new Date();
        currentDate = currentDate.toISOString();
            data({
                variables: {
                    Name: name,
                    Email: email,
                    Password: password ? password : uid.toString(),
                    Status: "Enable",
                    CreatedDate: currentDate,
                    CreatedIp: ipInt(ipAddress).toInt()
                }
            }).then(res => {
                history.push("/users")
            })
        }


    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add user</h6>
                <button onClick={() => history.push("/users")} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form onSubmit={event => addUser(event)}>
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
                                        onChange={event => setName(event.target.value)}
                                    />
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
                            {/* Password*/}
                            {select &&
                                <div>
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Password</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator" required
                                                value={password} type="password"
                                                onChange={event => setPassword(event.target.value)} />
                                        </div>
                                    </div>
                                    {/* Confirm Password*/}
                                    {/* <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Confirm Password</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator" required
                                                value={confirmPassword} type="password"
                                                onChange={event => setConfirmPassword(event.target.value)}
                                            />
                                        </div>
                                    </div> */}
                                </div>
                            }
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <button className="cancel-btn-of-form fnt-poppins">Cancel</button>
                                <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">Save</button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

}
export default withRouter(AddUser);