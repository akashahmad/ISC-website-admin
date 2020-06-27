import React, { useState, useEffect } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import { NEWSLETTERS } from '../../apollo/Mutations/newsletterMutation'
import ReactPaginate from "react-paginate";
import Loader from '../../commonComponents/Loader/loader'
import { standardDate } from '../../functions/index'
import { DELETE_NEWSLETTER } from '../../apollo/Mutations/deleteNewsletter'
import { getParams } from '../../functions/index'
import ContentLoader from 'react-content-loader'

const ViewNewsletter = (props) => {

    let { history, location } = props;
    let path = getParams(location.search);
    const [newsletter] = useMutation(NEWSLETTERS);
    const [data, setData] = useState([]);
    const [totalNewsletter, setTotalNewsletter] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [deleteNewsletter] = useMutation(DELETE_NEWSLETTER);

    // method for pagination
    const handlePageClick = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/newsletter?page=" + (parseInt(value.selected) + 1));
        newsletter({
            variables: {
                limit: 10,
                page: parseInt(value.selected) + 1,
            }
        })
            .then(res => {
                setData(res && res.data.newsletters && res.data.newsletters.newsletters ? res.data.newsletters.newsletters : [])
                setTotalPages(res && res.data.newsletters.totalPages ? res.data.newsletters.totalPages : [1])
                setTotalNewsletter(res && res.data.newsletters && res.data.newsletters.totalnewsletters);
            })
    }

    useEffect(() => {
        newsletter({
            variables: {
                limit: 10,
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
            }
        }).then(res => {
            setData(res && res.data.newsletters && res.data.newsletters.newsletters ? res.data.newsletters.newsletters : [])
            setTotalPages(res && res.data.newsletters.totalPages ? res.data.newsletters.totalPages : [1])
            setTotalNewsletter(res && res.data.newsletters && res.data.newsletters.totalnewsletters);
        })
    }, []);

    // method for deleting newsletter
    const deletePages = (id) => {
        deleteNewsletter({
            variables: {
                Id: parseInt(id),
            }
        }).then(response => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/newsletter")

        })
    }


    return (
        <>
            {data && data.length !== 0 ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Newsletters</h6>
                        <button onClick={() => history.push("/add-newsletter")} className="cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                    </div>
                    {/* Table of Administrator  */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        <div className="Table-Header">
                            <h6 className="fnt-poppins">All Newsletters Record</h6>
                        </div>
                        {/* Table-Title */}
                        <div className="container-fluid Table-title">
                            <table className="main-table-heading">
                                <thead className="heading-of-table background-color-head">
                                    <tr className="table-row-of-head fnt-poppins">
                                        <th>Name</th>
                                        <th>Template Name</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-of-data">
                                    {data && data.length !== 0 && data.map((single, index) => {
                                        return (
                                            <tr key={index} className="table-row-data-of-body fnt-poppins">
                                                <td>{single.name ? single.name : "-"}</td>
                                                <td>{single.Template ? single.Template && single.Template.Title : "-"}</td>
                                                <td>{single.status ? single.status : "-"}</td>
                                                <td>
                                                    <div className="applying-flex">
                                                        <img onClick={() => history.push("/edit-newsletter/" + single.Id)} className="cursor-pointer edit-image-table" alt="edit-button" src={Editlogo} />
                                                        <img className="delete-image-table has-cursor-pointer" alt="delete-button" src={Deletelogo}
                                                            onClick={() => deletePages(single.Id)}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr className="table-footer">
                                        <td colSpan={3}>Total</td>
                                        <td>{totalNewsletter}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mrg-top-0">
                            <ReactPaginate previousLabel={<span className="fa fa-chevron-right "> &#60; </span>}
                                nextLabel={<span className="fa fa-chevron-right "> > </span>}
                                breakLabel={". . ."}
                                breakClassName={"break-me"}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
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
export default withRouter(ViewNewsletter);