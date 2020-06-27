import React, { useState, useEffect } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { TEMPLATE } from '../../apollo/Mutations/templateMutation'
import { DELETE_TEMPALTE } from '../../apollo/Mutations/deleteTemplate'
import ReactPaginate from "react-paginate";
// import {standardDate} from '../../functions'
import { getParams } from '../../functions/index';
import ContentLoader from 'react-content-loader'


const ViewTemplate = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [users, setUsers] = useState([]);
    const [allPages] = useMutation(TEMPLATE);
    const [deleteTemplate] = useMutation(DELETE_TEMPALTE);
    const [totalPages, setTotalPage] = useState(1);
    const [totalCustomers, setTotalCustomers] = useState([]);
    const [page, setPage] = useState(1);

    // method for pagination
    const pageHandler = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/tempelates?page=" + (parseInt(value.selected) + 1));
        allPages({
            variables: {
                page: parseInt(value.selected) + 1,
                limit: 10
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.Templates ? response.data.Templates.Template : []);
            setTotalPage(response && response.data.Templates ? response.data.Templates.totalPages : [1]);
            setTotalCustomers(response && response.data.Templates && response.data.Templates.totalTemplate);
        })
    }

    useEffect(() => {
        allPages({
            variables: {
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
                limit: 10
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.Templates ? response.data.Templates.Template : []);
            setTotalPage(response && response.data.Templates ? response.data.Templates.totalPages : [1]);
            setTotalCustomers(response && response.data.Templates && response.data.Templates.totalTemplate);
        })
    }, [])

    // method for deleting template
    const deleteTemplates = (Id) => {
        deleteTemplate({
            variables: {
                Id: parseInt(Id),
            }
        }).then(res => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/tempelates")
        })
    }

    return (
        <>
            {users && users.length !== 0 ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Templates</h6>
                        <button onClick={() => history.push("/add-tempelates")} className="has-cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                    </div>
                    {/* Table of Administrator  */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        <div className="Table-Header">
                            <h6 className="fnt-poppins">All Templates Record</h6>
                        </div>
                        {/* Table-Title */}
                        <div className="container-fluid Table-title">
                            <table className="main-table-heading responsive-table-template">
                                <thead className="heading-of-table background-color-head">
                                    <tr className="table-row-of-head fnt-poppins">
                                        <th>Title</th>
                                        <th>Subject</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-of-data">
                                    {users && users.length !== 0 && users.map((single, index) =>
                                        <tr key={index} className="table-row-data-of-body fnt-poppins" style={{ borderBottom: "1px solid silver" }}>
                                            <td>{single.Title ? single.Title : "-"}</td>
                                            <td>{single.Subject ? single.Subject : "-"}</td>
                                            <td>{single.Email ? single.Email : "-"}</td>
                                            <td>{single.Status ? single.Status : "-"}</td>
                                            <td>{single.Type ? single.Type : "-"}</td>
                                            <td className="template-btn">
                                                <div style={{ display: "flex" }}>
                                                    <img onClick={() => history.push("/edit-tempelates/" + single.Id)} className="has-cursor-pointer edit-image-table" alt="" src={Editlogo} />
                                                    <img className=" has-cursor-pointer delete-image-table" alt="" onClick={() => deleteTemplates(single.Id)} src={Deletelogo} />
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="table-footer">
                                        <td colspan={5}>Total</td>
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
export default withRouter(ViewTemplate);