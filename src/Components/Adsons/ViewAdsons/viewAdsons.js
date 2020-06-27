import React, { useState, useEffect } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { ADSONS } from '../../apollo/Mutations/adsonsMutation'
import { DELETE_ADSON } from '../../apollo/Mutations/deleteAdson'
import Loader from '../../commonComponents/Loader/loader'
import ReactPaginate from "react-paginate";
import { getParams } from '../../functions'

const ViewAdson = (props) => {
    let { history , location } = props;
    let path = getParams(location.search);
    const [users, setUsers] = useState([]);
    const [allPages] = useMutation(ADSONS);
    const [deleteAdson] = useMutation(DELETE_ADSON);
    const [totalPages, setTotalPage] = useState(1);
    const [totalCustomers, setTotalCustomers] = useState([]);
    const [page, setPage] = useState(1);

    // method for pagination
    const pageHandler = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/adson?page=" + (parseInt(value.selected) + 1));
        allPages({
            variables: {
                page: parseInt(value.selected) + 1,
                limit: 10
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.getAdsons ? response.data.getAdsons.adsons : []);
            setTotalPage(response && response.data.getAdsons ? response.data.getAdsons.totalPages : [1]);
            setTotalCustomers(response && response.data.getAdsons && response.data.getAdsons.totaladsons);
        })
    }

    // Get all data and store in a state
    useEffect(() => {
        allPages({
            variables: {
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
                limit: 10
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.getAdsons ? response.data.getAdsons.adsons : []);
            setTotalPage(response && response.data.getAdsons ? response.data.getAdsons.totalPages : [1]);
            setTotalCustomers(response && response.data.getAdsons && response.data.getAdsons.totaladsons);
        })
    }, [])
 
    // method for deleting data
    const deleteAdsons = (id) => {
        deleteAdson({
            variables: {
                id: parseInt(id),
            }
        }).then(res => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/adson")
        })
    }

    return (
        <>
            {users && users.length !== 0 ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Adson</h6>
                        <button onClick={() => history.push("/add-adson")} className="cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                    </div>
                    {/* Table of Administrator  */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        <div className="Table-Header">
                            <h6 className="fnt-poppins">All Adson Records</h6>
                            <div>
                                <select className="select-option-of-adminstrator fnt-poppins">
                                    <option>Select Adson Status</option>
                                    <option>Active</option>
                                    <option>In-Active</option>
                                </select>
                            </div>
                        </div>
                        {/* Table-Title */}
                        <div className="container-fluid Table-title">
                            <table className="main-table-heading">
                                <thead className="heading-of-table background-color-head">
                                    <tr className="table-row-of-head fnt-poppins">
                                        <th>Type</th>
                                        <th>Place On</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-of-data">
                                    {users && users.length !== 0 && users.map((single, index) =>
                                        <tr key={index} className="table-row-data-of-body fnt-poppins">
                                            <td>{single.type ? single.type : "-"}</td>
                                            <td>{single.place_on ? single.place_on : "-"}</td>
                                            <td>{single.startdate ? single.startdate : "-"}</td>
                                            <td>{single.enddate ? single.enddate : "-"}</td>
                                            <td>{single.status ? single.status : "-"}</td>
                                            <td>
                                                <div className="appling-flex-btns">
                                                    <img onClick={() => history.push("/edit-adson/"+single.id)} className="cursor-pointer edit-image-table" alt="edit-button" src={Editlogo} />
                                                    <img className="cursor-pointer delete-image-table" alt="delete-button" onClick={() => deleteAdsons(single.id)} src={Deletelogo} />
                                                    <span onClick={() => history.push("/view-details/"+single.id)} className="cursor-pointer view-btn-of-table">View Details</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td className="has-padding-left-15" colSpan={5}>Total</td>
                                        <td className="has-padding-left-20">{totalCustomers}</td>
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
                : <Loader />}
        </>
    );
}
export default withRouter(ViewAdson)