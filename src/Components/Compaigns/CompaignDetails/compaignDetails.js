import React, { useState, useEffect } from 'react'
import InputColor from 'react-input-color';
import { withRouter } from 'react-router-dom'
import { SINGLE_CAMPAIGN } from '../../apollo/Quries/singleCampaign'
import { useQuery } from '@apollo/react-hooks';
import { campaignBanner_baseurl, overlays } from '../../../Config'
import { standardDate } from '../../functions'
import Loader from '../../commonComponents/Loader/loader'
import { getParams } from '../../functions'

const CompaignDetails = (props) => {
    let { history, match , location} = props;
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : "";
    const [initial] = useState('#5e72e4');
    const [color, setColor] = useState({});
    const { loading, data } = useQuery(SINGLE_CAMPAIGN(id), { context: { clientName: "second" } });
    const [getSingleCampaign, setGetSingleCampaign] = useState()
    const [renderData, setRenderData] = useState("");
    let startDate = data && data.SingleCampaign && data.SingleCampaign.StartDate;
    startDate = standardDate(startDate).standardDate;

    let endDate = data && data.SingleCampaign && data.SingleCampaign.EndDate;
    endDate = standardDate(endDate).standardDate;

    useEffect(() => {
        setGetSingleCampaign(data && data.SingleCampaign);
    }, [data])

    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Campaign Details</h6>
                        <button onClick={() => history.goBack("/campaign?page=" + path)} className="cursor-pointer cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                    {/* Table of Administrator  */}
                    <form>
                        <div className="Table-of-administrator">
                            <div className="container-fluid background-of-table">
                                <div className="blanck-dev"></div>
                                {/* Table Section */}
                                <div className="container  Form-section-startup Form-sections-startups-responsive">
                                    {/* choose file inputs start here */}
                                    {/* Display Social Share Image */}
                                    <div className="has-padding-top-20">
                                        {getSingleCampaign && getSingleCampaign.Banner ?
                                            <div>
                                                <label className="overlay-responsive-social-img mrg-left-50 fnt-poppins">Banner Image</label>
                                                <div class="field mrg-top-20 mrg-left-50">
                                                    <div className="file is-small has-name ">
                                                        <div className="store-front-image"
                                                            style={{
                                                                backgroundImage: `url(${getSingleCampaign && getSingleCampaign.Banner ? campaignBanner_baseurl + getSingleCampaign.Banner : "no-image"})`,
                                                                height: "100px",
                                                                backgroundSize: "contain",
                                                                backgroundRepeat: "no-repeat",
                                                                marginLeft: "7%",
                                                                width: "100px"
                                                            }}>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            : ""}
                                    </div>
                                    {/* Overlays Image choose button start here */}
                                    {getSingleCampaign && getSingleCampaign.Overlay ?
                                        <div className="mrg-top-20">
                                            <label className="overlay-responsive-social-img mrg-left-50 fnt-poppins" >Overlay</label>
                                        </div>
                                        : ""}
                                    {/* First choose file button */}
                                    <div className="field mrg-top-20  mrg-left-50">
                                        <div className="file is-small has-name ">
                                            {getSingleCampaign && getSingleCampaign.Overlay &&
                                                <div className="store-front-image"
                                                    style={{
                                                        backgroundImage: `url(${getSingleCampaign && getSingleCampaign.Overlay ? overlays + getSingleCampaign.Overlay : "no-image"})`,
                                                        height: "100px",
                                                        backgroundSize: "contain",
                                                        backgroundRepeat: "no-repeat",
                                                        marginLeft: "7%",
                                                        width: "100px"
                                                    }}>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {/* hashtag back color */}
                                    {/* <label className="fnt-poppins mrg-left-50">Hash Tag Back Color</label> */}
                                    {getSingleCampaign && getSingleCampaign.Secondary_color || getSingleCampaign && getSingleCampaign.Tertiary_color || getSingleCampaign && getSingleCampaign.Primary_color ?
                                        <div className="mrg-top-20">
                                            <label className="overlay-responsive-social-img mrg-left-50 fnt-poppins" >Hash Tag Colors</label>
                                        </div>
                                        : ""}
                                    <div className="is-flex">
                                        <div className="mrg-left-50 mrghas-margin-top-30">
                                            {getSingleCampaign && getSingleCampaign.Secondary_color ?
                                                <div>
                                                    <div className="react-input-color mrg-top-20"
                                                        style={{
                                                            width: 80,
                                                            height: 50,
                                                            marginBottom: 20,
                                                            backgroundColor: getSingleCampaign && getSingleCampaign.Secondary_color
                                                        }}>
                                                        {/* {color.hex} */}
                                                    </div>
                                                    <label>Secondary Color</label>
                                                </div>
                                                : ""}
                                        </div>
                                        <div className="mrg-left-50 mrghas-margin-top-30">
                                            {getSingleCampaign && getSingleCampaign.Tertiary_color ?
                                                <div>
                                                    <div className="react-input-color mrg-top-20"
                                                        style={{
                                                            width: 80,
                                                            height: 50,
                                                            marginBottom: 20,
                                                            backgroundColor: getSingleCampaign && getSingleCampaign.Tertiary_color
                                                        }}>
                                                        {/* {color.hex} */}
                                                    </div>
                                                    <label>Tertiary Color</label>
                                                </div>
                                                : ""}
                                        </div>
                                        <div className="mrg-left-50 mrghas-margin-top-30">
                                            {getSingleCampaign && getSingleCampaign.Primary_color ?
                                                <div>
                                                    <div className="react-input-color mrg-top-20"
                                                        style={{
                                                            width: 80,
                                                            height: 50,
                                                            marginBottom: 20,
                                                            backgroundColor: getSingleCampaign && getSingleCampaign.Primary_color
                                                        }}>
                                                        {/* {color.hex} */}
                                                    </div>
                                                    <label>Primary Color</label>
                                                </div>
                                                : ""}
                                        </div>
                                    </div>
                                    <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                        <div className="Form-section1-main-div-of-inputs  ">
                                            {/* Campaign Name */}
                                            <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                                <div className="form-group">
                                                    <div>
                                                        <label className="mrg-top-20 fnt-poppins">Campaign Name*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="name"
                                                            disabled
                                                            value={getSingleCampaign && getSingleCampaign.Name ? getSingleCampaign.Name : "-"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Short Discriptions */}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label >Short Description</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10"
                                                            disabled
                                                            value={getSingleCampaign && getSingleCampaign.ShortDescription ? getSingleCampaign.ShortDescription : "-"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Category */}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <label className="">
                                                        {getSingleCampaign && getSingleCampaign.CampaignType === "Fundraiser" ? "Monetary Goal" : ""}
                                                        {getSingleCampaign && getSingleCampaign.CampaignType === "Petition" ? "Petition Goal" : ""}
                                                        {getSingleCampaign && getSingleCampaign.CampaignType === "Pledge" ? "No of Pledges Aiming For" : ""}
                                                        {getSingleCampaign && getSingleCampaign.CampaignType === "Support" ? "Support" : ""}
                                                    </label>

                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="Hash-Tag"
                                                            disabled
                                                            value={getSingleCampaign && getSingleCampaign.goal_support ? getSingleCampaign.goal_support : "-"}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            {/* facebook url */}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label>Facebook URL(optional)</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins"
                                                            disabled
                                                            value={getSingleCampaign && getSingleCampaign.facebook_url ? getSingleCampaign.facebook_url : "-"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Hash Tag */}
                                            <div className="Form-Inputs-Fields has-margin-top-10 has-margin-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div className="form-group">
                                                        <div>
                                                            <label >End Date</label>
                                                        </div>
                                                        <div>
                                                            <input className="mrg-top-10 fnt-poppins"
                                                                disabled
                                                                value={endDate ? endDate : "-"}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Start date */}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label >Start Date</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins"
                                                            disabled
                                                            value={startDate ? startDate : "-"}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Form section2 dv start here */}
                                        <div className="Form-section2-main-div-of-inputs mrg-top-10">
                                            {/* slug */}
                                            <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label >Campaign Type</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="slug"
                                                            disabled
                                                            value={getSingleCampaign && getSingleCampaign.CampaignType ? getSingleCampaign.CampaignType : "-"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Description */}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label>Description</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="keyword"
                                                            disabled
                                                            value={getSingleCampaign && getSingleCampaign.Description ? data.SingleCampaign.Description : "-"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* KeyWord */}

                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label >Category</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="keyword"
                                                            disabled
                                                            value={getSingleCampaign && getSingleCampaign.CategoryId ? getSingleCampaign.CategoryId : "-"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Transparency */}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label>Website Url</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins"
                                                            disabled
                                                            value={getSingleCampaign && getSingleCampaign.website_url ? getSingleCampaign.website_url : "-"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Hash Tag Font */}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label >Twitter Url</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins"
                                                            disabled
                                                            value={getSingleCampaign && getSingleCampaign.twitter_url ? getSingleCampaign.twitter_url : "-"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End date */}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                            </div>
                                        </div>
                                    </div>
                                    {/* Form section2 div end here */}
                                    {/* file chosen button end here */}
                                    {/* Cancel and Save button */}
                                    <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                        <button className="cancel-btn-of-form fnt-poppins"
                                            onClick={() => history.goBack("/campaign?page=" + path)}
                                        >Cancel</button>
                                        <button className="Save-btn-of-form mrg-left-20 fnt-poppins">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                : <Loader />
            }
        </>
    );
}

export default withRouter(CompaignDetails);