import React, { useState, useEffect } from 'react'
import Style from './style'
import { withRouter } from 'react-router-dom'
import { SINGLE_USER } from '../../../apollo/Quries/singleUser'
import { useQuery } from '@apollo/react-hooks'
import { standardDate } from '../../../functions'
import { viewActivities_img } from '../../../../config'
import ipInt from 'ip-to-int'
import Loader from '../../../commonComponents/Loader/loader'
import { getParams } from '../../../functions/index'

const UserInformation = (props) => {
    let { history, match , location} = props;
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : ""
    const { loading, data } = useQuery(SINGLE_USER(id));
    const [userActivityData, setUserActivityData] = useState()
    let date = data && data.getuserbyId && data.getuserbyId.CreatedDate;
    date = standardDate(date).standardDate;
    let getDate = data && data.getuserbyId && data.getuserbyId.CreatedDate;
    getDate = standardDate(getDate).time;

    useEffect(() => {
        setUserActivityData(data && data.getuserbyId && data.getuserbyId.useractivity);
    }, [data])


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
                                <h6 onClick={() => history.push("/user-information-activities/" + id)} className="cursor-pointer fnt-poppins  mrg-left-20 border-bottom-inside-header-of-table">User Activity</h6>
                                <h6 onClick={() => history.push("/user-information-campaings/" + id)} className="cursor-pointer fnt-poppins has-padding-left-20">Compaign</h6>
                            </div>
                        </div>
                        {/* Table-Title */}
                        <div className="container-fluid Table-title">
                            <table className="main-table-heading">
                                <thead className="heading-of-table background-color-head">
                                    <tr className="table-row-of-head fnt-poppins">
                                        <th>Image</th>
                                        <th>Type</th>
                                        <th>Campaign/Country Name</th>
                                        <th>Time</th>
                                        <th className="bodr-of-none">IP Address</th>
                                    </tr>
                                </thead>
                                {userActivityData && userActivityData.length !== 0 ? userActivityData.map(single =>
                                    <tbody className="table-of-data">
                                        <tr className="table-row-data-of-body fnt-poppins">
                                            {single && single.Image ?
                                                <td className="has-margin-top-15" style={{
                                                    backgroundImage: `url(${single.Image ? viewActivities_img + single.Image : "no image"})`,
                                                    backgroundSize: 'contain',
                                                    height: '143px',
                                                    backgroundRepeat: 'no-repeat'
                                                }}></td>
                                                :
                                                <div style={{ marginTop: "10px", marginLeft: "20px", height: '143px' }}>No-Image</div>}
                                            <td>{single.Type ? single.Type : "--"}</td>
                                            <td>{single.CampaignName && single.CampaignName.Name ? single.CampaignName.Name : "--"}</td>
                                            <td>{getDate ? getDate : "--"}</td>
                                            <td>{single.CreatedIp ? ipInt(single.CreatedIp).toIP() : ""}</td>
                                        </tr>

                                    </tbody>
                                ) :
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5} className="fnt-size-25 fnt-weight-600 fnt-poppins" style={{textAlign:"center"}}>No Record Found</td>
                                        </tr>
                                    </tfoot>
                                }
                            </table>
                        </div>

                    </div>

                    <Style />
                </div>

                : <Loader />
            }
        </>
    );
}
export default withRouter(UserInformation);