import React, { useEffect, useState } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'
import { withRouter } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { standardDate, getParams } from '../../functions/index'
import ReactPaginate from "react-paginate";
import { VIEW_CAMPAIGN } from '../../apollo/Mutations/campaignMutation'
import { CAMPAIGN_CATEGORIES } from '../../apollo/Quries/campaignCategories';
import { DELETE_CAMPAIGN } from '../../apollo/Mutations/deleteCampaign'
import cookie from 'react-cookies'
import ContentLoader from 'react-content-loader'

const ViewCompaign = (props) => {

    let { history, location } = props;
    let path = getParams(location.search);
    const { loading, data } = useQuery(CAMPAIGN_CATEGORIES, { context: { clientName: "second" } });
    const [campaign, setCampaign] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [campaignType, setCampaignType] = useState("");
    const [totalCampaigns, setTotalCampaigns] = useState([]);
    const [getCampaign] = useMutation(VIEW_CAMPAIGN);
    const [campaignCategories, setCampaignCategories] = useState();
    const [deleteCampaign] = useMutation(DELETE_CAMPAIGN);
    const [selectedPage, setSelectedPage] = useState(0);

    useEffect(() => {
        setCampaignCategories(data && data.campaignCategories)
    }, [data])

    // states for filter method
    const [createdUser, setCreatedUser] = useState("")
    const [sort, setSort] = useState("")
    const [search, setSearch] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [boosted, setBoosted] = useState("")

    // method for pagination
    const handlePageClick = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/campaign?page=" + (parseInt(value.selected) + 1 ));
        getCampaign({
            variables: {
                page: parseInt(value.selected) + 1,
                limit: 10,
                CampaignType: campaignType,
                sort: sort,
                Createduser: createdUser,
                CategoryId: parseInt(categoryId),
                Boosted: ""
            }
        }
        ).then(res => {
            setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
            setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
            setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
            setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
        })
    }

    // get all campaign data and store in states 
    useEffect(() => {
        getCampaign({
            variables: {
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
                limit: 10,
                CampaignType: campaignType,
                sort: sort,
                Createduser: createdUser,
                CategoryId: parseInt(categoryId),
                Boosted: ""
            }
        }
        ).then(res => {
            setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
            setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
            setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
            setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
        })
    }, [])

    //search handler campaignPackage
    const campaignPackage = (value) => {
        switch (value) {
            case "": {
                setBoosted(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: "",
                        Boosted: ""
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
            case "0": {
                setBoosted(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: "",
                        Boosted: "0"
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
            case "1": {
                setBoosted(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: "",
                        Boosted: "1"
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
        }
    }



    // categoryType filter through Id
    const categoryHandler = (value) => {
        setCategoryId(value);
        getCampaign({
            variables: {
                page: value.selected + 1,
                limit: 10,
                CampaignType: campaignType,
                sort: sort,
                Createduser: createdUser,
                CategoryId: parseInt(categoryId)
            }
        }
        ).then(res => {
            setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
            setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
            setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
            setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
        })
    }

    // search handler of campgin type
    const typeHandler = (value) => {
        switch (value) {
            case "": {
                setCampaignType(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: ""
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
            case "Support": {
                setCampaignType(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "Support",
                        sort: sort,
                        Createduser: ""
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
            case "Petition": {
                setCampaignType(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "Petition",
                        sort: sort,
                        Createduser: ""
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
            case "Pledge": {
                setCampaignType(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "Pledge",
                        sort: sort,
                        Createduser: ""
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
        }
    }

    // search handler of hight support and lowest support
    const sortHandler = (value) => {
        switch (value) {
            case "": {
                setSort(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: ""
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
            case "highestSupport": {
                setSort(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: ""
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
            case "lowestSupport": {
                setSort(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: ""
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
        }
    }

    // select user or admin method handler
    const selectUserorAdminHandler = (value) => {
        switch (value) {
            case "": {
                setCreatedUser(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: ""
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
            case "User": {
                setCreatedUser(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: "User"
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
            case "Admin": {
                setCreatedUser(value);
                getCampaign({
                    variables: {
                        page: page,
                        limit: 10,
                        CampaignType: "",
                        sort: sort,
                        Createduser: "Admin"
                    }
                }).then(res => {
                    setCampaign(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                    setTotalPages(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalPages ? res.data.allCampaignFilters.totalPages : [1])
                    setTotalCampaigns(res && res.data.allCampaignFilters && res.data.allCampaignFilters.totalCampaigns ? res.data.allCampaignFilters.totalCampaigns : [])
                    setSearch(res && res.data.allCampaignFilters && res.data.allCampaignFilters.campaigns ? res.data.allCampaignFilters.campaigns : [])
                })
                return;
            }
        }
    }

    // search method
    const searchHandler = (value) => {
        let resultData = campaign ? campaign.filter(sin => sin.Name.toLowerCase().indexOf(value.toLowerCase()) !== -1) : []
        setSearch(resultData)
    }

    let token = cookie.load("token")
    const deleteSingleCampaign = (id) => {
        deleteCampaign({
            variables: {
                Id: parseInt(id),
                token: token
            }
        }).then(response => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/campaign")
        })
    }

    return (
        <>
            {campaign && campaign.length !== 0 ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Campaigns</h6>
                        <button onClick={() => history.push("/create-camapaign")} className="cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                    </div>
                    {/* Table of Administrator  */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        <div className="Table-Header">
                            <h6 className="fnt-poppins">All Campaigns Record</h6>
                            <div>
                                <input className="input-for-search fnt-poppins input-for-search-user" placeholder="Name"
                                    onChange={event => {
                                        searchHandler(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="Table-Header">
                            <div className="is-flex search-filters">
                                <select className="select-option-of-adminstrator fnt-poppins"
                                    onChange={event => selectUserorAdminHandler(event.target.value)}
                                >
                                    <option>Select User</option>
                                    <option value="">All</option>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <select className="select-option-of-adminstrator fnt-poppins mrg-left-50"
                                    onChange={event => categoryHandler(event.target.value)}
                                >
                                    <option>Select Category</option>
                                    {
                                        campaignCategories && campaignCategories.length !== 0 && campaignCategories.map(single =>
                                            <option value={single.Id}>{single.Name}</option>
                                        )}
                                </select>
                                <select className="select-option-of-adminstrator fnt-poppins mrg-left-50"
                                    onChange={event => typeHandler(event.target.value)}>
                                    <option>Select Campaign Type</option>
                                    <option value="">All</option>
                                    <option value="Support">Support</option>
                                    <option value="Petition">Petition</option>
                                    <option value="Pledge">Pledge</option>
                                </select>
                                <select className="select-option-of-adminstrator fnt-poppins mrg-left-50"
                                    onChange={event => campaignPackage(event.target.value)}
                                >
                                    <option value="">Select Compaign Package</option>
                                    <option value="0">Free Compaign</option>
                                    <option value="1">Premium Compaign</option>
                                </select>
                                <select className="select-option-of-adminstrator fnt-poppins mrg-left-50"
                                    onChange={event => sortHandler(event.target.value)}
                                >
                                    <option>Sort By Support</option>
                                    <option value="">All</option>
                                    <option value="highestSupport">Highest Support</option>
                                    <option value="lowestSupport">Lowest Support</option>
                                </select>
                            </div>
                        </div>
                        {/* Table-Title */}
                        <div className="Table-title">
                            <table className="main-table-heading">
                                <thead className="heading-of-table background-color-head">
                                    <tr className="table-row-of-head fnt-poppins">
                                        <th>Sr.No</th>
                                        <th>Compaign Name</th>
                                        <th>Compaign Type</th>
                                        <th>Created By</th>
                                        <th>Date Created</th>
                                        <th>Total Support</th>
                                        <th>Report Count</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-of-data">
                                    {search && search.length !== 0 ? search.map((single, index) =>
                                        <tr key={index} className="table-row-data-of-body tr-border-bottom fnt-poppins">
                                            <td>{single.Id}</td>
                                            <td>{single.Name}</td>
                                            <td>{single.CampaignType}</td>
                                            <td>{single.CreatedBy}</td>
                                            <td>{standardDate(single.CreatedDate).standardDate}</td>
                                            <td>{single.support_count}</td>
                                            <td>{single.reportCount}</td>
                                            <td className="btns-of-viewcompaign">
                                                <div className="is-flex">
                                                    <img onClick={() => history.push("/edit-campaign/" + single.Id)} className="cursor-pointer edit-image-table customization-of-image-btn" alt="edit-button" src={Editlogo} />
                                                    <img className="has-margin-left-5 has-cursor-pointer edit-image-table customization-of-image-btn" alt="delete-button"
                                                        onClick={() => deleteSingleCampaign(single.Id)}
                                                        src={Deletelogo} />
                                                    <span onClick={() => history.push("/Camapaign-details/" + single.Id)} className="cursor-pointer view-btn-of-table has-width-40">View Details</span>
                                                </div>
                                                <div className="mrg-top-10 is-flex">
                                                    <span onClick={() => history.push("/view-reports/" + single.Id)} className="cursor-pointer view-btn-of-table has-width-40">View Reports</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : ""}
                                    <tr className="table-footer">
                                        <td colSpan={7}>Total</td>
                                        <td>{totalCampaigns}</td>
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
                                    onPageChange={handlePageClick}
                                    containerClassName={"digit-icons main"}
                                    subContainerClassName={"container column"}
                                    activeClassName={"p-one"}
                                    forcePage={path && parseInt(path.page) ? (parseInt(path.page) - 1  ) : 0}
                                />
                            </div>
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

export default withRouter(ViewCompaign);