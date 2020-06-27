import React, { useState, useEffect } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { SETTING } from '../../apollo/Mutations/settingMutation'
import { DELETE_SETTING } from '../../apollo/Mutations/deleteSetting'
import Loader from '../../commonComponents/Loader/loader'
import ReactPaginate from "react-paginate";
import { getParams } from '../../functions'
import ContentLoader from 'react-content-loader'

const ViewSetting = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [users, setUsers] = useState([]);
    const [allPages] = useMutation(SETTING);
    const [deleteSetting] = useMutation(DELETE_SETTING);
    const [totalPages, setTotalPage] = useState(1);
    const [totalCustomers, setTotalCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState([]);
    const [settingType, setSettingType] = useState("")

    // method for searching fieldName
    const searchHandler = (value) => {
        let resultData = users ? users.filter(sin => sin.fieldName.toLowerCase().indexOf(value.toLowerCase()) !== -1) : []
        setSearch(resultData)
    }

    // method for pagination
    const pageHandler = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/setting?page=" + (parseInt(value.selected) + 1));
        allPages({
            variables: {
                page: parseInt(value.selected) + 1,
                limit: 10,
                setting_type: ""
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.setting ? response.data.setting.settings : []);
            setTotalPage(response && response.data.setting ? response.data.setting.totalPages : [1]);
            setTotalCustomers(response && response.data.setting && response.data.setting.totalsettings);
            setSearch(response && response.data && response.data.setting ? response.data.setting.settings : []);
        })
    }

    useEffect(() => {
        allPages({
            variables: {
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
                limit: 10,
                setting_type: ""
            }
        }
        ).then(response => {
            setUsers(response && response.data && response.data.setting ? response.data.setting.settings : []);
            setTotalPage(response && response.data.setting ? response.data.setting.totalPages : [1]);
            setTotalCustomers(response && response.data.setting && response.data.setting.totalsettings);
            setSearch(response && response.data && response.data.setting ? response.data.setting.settings : []);
        })
    }, [])

    // method for deleting data
    const deleteSettings = (id) => {
        deleteSetting({
            variables: {
                id: parseInt(id),
            }
        }).then(response => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/setting")
        })
    }

    // search setting on the basis of setting type
    const typeHandler = (value) => {
        switch (value) {
            case "": {
                setSettingType(value)
                allPages({
                    variables: {
                        page: 1,
                        limit: 10,
                        setting_type: ""
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.setting ? response.data.setting.settings : []);
                    setTotalPage(response && response.data.setting ? response.data.setting.totalPages : [1]);
                    setTotalCustomers(response && response.data.setting && response.data.setting.totalsettings);
                    setSearch(response && response.data && response.data.setting ? response.data.setting.settings : []);
                })
                return;
            }
            case "General": {
                setSettingType(value)
                allPages({
                    variables: {
                        page: 1,
                        limit: 10,
                        setting_type: "General"
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.setting ? response.data.setting.settings : []);
                    setTotalPage(response && response.data.setting ? response.data.setting.totalPages : [1]);
                    setTotalCustomers(response && response.data.setting && response.data.setting.totalsettings);
                    setSearch(response && response.data && response.data.setting ? response.data.setting.settings : []);
                })
                return;
            }
            case "Payment": {
                setSettingType(value)
                allPages({
                    variables: {
                        page: 1,
                        limit: 10,
                        setting_type: "Payment"
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.setting ? response.data.setting.settings : []);
                    setTotalPage(response && response.data.setting ? response.data.setting.totalPages : [1]);
                    setTotalCustomers(response && response.data.setting && response.data.setting.totalsettings);
                    setSearch(response && response.data && response.data.setting ? response.data.setting.settings : []);
                })
                return;
            }
            case "Social": {
                setSettingType(value)
                allPages({
                    variables: {
                        page: 1,
                        limit: 10,
                        setting_type: "Social"
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.setting ? response.data.setting.settings : []);
                    setTotalPage(response && response.data.setting ? response.data.setting.totalPages : [1]);
                    setTotalCustomers(response && response.data.setting && response.data.setting.totalsettings);
                    setSearch(response && response.data && response.data.setting ? response.data.setting.settings : []);
                })
                return;
            }
            case "Email": {
                setSettingType(value)
                allPages({
                    variables: {
                        page: 1,
                        limit: 10,
                        setting_type: "Email"
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.setting ? response.data.setting.settings : []);
                    setTotalPage(response && response.data.setting ? response.data.setting.totalPages : [1]);
                    setTotalCustomers(response && response.data.setting && response.data.setting.totalsettings);
                    setSearch(response && response.data && response.data.setting ? response.data.setting.settings : []);
                })
                return;
            }
            case "Apps": {
                setSettingType(value)
                allPages({
                    variables: {
                        page: 1,
                        limit: 10,
                        setting_type: "Apps"
                    }
                }
                ).then(response => {
                    setUsers(response && response.data && response.data.setting ? response.data.setting.settings : []);
                    setTotalPage(response && response.data.setting ? response.data.setting.totalPages : [1]);
                    setTotalCustomers(response && response.data.setting && response.data.setting.totalsettings);
                    setSearch(response && response.data && response.data.setting ? response.data.setting.settings : []);
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
                        <h6 className="heading6-of-header fnt-poppins">Setting</h6>
                        <button onClick={() => history.push("/add-setting")} className="cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                    </div>
                    {/* Table of Administrator  */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        <div className="Table-Header">
                            <h6 className="fnt-poppins">All Setting Records</h6>
                            <select className="select-option-of-adminstrator fnt-poppins"
                                onChange={event => typeHandler(event.target.value)}
                            >
                                <option>Select Setting Type</option>
                                <option value="">All</option>
                                <option value="General">General</option>
                                <option value="Payment">Payment</option>
                                <option value="Social">Social</option>
                                <option value="Email">Email</option>
                                <option value="Apps">Apps</option>
                            </select>
                            <input className="input-for-search fnt-poppins" placeholder="Name"
                                onChange={event => {
                                    searchHandler(event.target.value)
                                }}
                            />
                        </div>
                        {/* Table-Title */}
                        <div className="container-fluid Table-title">
                            <div>
                                <table className="setting-table-main">
                                    <thead className="setting-header-title fnt-poppins">
                                        <tr>
                                            <th className="white-color">Name</th>
                                            <th className="white-color">Key</th>
                                            <th className="white-color">Type</th>
                                            <th className="white-color">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {search && search.length !== 0 && search.map((single, index) =>
                                            <tr key={index} className="fnt-poppins background-white">
                                                <td>{single.fieldName ? single.fieldName : "-"}</td>
                                                <td>{single.Keytext ? single.Keytext : "-"}</td>
                                                <td>{single.setting_type ? single.setting_type : "-"}</td>
                                                <td>
                                                    <img onClick={() => history.push("/edit-setting/" + single.ID)} className="cursor-pointer edit-image-table setting-edit-btn" alt="edit-button" src={Editlogo} />
                                                    <img className="has-cursor-pointer delete-image-table setting-edit-btn" alt="edit-button" onClick={() => deleteSettings(single.ID)} src={Deletelogo} />
                                                </td>
                                            </tr>
                                        )}
                                        <tr className="totalData-row">
                                            <td colSpan={3}>Total</td>
                                            <td>{totalCustomers}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
export default withRouter(ViewSetting);