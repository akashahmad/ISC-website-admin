import React, { useState, useEffect } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks'
import { ADMIN } from '../../apollo/Mutations/adminMutation'
import ReactPaginate from "react-paginate";
import { DELETE_ADMIN } from '../../apollo/Mutations/deleteAdmin'
import { getParams } from '../../functions/index'
import ContentLoader from 'react-content-loader'

const ViewAdministrator = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [users, setUsers] = useState([]);
    const [allPages] = useMutation(ADMIN);
    const [totalPages, setTotalPage] = useState(1);
    const [totalCustomers, setTotalCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [deleteAdmin] = useMutation(DELETE_ADMIN);
    const [adminStatus, setAdminStatus] = useState("")
    const [search, setSearch] = useState([]);

    // method for search Name
    const searchHandler = (value) => {
        let resultData = users ? users.filter(sin => sin.Name.toLowerCase().indexOf(value.toLowerCase()) !== -1) : []
        setSearch(resultData);
    }

    // method for pagination
    const pageHandler = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/administrator?page=" + (parseInt(value.selected) + 1));
        allPages({
            variables: {
                page: parseInt(value.selected) + 1,
                limit: 10,
                Status: adminStatus
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
            setTotalPage(response && response.data.adminspagination ? response.data.adminspagination.totalPages : [1]);
            setTotalCustomers(response && response.data.adminspagination && response.data.adminspagination.totaladmins);
            setSearch(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
        })
    }

    useEffect(() => {
        allPages({
            variables: {
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
                limit: 10,
                Status: adminStatus
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
            setTotalPage(response && response.data.adminspagination ? response.data.adminspagination.totalPages : [1]);
            setTotalCustomers(response && response.data.adminspagination && response.data.adminspagination.totaladmins);
            setSearch(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
        })
    }, [])

    // method for deleting data
    const deleteAdminData = (id) => {
        deleteAdmin({
            variables: {
                Id: parseInt(id),
            }
        }).then(res => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/administrator")
        })
    }

    // method for selection to searching data 
    const typeHandler = (value) => {
        switch (value) {
            case "": {
                setAdminStatus(value)
                allPages({
                    variables: {
                        page: page,
                        limit: 10,
                        Status: ""
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
                    setTotalPage(response && response.data.adminspagination ? response.data.adminspagination.totalPages : [1]);
                    setTotalCustomers(response && response.data.adminspagination && response.data.adminspagination.totaladmins);
                    setSearch(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
                })
                return;
            }
            case "Enable": {
                setAdminStatus(value)
                allPages({
                    variables: {
                        page: page,
                        limit: 10,
                        Status: "Enable"
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
                    setTotalPage(response && response.data.adminspagination ? response.data.adminspagination.totalPages : [1]);
                    setTotalCustomers(response && response.data.adminspagination && response.data.adminspagination.totaladmins);
                    setSearch(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
                })
                return;
            }
            case "Delete": {
                setAdminStatus(value)
                allPages({
                    variables: {
                        page: page,
                        limit: 10,
                        Status: "Delete"
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
                    setTotalPage(response && response.data.adminspagination ? response.data.adminspagination.totalPages : [1]);
                    setTotalCustomers(response && response.data.adminspagination && response.data.adminspagination.totaladmins);
                    setSearch(response && response.data && response.data.adminspagination ? response.data.adminspagination.admins : []);
                })
                return;
            }
        }
    }


    return (
        <>
            {users && users.length !== 0 ?
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
                            <select className="select-option-of-adminstrator fnt-poppins"
                                onChange={event => typeHandler(event.target.value)}
                            >
                                <option>Select Admin Status</option>
                                <option value="">All</option>
                                <option value="Enable">Active</option>
                                <option value="Delete">In-Active</option>
                            </select>
                            <input className="input-for-search fnt-poppins" placeholder="Search Name"
                                onChange={event => {
                                    searchHandler(event.target.value)
                                }}
                                type="text"
                            />
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
                                    {search && search.length !== 0 && search.map((single, index) =>
                                        <tr key={index} className="table-row-data-of-body fnt-poppins">
                                            <td>{single.Name ? single.Name : "-"}</td>
                                            <td>{single.Email ? single.Email : "-"}</td>
                                            <td>{single.Status ? single.Status : "-"}</td>
                                            {single && single.RoleId == 1 ?
                                                <div>
                                                    <td>{single && single.RoleId == 1 ? "Super Admin" : ""}</td>
                                                </div>
                                                : ""}
                                            {single && single.RoleId == 2 ?
                                                <div>
                                                    <td>{single && single.RoleId == 2 ? "Moderator" : ""}</td>
                                                </div>
                                                : ""}
                                            {single && single.RoleId == 3 ?
                                                <div>
                                                    <td>{single && single.RoleId == 3 ? "Creater" : ""}</td>
                                                </div>
                                                : ""}
                                            <td>
                                                <div style={{ display: "flex" }}>
                                                    <img onClick={() => history.push("/edit-administrator/" + single.Id)} className="cursor-pointer edit-image-table" alt="edit-button" src={Editlogo} />
                                                    <img className="has-cursor-pointer delete-image-table" alt="delete-button" onClick={() => deleteAdminData(single.Id)} src={Deletelogo} />
                                                    <span onClick={() => history.push("/admin-information/" + single.Id)} className="cursor-pointer view-btn-of-table hgt-setng">View Details</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="table-footer">
                                        <td colspan={4}>Total</td>
                                        <td>{totalCustomers}</td>
                                    </tr>

                                </tbody>
                            </table>
                            <div className="has-margin-top-40">
                                <ReactPaginate previousLabel={<span className="fa fa-chevron-right "> &#60; </span>}
                                    nextLabel={<span className="fa fa-chevron-right "> > </span>}
                                    breakLabel={". . ."}
                                    breakClassName={"break-me"}
                                    pageCount={totalPages}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={pageHandler}
                                    containerClassName={"digit-icons main"}
                                    subContainerClassName={"container column"}
                                    activeClassName={"p-one"}
                                    forcePage={path && parseInt(path.page) ? (parseInt(path.page) - 1) : 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <ContentLoader
                    speed={2}
                    viewBox="0 0 1000 550"
                    backgroundColor="#eaeced"
                    foregroundColor="#ffffff"
                    {...props}
                >
                    <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
                    <circle cx="879" cy="123" r="11" />
                    <circle cx="914" cy="123" r="11" />
                    <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
                    <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
                    <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
                    <circle cx="880" cy="184" r="11" />
                    <circle cx="915" cy="184" r="11" />
                    <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
                    <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
                    <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
                    <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
                    <circle cx="881" cy="242" r="11" />
                    <circle cx="916" cy="242" r="11" />
                    <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
                    <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
                    <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
                    <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
                    <circle cx="882" cy="303" r="11" />
                    <circle cx="917" cy="303" r="11" />
                    <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
                    <rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
                    <circle cx="881" cy="363" r="11" />
                    <circle cx="916" cy="363" r="11" />
                    <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
                    <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
                    <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
                    <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
                    <circle cx="882" cy="424" r="11" />
                    <circle cx="917" cy="424" r="11" />
                    <rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
                    <rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
                    <rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
                    <circle cx="882" cy="484" r="11" />
                    <circle cx="917" cy="484" r="11" />
                    <rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
                    <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
                    <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
                    <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
                    <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
                    <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
                    <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
                </ContentLoader>
            }
        </>
    );
}
export default withRouter(ViewAdministrator);