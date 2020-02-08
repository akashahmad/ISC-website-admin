import React, { useState } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import { withRouter } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { useQuery } from '@apollo/react-hooks';
import { ADMIN_DASHBOARD } from '../../apollo/Quries/adminstratorQuries'
import Loader from '../../commonComponents/Loader/loader'
const ViewAdministrator = (props) => {
    let { history } = props;
    const { loading, error, data } = useQuery(ADMIN_DASHBOARD);
    // Loader
    if (loading) return <Loader/> 
    return (
        <>
            <div className="container-fluid Table-for-administrator-main-div">
                {/* header */}
                <div className="header-of-viewAdministrator">
                    <h6 className="heading6-of-header fnt-poppins">Administrator</h6>
                    <button onClick={() => history.push("/add-administrator")} className="cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                </div>
                {/* Table of Administrator  */}
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                    </div>
                    <div className="Table-Header">
                        <h6 className="fnt-poppins">All Admins Record</h6>
                        <select className="select-option-of-adminstrator fnt-poppins">
                            <option>Select Admin Status</option>
                            <option>Active</option>
                            <option>In-Active</option>
                        </select>
                        <input className="input-for-search fnt-poppins" placeholder="Search" />
                    </div>
                    {/* Table-Title */}
                    <div className="container-fluid Table-title">
                        <table className="main-table-heading">
                            <thead className="heading-of-table background-color-head">
                                <tr className="table-row-of-head fnt-poppins">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>User Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-of-data">
                                {data && data.admins.map(sin =>
                                    <tr className="table-row-data-of-body fnt-poppins">
                                        <td>{sin.Name}</td>
                                        <td>{sin.Email}</td>
                                        <td>{sin.Status}</td>
                                        <td>{sin.RoleId}</td>
                                        <td>
                                            <div style={{ display: "flex" }}>
                                                <img onClick={() => history.push("/edit-administrator")} className="cursor-pointer edit-image-table" alt="edit-button" src={Editlogo} />
                                                <img className="delete-image-table" alt="delete-button" src={Deletelogo} />
                                                <span onClick={() => history.push("/admin-information")} className="cursor-pointer view-btn-of-table hgt-setng">View Details</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                <tr className="table-footer">
                                    <td>Total</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Number</td>
                                </tr>

                            </tbody>
                        </table>
                        <div className="has-margin-top-40">
                            <ReactPaginate previousLabel={<span className="fa fa-chevron-right "> &#60; </span>}
                                nextLabel={<span className="fa fa-chevron-right "> > </span>}
                                breakLabel={". . ."}
                                breakClassName={"break-me"}
                                pageCount={5}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={5}
                                containerClassName={"digit-icons main"}
                                subContainerClassName={"container column"}
                                activeClassName={"p-one"} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default withRouter(ViewAdministrator);