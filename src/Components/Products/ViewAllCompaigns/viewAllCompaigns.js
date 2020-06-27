import React from 'react'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'
import {withRouter} from 'react-router-dom'
import {useQuery} from '@apollo/react-hooks'
import {SINGLE_PRODUCT} from '../../apollo/Quries/singleProduct'

const ViewAllcompaign=(props) => {
    let {history,match}=props;
    let id=match.params && match.params.id ? match.params.id : "";

    return (
        <>
            <div className="container-fluid Table-for-administrator-main-div">
                {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">All Campaigns</h6>
                        <button onClick={() => history.goBack("/product")} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                {/* Table of Administrator  */}
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                    </div>
                    <div className="Table-Header">
                        <h6 className="fnt-poppins">All Compaigns</h6>
                    </div>
                    {/* Table-Title */}
                    <div className="container-fluid Table-title">
                        <div>
                            <table className="viewAnnouncement-Table">
                                <thead className="viewAnnouncement-Table-header fnt-poppins">
                                    <tr >
                                        <th className="white-color">Compaign Name</th>
                                        <th className="white-color">Compaign Type</th>
                                        <th className="white-color">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="fnt-poppins background-white">
                                        <td>Alfreds Futterkiste</td>
                                        <td>Alfreds</td>
                                        <td>
                                            <div className="appling-flex-btns">
                                                <img className="delete-image-table" alt="delete-button" src={Deletelogo} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Style />
            </div>
        </>
    );
}
export default withRouter(ViewAllcompaign);