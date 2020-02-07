import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation} from '@apollo/react-hooks';
import { CREATE_ADMIN } from '../../apollo/Mutations/createAdminMutation'
import {apiPath} from '../../../config'

const AddAdministrator = (props) => {
    let { history } = props;
    const [name,setName]=useState([]);
    const [email,setEmail]=useState([]);
    const [password,setPassword]=useState([]);
    const [roleId,setRoleId]=useState([]);
    const [status,setStatus]=useState([]);
    const [createdDate,setCreatedDate]=useState([]);
    const [createdIp,setCreatedIp]=useState([]);
    const [createdBy,setCreatedBy]=useState([]);
    const [select, setSelect] = useState(false);
    const [data] = useMutation(CREATE_ADMIN);
    const addAdmin=(event)=>{
        event.preventDefault();
        data({
            variables: {
                Name: name,
                Email: email,
                Password: password,
                RoleId:parseInt(roleId),
                Status:status,
                CreatedDate:createdDate,
                CreatedIp:parseInt(createdIp),
                CreatedBy:parseInt(createdBy)
            }
        }).then(res => {
            history.push(apiPath+"/adminLogin/" + res.data.createAdmin.error)
            window.location.reload();
        })
    }
    const hide = () => {
        if (select === false) {
            setSelect(true);
        }
        else {
            setSelect(false);
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
            <form onSubmit={(event)=>addAdmin(event)}>
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
                                    <input className="inputs-of-admistrator" value={name}
                                     onChange={event=>setName(event.target.value)}/>
                                </div>
                            </div>
                            {/* Email*/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Email</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={email}
                                    onChange={event=>setEmail(event.target.value)}/>
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
                                    <select className="inputs-of-admistrator fnt-poppins" 
                                        onChange={event=>setRoleId(event.target.value)}>
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
                                            <input className="inputs-of-admistrator" />
                                        </div>
                                    </div>
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Confirm Password</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator" />
                                        </div>
                                    </div>
                                </>
                            }
                            {/* extra data */}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Password</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={password}
                                    onChange={event=>setPassword(event.target.value)}/>
                                </div>
                            </div>
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Status</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={status}
                                    onChange={event=>setStatus(event.target.value)}/>
                                </div>
                            </div>
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>CreatedDate</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={createdDate}
                                     onChange={event=>setCreatedDate(event.target.value)}/>
                                </div>
                            </div>
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>CreatedIp</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={createdIp}
                                    onChange={event=>setCreatedIp(event.target.value)}/>
                                </div>
                            </div>
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>CreatedBy</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={createdBy}
                                     onChange={event=>setCreatedBy(event.target.value)}/>
                                </div>
                            </div>
                            
                            {/* extra inputs ends here */}

                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <button className="cursor-pointer cancel-btn-of-form fnt-poppins">Cancel</button>
                                <button className="cursor-pointer Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default withRouter(AddAdministrator);