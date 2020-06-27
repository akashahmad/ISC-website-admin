import React, { useState, useEffect } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'
import { withRouter } from 'react-router-dom'
import Loader from '../../commonComponents/Loader/loader'
import { USER_INTEREST } from '../../apollo/Quries/userInterestType'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { DELETE_USER_INTEREST } from '../../apollo/Mutations/deleteUserInterest'
import ContentLoader from 'react-content-loader'

const ViewAdson = (props) => {
    let { history } = props;
    const { loading, data } = useQuery(USER_INTEREST)
    const [deleteUserInterest] = useMutation(DELETE_USER_INTEREST);

    // method for deleting data
    const deleteAdsons = (id) => {
        deleteUserInterest({
            variables: {
                id: parseInt(id),
            }
        }).then(res => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/view-user-interest")
        })
    }

    return (
        <>{!loading ?
            <div className="container-fluid Table-for-administrator-main-div">
                {/* header */}
                <div className="header-of-viewAdministrator">
                    <h6 className="heading6-of-header fnt-poppins">User Interest Type</h6>
                    <button onClick={() => history.push("/add-user-interest")} className="cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                </div>
                {/* Table of Administrator  */}
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                    </div>
                    <div className="Table-Header">
                        <h6 className="fnt-poppins">All User Interest Type Record</h6>
                    </div>
                    {/* Table-Title */}
                    <div className="container-fluid Table-title">
                        <table className="main-table-heading">
                            <thead className="heading-of-table background-color-head">
                                <tr className="table-row-of-head fnt-poppins">
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-of-data">
                                {data && data.length !== 0 && data.getAllIntersts.map((single, index) =>
                                    <tr key={index} className="table-row-data-of-body fnt-poppins">
                                        <td>{single.name ? single.name : "-"}</td>
                                        <td>{single.Slug ? single.Slug : "-"}</td>
                                        <td>
                                            <div className="appling-flex-btns desktop-responsive">
                                                <img onClick={() => history.push("/edit-user-interest/" + single.id)} className="cursor-pointer edit-image-table" alt="edit-button" src={Editlogo} />
                                                <img className="cursor-pointer delete-image-table" alt="delete-button" src={Deletelogo}
                                                    onClick={() => deleteAdsons(single.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
export default withRouter(ViewAdson)