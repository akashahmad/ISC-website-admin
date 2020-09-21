import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import ReactPaginate from "react-paginate";
import { viewActivities_img } from '../../../Config'
import { useMutation } from '@apollo/react-hooks';
import { VIEW_MUTATION } from '../../apollo/Mutations/viewActivitiesMutation'
import Loader from '../../commonComponents/Loader/loader'
import { standardDate } from '../../functions/index'
import ip from 'ip-to-int'
import { getParams } from '../../functions/index'
import ContentLoader from 'react-content-loader'

const ViewActivities = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [page, setPage] = useState(1);
    const [userActivity, setUserActivity] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [data] = useMutation(VIEW_MUTATION);
    const [totalCustomers, setTotalCustomers] = useState("");
    const handlePageClick = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/view-activities?page=" + (parseInt(value.selected) + 1));
        data({
            variables: {
                limit: 10,
                page: parseInt(value.selected) + 1,
            }
        })
            .then(res => {
                setUserActivity(res && res.data.userActivity && res.data.userActivity.userActivity ? res.data.userActivity.userActivity : []);
                setTotalPage(res && res.data.userActivity.totalPages ? res.data.userActivity.totalPages : [1])
                setTotalCustomers(res && res.data.userActivity && res.data.userActivity.totaluserActivity);
            })
    }
    useEffect(() => {
        data({
            variables: {
                limit: 10,
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
            }
        }).then(res => {
            setUserActivity(res && res.data.userActivity && res.data.userActivity.userActivity ? res.data.userActivity.userActivity : []);
            setTotalPage(res && res.data.userActivity.totalPages ? res.data.userActivity.totalPages : [1])
            setTotalCustomers(res && res.data.userActivity && res.data.userActivity.totaluserActivity);

        })
    }, []);

    return (
        <>
            {userActivity && userActivity.length !== 0 ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">View Activities</h6>
                    </div>
                    {/* Table of Administrator  */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        <div className="Table-Header">
                            <h6 className="fnt-poppins">View Activities</h6>
                        </div>
                        {/* Table-Title */}
                        <div className="container-fluid Table-title">
                            <table className="main-table-heading">
                                <thead className="heading-of-table background-color-head">
                                    <tr className="table-row-of-head fnt-poppins">
                                        <th>Campaign Image</th>
                                        <th>Campaign Name</th>
                                        <th>User Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>IP Address</th>
                                    </tr>
                                </thead>
                                <tbody className="table-of-data">
                                    {userActivity && userActivity.length != 0 ? userActivity.map(single =>
                                        <tr style={{ borderBottom: "1px solid silver" }} className="table-row-data-of-body fnt-poppins">
                                            <td className="has-margin-top-15" style={{
                                                backgroundImage: `url(${single && single.Image ? viewActivities_img + single.Image : <p>no image</p>})`,
                                                backgroundSize: 'contain',
                                                height: '143px',
                                                backgroundRepeat: 'no-repeat'
                                            }}></td>
                                            <td>{single.CampaignName && single.CampaignName.Name ? single.CampaignName.Name : "-"}</td>
                                            <td>{single.userName ? single.userName.Name : "-"}</td>
                                            <td>{single.CreatedDate ? standardDate(single.CreatedDate).standardDate : "-"}</td>
                                            <td>{single.CreatedDate ? standardDate(single.CreatedDate).time : "-"}</td>
                                            <td>{single.CreatedIp ? ip(single.CreatedIp).toIP() : ""}</td>
                                        </tr>
                                    ) : ""}
                                    <tr className="table-footer">
                                        <td colSpan={5}>Total</td>
                                        <td>{totalCustomers}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mrg-top-0">
                            <ReactPaginate previousLabel={<span className="fa fa-chevron-right "> &#60; </span>}
                                nextLabel={<span className="fa fa-chevron-right "> > </span>}
                                breakLabel={". . ."}
                                breakClassName={"break-me"}
                                pageCount={totalPage}
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
export default withRouter(ViewActivities);
