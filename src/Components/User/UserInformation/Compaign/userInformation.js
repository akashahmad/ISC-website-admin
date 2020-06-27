import React, { useState, useEffect } from 'react'
import Style from './style'
import Deletelogo from '../../../../assets/Images/delete.svg'
import Editlogo from '../../../../assets/Images/edit.svg'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { SINGLE_CAMPAIGN } from '../../../apollo/Quries/singleCampaign'
import { standardDate } from '../../../functions'
const Campaign = (props) => {
    let { history, id } = props;
    const { loading, data } = useQuery(SINGLE_CAMPAIGN(id))
    let date = data && data.getcampaignbyId && data.getcampaignbyId.CreatedDate;
    // date
    date = standardDate(date).standardDate;
    const [singleCampaignstData, setSingleCampaignstData] = useState()

    useEffect(() => {
        setSingleCampaignstData(data && data.getcampaignbyId);
    }, [data])

    return (
        <>
            <div className="container-fluid Table-for-administrator-main-div">
                {/* Table-Title */}
                <div className="container-fluid Table-title">
                    <table className="main-table-heading">
                        <thead className="heading-of-table background-color-head">
                            <tr className="table-row-of-head fnt-poppins">
                                <th>Sr.No</th>
                                <th>Name</th>
                                <th>Created By</th>
                                <th>Verified?</th>
                                <th>Support</th>
                                <th>Category</th>
                                <th>Date Created</th>
                                <th>Is Premium?</th>
                                <th>Show On Category</th>
                                <th>Status</th>
                                {/* <th className="bodr-of-none">Action</th> */}
                            </tr>
                        </thead>
                        {singleCampaignstData && singleCampaignstData.length !== 0 ?
                            <tbody className="table-of-data">
                                <tr className="table-row-data-of-body fnt-poppins">
                                    <td>{data && data.getcampaignbyId ? data.getcampaignbyId.Id : "-"}</td>
                                    <td>{data && data.getcampaignbyId ? data.getcampaignbyId.Name : "-"}</td>
                                    <td>{data && data.getcampaignbyId ? data.getcampaignbyId.CreatedBy : "-"}</td>
                                    <td>{data && data.getcampaignbyId ? data.getcampaignbyId.Verified : "-"}</td>
                                    <td>{data && data.getcampaignbyId ? data.getcampaignbyId.supportCount : "-"}</td>
                                    <td>{data && data.getcampaignbyId ? data.getcampaignbyId.CategoryId : "-"}</td>
                                    <td>{date ? date : "-"}</td>
                                    <td>{data && data.getcampaignbyId ? data.getcampaignbyId.is_campaign_aws : "-"}</td>
                                    <td>{data && data.getcampaignbyId ? data.getcampaignbyId.ShowOnList : "-"}</td>
                                    <td>{data && data.getcampaignbyId ? data.getcampaignbyId.Status : "-"}</td>
                                    {/* <td>
                                        <div className="appling-width-btns ">
                                            <div className=" is-flex image-btn-edit-delete-user-compaign">
                                                <img onClick={() => history.push("/edit-campaign")} className="cursor-pointer edit-image-table" alt="" src={Editlogo} />
                                                <img className="delete-image-table" alt="" src={Deletelogo} />
                                            </div>
                                            <div className=" btn-of-view-user-compaign has-margin-top-10">
                                                <span onClick={() => history.push("/Camapaign-details")} className="cursor-pointer view-btn-of-table">View Details</span>
                                            </div>
                                        </div>
                                    </td> */}
                                </tr>
                            </tbody>
                            :
                            <tfoot>
                                <tr>
                                    <td colSpan={11} className="fnt-size-25 fnt-weight-600 fnt-poppins" style={{ textAlign: "center" }}>No Record Found</td>
                                </tr>
                            </tfoot>
                        }
                    </table>
                </div>
            </div>
            <Style />
        </>
    );
}
export default withRouter(Campaign);