import React, { useState } from 'react'
import Style from './style'
import Deletelogo from '../../../../assets/Images/delete.svg'
import Editlogo from '../../../../assets/Images/edit.svg'
import { withRouter } from 'react-router-dom'
import Table from './userInformation'
import { SINGLE_USER } from '../../../apollo/Quries/singleUser'
import { useQuery } from '@apollo/react-hooks'
import { standardDate } from '../../../functions'
import Loader from '../../../commonComponents/Loader/loader'
import { getParams } from '../../../functions/index'

const Campaign = (props) => {
    let { history, match , location} = props;
    const [ipAddress, setIpAddress] = useState("");
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : ""
    const { loading, data } = useQuery(SINGLE_USER(id));
    let date = data && data.getuserbyId && data.getuserbyId.CreatedDate;
    // date
    date = standardDate(date).standardDate;
    let getDate = data && data.getuserbyId && data.getuserbyId.CreatedDate;
    // time
    getDate = standardDate(getDate).time;
    // Ip 
    const publicIp = require('public-ip');
    (async () => {
        setIpAddress(await publicIp.v4());
    })();
    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="has-margin header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">User</h6>
                        <button onClick={() => history.goBack("/users?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                    {/* Table of Administrator  */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        {/* Make Admin Data */}
                        <div className="mrg-left-30">
                            <div className="heading-user fnt-poppins mrg-top-30">
                                <h3>User Information</h3>
                            </div>
                            <form>
                                {/* Name Email Role and Create Info data of Admin*/}
                                <div>
                                    <div className="mrg-top-20">
                                        <div className="flex-justify fnt-poppins">
                                            <label>Name*</label>
                                            <input className=" fnt-poppins inputs-for-responsive" disabled
                                                value={data && data.getuserbyId && data.getuserbyId.Name ? data.getuserbyId.Name : "--"}
                                            />
                                        </div>
                                    </div>
                                    <div className="mrg-top-20 fnt-poppins">
                                        <div>
                                            <div>
                                                <label>Email*</label>
                                                <input className="fnt-poppins inputs-for-responsive" disabled
                                                    value={data && data.getuserbyId && data.getuserbyId.Email ? data.getuserbyId.Email : "--"}
                                                />
                                            </div>
                                        </div>
                                        <div className="mrg-top-20 fnt-poppins">
                                            <div>
                                                <label>Facebook Link*</label>
                                                <input className="fnt-poppins inputs-for-responsive" disabled
                                                    value={data && data.getuserbyId && data.getuserbyId.FacebookId ? data.getuserbyId.FacebookId : "--"}
                                                />
                                            </div>
                                        </div>
                                        <div className="mrg-top-20 has-margin-bottom-30 fnt-poppins">
                                            <div>
                                                <label>Create Info*</label>
                                                <input className="fnt-poppins inputs-for-responsive" disabled
                                                    value={date ? date : "--"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="Table-Header">
                            <div className="is-flex">
                                <h6 onClick={() => history.push("/user-information-activities/" + id)} className="cursor-pointer fnt-poppins">User Activity</h6>
                                <h6 onClick={() => history.push("/user-information-campaings/" + id)} className="cursor-pointer fnt-poppins mrg-left-20 border-bottom-inside-header-of-table">Compaign</h6>
                            </div>
                        </div>
                        <Table id={id} />
                    </div>
                    <Style />
                </div>
                : <Loader />}
        </>
    );
}
export default withRouter(Campaign);