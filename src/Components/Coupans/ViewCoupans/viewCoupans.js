import React, { useEffect, useState } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { ALL_COUPONS } from '../../apollo/Mutations/couponMutation'
import ReactPaginate from "react-paginate";
import Loader from '../../commonComponents/Loader/loader'
import { DELETE_COUPON } from '../../apollo/Mutations/deleteCoupon'
import { getParams } from '../../functions/index'
import ContentLoader from 'react-content-loader'
import { isupportcauseCampaign } from '../../../Config'

const ViewCoupan = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [coupons] = useMutation(ALL_COUPONS);
    const [data, setData] = useState("")
    const [totalPages, setTotalPage] = useState(1);
    const [totalCoupons, setTotalCoupons] = useState([]);
    const [page, setPage] = useState(1);
    const [deleteSingleCoupan] = useMutation(DELETE_COUPON)

    const pageHandler = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/coupans?page=" + (parseInt(value.selected) + 1));
        coupons({
            variables: {
                page: parseInt(value.selected) + 1,
                limit: 10,
            }
        }
        ).then(response => {
            setData(response && response.data && response.data.getAllCoupons ? response.data.getAllCoupons.coupons : []);
            setTotalPage(response && response.data.getAllCoupons ? response.data.getAllCoupons.totalPages : [1]);
            setTotalCoupons(response && response.data.getAllCoupons && response.data.getAllCoupons.totalCoupons);
        })
    }

    useEffect(() => {
        coupons({
            variables: {
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
                limit: 10,
            }
        }
        ).then(response => {
            setData(response && response.data && response.data.getAllCoupons ? response.data.getAllCoupons.coupons : []);
            setTotalPage(response && response.data.getAllCoupons ? response.data.getAllCoupons.totalPages : [1]);
            setTotalCoupons(response && response.data.getAllCoupons && response.data.getAllCoupons.totalCoupons);
        })
    }, [])

    const deleteCoupon = (Id) => {
        deleteSingleCoupan({
            variables: {
                Id: parseInt(Id),
            }
        }).then(response => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/coupans")
        })
    }

    return (
        <>
            {data && data.length !== 0 ?
                < div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Coupons</h6>
                        <button onClick={() => history.push("/add-coupans")} className="cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                    </div>
                    {/* Table of Administrator  */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        <div className="Table-Header">
                            <h6 className="fnt-poppins">All Coupons Records</h6>
                            {/* <div>
                            <select className="select-option-of-adminstrator fnt-poppins">
                                <option>Select Coupons Status</option>
                                <option>Enable</option>
                                <option>Disable</option>
                            </select>
                        </div> */}
                            {/* <div>
                            <input className="input-for-search fnt-poppins input-for-search-user" placeholder="Coupan Code" />
                            <input className="input-for-search fnt-poppins input-for-search-user" placeholder="Discount Code" />
                        </div> */}
                        </div>
                        {/* Table-Title */}
                        <div className="container-fluid Table-title">
                            <table className="main-table-heading">
                                <thead className="heading-of-table background-color-head">
                                    <tr className="table-row-of-head fnt-poppins">
                                        <th>Coupon Code</th>
                                        <th>Coupon Discount Percentage</th>
                                        <th>Page Link</th>
                                        <th>Coupon Status</th>
                                        <th>Total Montly Subscription</th>
                                        {/* <th>Total Annual Subscription</th> */}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {data && data.length !== 0 ? data.map((single, index) =>
                                    <tbody className="table-of-data">
                                        <tr className="table-row-data-of-body fnt-poppins">
                                            <td>{single.Coupon_code ? single.Coupon_code : "-"}</td>
                                            <td>{single.Discount_percentage ? single.Discount_percentage + " " + "%" : "-"}</td>
                                            <td>{single.Page_link ? single.Page_link : isupportcauseCampaign + single.Coupon_code}</td>
                                            <td>{single.Status_coupon ? single.Status_coupon : "-"}</td>
                                            <td>{single.TotalMonthlySubscriptions}</td>
                                            {/* <td>{single.TotalAnnuallySubscriptions}</td> */}
                                            <td className="is-flex">
                                                <img onClick={() => history.push("/edit-coupans/" + single.Id)} className=" cursor-pointer edit-image-table" alt="edit-button" src={Editlogo} />
                                                <img className="cursor-pointer delete-image-table" alt="delete-button" onClick={() => deleteCoupon(single.Id)} src={Deletelogo} />
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                                    :
                                    <tfoot>
                                        <tr>
                                            <td colSpan={4} className="fnt-size-25 fnt-weight-600 fnt-poppins" style={{ textAlign: "center" }}>No Record Found</td>
                                        </tr>
                                    </tfoot>
                                }

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
export default withRouter(ViewCoupan)