import React, { useState, useEffect } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'
import { withRouter } from 'react-router-dom'
import { ALL_USERS } from '../../apollo/Mutations/usersMutation'
import { useMutation } from '@apollo/react-hooks';
import { DELETE_USER } from '../../apollo/Mutations/deleteUser'
import ReactPaginate from "react-paginate";
import { getParams } from '../../functions/index'
import ContentLoader from 'react-content-loader'
import axios, { CancelToken } from "axios";
import { apiPath } from '../../../config'
let cancel;
let cancel2;

const ViewUser = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [users, setUsers] = useState([]);
    const [allUsers] = useMutation(ALL_USERS);
    const [deleteuser] = useMutation(DELETE_USER);
    const [totalPages, setTotalPage] = useState(1);
    const [totalCustomers, setTotalCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [userStatus, setUserStatus] = useState("");
    const [search, setSearch] = useState([]);


    const searchHandler = (value) => {
        if (value.length >= 2) {
            cancel && cancel();
            axios.post(
                apiPath + "/userNameSearch",
                {
                    Name: value
                },
                {
                    cancelToken: new CancelToken(function executor(c) {
                        // An executor function receives a cancel function as a parameter
                        cancel = c;
                    })
                }
            )
                .then(res => {
                    setTotalCustomers(res && res.data && res.data.users && res.data.users.length);
                    setSearch(res && res.data && res.data.users);
                    setTotalPage([1]);
                })
        }
        else if (value.length === 0) {
            allUsers({
                variables: {
                    page: path && parseInt(path.page) ? parseInt(path.page) : page,
                    limit: 10,
                    Status: ""
                }
            }
            ).then(response => {
                setUsers(response && response.data && response.data.users ? response.data.users.users : []);
                setTotalPage(response && response.data.users ? response.data.users.totalPages : [1]);
                setTotalCustomers(response && response.data.users && response.data.users.totalusers);
                setSearch(response && response.data && response.data.users ? response.data.users.users : []);
            })
        }
    }

    // searchEmail method
    const searchEmailHandler = (value) => {
        if (value.length >= 2) {
            cancel2 && cancel2();
            axios.post(
                apiPath + "/userByEmailSearch",
                {
                    Email: value
                },
                {
                    cancelToken: new CancelToken(function executor(c) {
                        // An executor function receives a cancel function as a parameter
                        cancel2 = c;
                    })
                }
            )
                .then(res => {
                    setTotalCustomers(res && res.data && res.data.users && res.data.users.length);
                    setSearch(res && res.data && res.data.users);
                    setTotalPage([1]);
                })
        }
        else if (value.length === 0) {
            allUsers({
                variables: {
                    page: path && parseInt(path.page) ? parseInt(path.page) : page,
                    limit: 10,
                    Status: ""
                }
            }
            ).then(response => {
                setUsers(response && response.data && response.data.users ? response.data.users.users : []);
                setTotalPage(response && response.data.users ? response.data.users.totalPages : [1]);
                setTotalCustomers(response && response.data.users && response.data.users.totalusers);
                setSearch(response && response.data && response.data.users ? response.data.users.users : []);
            })
        }
    }

    const pageHandler = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/users?page=" + (parseInt(value.selected) + 1));
        allUsers({
            variables: {
                page: parseInt(value.selected) + 1,
                limit: 10,
                Status: ""
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.users ? response.data.users.users : []);
            setTotalPage(response && response.data.users ? response.data.users.totalPages : [1]);
            setTotalCustomers(response && response.data.users && response.data.users.totalusers);
            setSearch(response && response.data && response.data.users ? response.data.users.users : []);
        })
    }

    useEffect(() => {
        allUsers({
            variables: {
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
                limit: 10,
                Status: ""
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.users ? response.data.users.users : []);
            setTotalPage(response && response.data.users ? response.data.users.totalPages : [1]);
            setTotalCustomers(response && response.data.users && response.data.users.totalusers);
            setSearch(response && response.data && response.data.users ? response.data.users.users : []);
        })
    }, [])

    const deleteUsers = (Id) => {
        deleteuser({
            variables: {
                Id: parseInt(Id),
            }
        }).then(response => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/users")
        })
    }

    const typeHandler = (value) => {
        switch (value) {
            case "": {
                setUserStatus(value)
                allUsers({
                    variables: {
                        page: 1,
                        limit: 10,
                        Status: ""
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.users ? response.data.users.users : []);
                    setTotalPage(response && response.data.users ? response.data.users.totalPages : [1]);
                    setTotalCustomers(response && response.data.users && response.data.users.totalusers);
                    setSearch(response && response.data && response.data.users ? response.data.users.users : []);
                })
                return;
            }
            case "Enable": {
                setUserStatus(value)
                allUsers({
                    variables: {
                        page: 1,
                        limit: 10,
                        Status: "Enable"
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.users ? response.data.users.users : []);
                    setTotalPage(response && response.data.users ? response.data.users.totalPages : [1]);
                    setTotalCustomers(response && response.data.users && response.data.users.totalusers);
                    setSearch(response && response.data && response.data.users ? response.data.users.users : []);
                })
                return;
            }
            case "Delete": {
                setUserStatus(value)
                allUsers({
                    variables: {
                        page: 1,
                        limit: 10,
                        Status: "Delete"
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.users ? response.data.users.users : []);
                    setTotalPage(response && response.data.users ? response.data.users.totalPages : [1]);
                    setTotalCustomers(response && response.data.users && response.data.users.totalusers);
                    setSearch(response && response.data && response.data.users ? response.data.users.users : []);
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
                        <h6 className="heading6-of-header fnt-poppins">Users</h6>
                        <button onClick={() => history.push("/add-user")} className="cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                    </div>
                    {/* Table of Administrator */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        <div className="Table-Header">
                            <h6 className="fnt-poppins">All User Records</h6>
                            <div className="table-data-row">
                                <select className="select-option-of-adminstrator fnt-poppins select-input-responsive"
                                    onChange={event => typeHandler(event.target.value)}
                                >
                                    <option>Select User Status</option>
                                    <option value="">All</option>
                                    <option value="Enable">Active</option>
                                    <option value="Delete">In-Active</option>
                                </select>
                                <select className="select-option-of-adminstrator fnt-poppins select-option-of-affilated-user">
                                    <option>Select Affiliated Status</option>
                                    <option>Normal</option>
                                    <option>Affiliated User</option>
                                </select>
                            </div>
                            <div className="table-data-row" >
                                <input className="input-for-search fnt-poppins input-for-search-user-1" placeholder="Name"
                                    onChange={event => {
                                        searchHandler(event.target.value)
                                    }}
                                />
                                <input className="input-for-search fnt-poppins input-for-search-user" placeholder="Email"
                                    onChange={event => {
                                        searchEmailHandler(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        {/* Table-Title */}
                        <div className="container-fluid Table-title">
                            <table className="main-table-heading">
                                <thead className="heading-of-table background-color-head">
                                    <tr className="table-row-of-head fnt-poppins">
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Status Affiliated</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-of-data">
                                    {search && search.length !== 0 && search.map((single, index) =>
                                        <tr key={index} className="table-row-data-of-body fnt-poppins">
                                            <td>{single.Name ? single.Name : "-"}</td>
                                            <td>{single.Email ? single.Email : "-"}</td>
                                            <td>{single.Status ? single.Status : "-"}</td>
                                            <td style={{ padding: "0px" }}>{single.is_affiliated ?
                                                <>
                                                    <td>{single.is_affiliated == "0" ? "Normal User" : ""}</td>
                                                    <td style={{ padding: "0px" }}>{single.is_affiliated == "1" ? "Affiliated User" : ""}</td>
                                                </>
                                                : "-"}
                                            </td>
                                            <td>
                                                <div className="is-flex">
                                                    <img onClick={() => history.push("/edit-user/" + single.Id)} className="cursor-pointer edit-image-table" alt="edit-button" src={Editlogo} />
                                                    <img className="cursor-pointer delete-image-table" alt="delete-button" onClick={() => deleteUsers(single.Id)} src={Deletelogo} />
                                                    <span onClick={() => history.push("/user-information-activities/" + single.Id)} className="cursor-pointer view-btn-of-table">View Details</span>
                                                    {/* <span className="view-btn-of-table">Affiliate User</span> */}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="table-footer">
                                        <td colSpan={4}>Total</td>
                                        <td>{totalCustomers}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mrg-top-10">
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
                    <Style />
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
export default withRouter(ViewUser);