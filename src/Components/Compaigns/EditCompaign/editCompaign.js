import React, { useState, useEffect } from 'react'
import InputColor from 'react-input-color';
import { withRouter } from 'react-router-dom'
import { SINGLE_CAMPAIGN } from '../../apollo/Quries/singleCampaign'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { campaignBanner_baseurl, campaignLogo_baseurl } from '../../../Config'
import { getParams } from '../../functions'
// import Loader from '../../commonComponents/Loader/loader'
import { EDIT_CAMPAIGN } from '../../apollo/Mutations/updateCampaign'
import axios from 'axios'
import { apiPath } from '../../../Config'
// import ImageLoader from '../../../assets/Images/loader.gif'
import ContentLoader from 'react-content-loader'
import Cookie from 'react-cookies'

const CompaignDetails = (props) => {
    let { history, match, location } = props;
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : "";
    const { loading, data } = useQuery(SINGLE_CAMPAIGN(id), { context: { clientName: "second" } });
    const [getAllCampaignsType, setGetAllCampaigns] = useState();
    // colors
    const [initial] = useState("#5e72e4")
    const [secondary] = useState("#EC2027")
    const [tertiaryC] = useState("#000000")
    const [color, setColor] = useState("");
    const [secondaryColor, setSecondaryColor] = useState("");
    const [tertiary, setTertiaryColor] = useState("");

    let selectedCampaign = data && data.SingleCampaign && data.SingleCampaign.CampaignType;

    const [editData] = useMutation(EDIT_CAMPAIGN);
    const [renderData, setRenderData] = useState("");
    const [hideShowColors, setHideShowColors] = useState(false)
    const [hideShowButtonText, setHideShowButtonText] = useState("Edit Hash Tag Colors")
    const [updateButtonText, setUpdateButtonText] = useState("Update")
    const [bannerImg, setBannerImg] = useState("");
    const [logoImg, setLogoImg] = useState("")
    const [email, setEmail] = useState("");

    useEffect(() => {
        setRenderData(data && data.SingleCampaign ? { ...data.SingleCampaign } : {});
        setGetAllCampaigns(data && data.campaignCategories)
        setBannerImg(data && data.SingleCampaign && data.SingleCampaign.Banner);
        setLogoImg(data && data.SingleCampaign && data.SingleCampaign.Logo);
    }, [data])

    const uploadProductImage = (event, index) => {
        const file = event.target.files[0];
        setBannerImg("Loading");
        getBase64(file).then(
            data => {
                let final = {
                    imageFile: data,
                };
                axios.post(apiPath + "/bannerUpload", final).then(res => {
                    let duplicateProducts = { ...renderData };
                    duplicateProducts.Banner = res.data.imageUrl;
                    setRenderData({ ...duplicateProducts })
                    setBannerImg(res.data.imageUrl);
                });
            });
    };

    const uploadOverlayImage = (event) => {
        const file = event.target.files[0];
        setLogoImg("Loading");
        getBase64(file).then(
            data => {
                let final = {
                    imageFile: data,
                };
                axios.post(apiPath + "/uploadLogo", final).then(res => {
                    let duplicateProducts = { ...renderData };
                    duplicateProducts.Logo = res.data.imageUrl;
                    setRenderData({ ...duplicateProducts })
                    setLogoImg(res.data.imageUrl);
                })
            });
    };

    // const uploadOverlayImage = (event, index) => {
    //     const file = event.target.files[0];
    //     getBase64(file).then(
    //         data => {
    //             let final = {
    //                 imageFile: data,
    //             };
    //             axios.post(apiPath + "/uploadLogo", final).then(res => {
    //                 let duplicateImage = [...logo]
    //                 duplicateImage[index] = res.data.imageUrl;
    //                 setRenderData(duplicateImage);
    //             });
    //         });
    // };
    // const addVariation = () => {
    //     let duplicateVariation = [...logo]
    //     duplicateVariation.push("")
    //     setLogo(duplicateVariation);
    // }
    let token = Cookie.load("token");

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const displayHide = () => {
        if (hideShowColors === true) {
            setHideShowColors(false)
            setHideShowButtonText("Edit Hash Tag Colors")
        }
        else if (hideShowColors === false) {
            setHideShowColors(true)
            setHideShowButtonText("Back")
        }
    }

    const updateCampaign = (event) => {
        event.preventDefault();
        let stDate = new Date(renderData && renderData.StartDate)
        let edDate = new Date(renderData && renderData.EndDate)
        if (hideShowColors === false) {
            setUpdateButtonText("Updating...")
            editData({
                variables: {
                    Id: parseInt(id),
                    Name: renderData.Name ? renderData.Name : "",
                    facebook_url: renderData.facebook_url ? renderData.facebook_url : "",
                    twitter_url: renderData.twitter_url ? renderData.twitter_url : "",
                    CampaignType: selectedCampaign ? selectedCampaign : "",
                    goal_support: parseInt(renderData.goal_support),
                    website_url: renderData.website_url ? renderData.website_url : "",
                    ShortDescription: renderData.ShortDescription ? renderData.ShortDescription : "",
                    Description: renderData.Description ? renderData.Description : "",
                    Banner: renderData.Banner,
                    Primary_color: renderData && renderData.Primary_color,
                    Secondary_color: renderData && renderData.Secondary_color,
                    Tertiary_color: renderData && renderData.Tertiary_color,
                    StartDate: stDate.toISOString() ? stDate.toISOString() : "",
                    EndDate: edDate.toISOString() ? edDate.toISOString() : "",
                    Logo: renderData.Logo,
                    is_admin_boosted:renderData.is_admin_boosted,
                    Email: email ? email : "",
                    token: token
                }
            }).then(res => {
                setUpdateButtonText("Updated")
            }).catch(error => {
                setUpdateButtonText("Update")
            })
        }
        else if (hideShowColors === true) {
            setUpdateButtonText("Updating...")
            editData({
                variables: {
                    Id: parseInt(id),
                    Name: renderData.Name ? renderData.Name : "",
                    facebook_url: renderData.facebook_url ? renderData.facebook_url : "",
                    twitter_url: renderData.twitter_url ? renderData.twitter_url : "",
                    CampaignType: selectedCampaign,
                    goal_support: parseInt(renderData.goal_support),
                    website_url: renderData.website_url ? renderData.website_url : "",
                    ShortDescription: renderData.ShortDescription ? renderData.ShortDescription : "",
                    Description: renderData.Description ? renderData.Description : "",
                    Banner: renderData.Banner,
                    Primary_color: color.hex,
                    Secondary_color: secondaryColor.hex,
                    Tertiary_color: tertiary.hex,
                    StartDate: stDate.toISOString() ? stDate.toISOString() : "",
                    EndDate: edDate.toISOString() ? edDate.toISOString() : "",
                    Logo: renderData.Logo,
                    is_admin_boosted:renderData.is_admin_boosted,
                    Email: email ? email : "",
                    token: token
                }
            }).then(res => {
                setUpdateButtonText("Updated")
            }).catch(error => {
                setUpdateButtonText("Update")
            })
        }
    }


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
                    <form onSubmit={event => updateCampaign(event)}>
                        <div className="Table-of-administrator">
                            <div className="container-fluid background-of-table">
                                <div className="blanck-dev"></div>
                                {/* Table Section */}
                                <div className="container  Form-section-startup Form-sections-startups-responsive">
                                    {/* choose file inputs start here */}
                                    {/* Display Social Share Image */}
                                    <div className="has-padding-top-20">
                                        <label className="overlay-responsive-social-img mrg-left-50 fnt-poppins">Banner Image</label>
                                        <div class="field mrg-top-20 mrg-left-50">
                                            <div className="file is-small has-name ">
                                                {bannerImg ?
                                                    <div className="store-front-image"
                                                        style={{
                                                            backgroundImage: `url(${bannerImg !== "Loading" ? campaignBanner_baseurl + bannerImg : require('../../../assets/Images/main-loader.gif')})`,
                                                            height: "100px",
                                                            backgroundSize: "contain",
                                                            backgroundRepeat: "no-repeat",
                                                            marginLeft: "89px",
                                                            width: "101px"
                                                        }}>
                                                    </div>
                                                    :
                                                    <img className="dashboard_icon"
                                                        src={require('../../../assets/Images/admin.png')}
                                                        style={{
                                                            height: "100px",
                                                            width: "100px",
                                                            backgroundRepeat: "no-repeat",
                                                            marginLeft: "89px"
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className="file is-small has-name has-margin-left-60 has-padding-left-20">
                                                <label className="file-label">
                                                    <input className="file-input fnt-poppins"
                                                        type="file" name="resume"
                                                        accept="image/*"
                                                        onChange={event => uploadProductImage(event)}
                                                    />
                                                    <span className="file-cta has-margin-top-5">
                                                        <span className="file-icon">
                                                            <i className="fas fa-upload"></i>
                                                        </span>
                                                        <span className="file-label width-bt-80 ">
                                                            Choose file
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Overlays Image choose button start here */}
                                    <div className="mrg-top-20">
                                        <label className="overlay-responsive-social-img mrg-left-60 fnt-poppins">Logo</label>
                                    </div>
                                    {/* First choose file button */}
                                    <div className="field mrg-top-20  mrg-left-50">
                                        <div className="file is-small has-name ">
                                            {logoImg ?
                                                <div className="store-front-image"
                                                    style={{
                                                        backgroundImage: `url(${logoImg != "Loading" ? campaignLogo_baseurl + logoImg : require('../../../assets/Images/main-loader.gif')})`,
                                                        height: "100px",
                                                        backgroundSize: "contain",
                                                        backgroundRepeat: "no-repeat",
                                                        marginLeft: "91px",
                                                        width: "100px"
                                                    }}>
                                                </div>
                                                :
                                                <img className="dashboard_icon" alt="edit-campaign"
                                                    src={require('../../../assets/Images/admin.png')}
                                                    style={{
                                                        height: "100px",
                                                        width: "95px",
                                                        backgroundRepeat: "no-repeat",
                                                        marginLeft: "91px"
                                                    }}
                                                />
                                            }
                                        </div>
                                        <div className="file is-small has-name has-margin-left-60 has-padding-left-20">
                                            <label className="file-label">
                                                <input className="file-input fnt-poppins"
                                                    type="file" name="resume"
                                                    accept="image/*"
                                                    onChange={event => uploadOverlayImage(event)}
                                                />
                                                <span className="file-cta has-margin-top-5">
                                                    <span className="file-icon">
                                                        <i className="fas fa-upload"></i>
                                                    </span>
                                                    <span className="file-label width-bt-80 ">
                                                        Choose file
                                                        </span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    {/* add more images */}
                                    {/* <div className="field mrg-top-20  mrg-left-50">
                                        {logo && logo.map((single, index) =>
                                            <div key={index} className="file is-small has-name " >
                                                <div style={{ flexDirection: "column" }}>
                                                    {single && single.logo ?
                                                        <div className="store-front-image"
                                                            style={{
                                                                backgroundImage: `url(${single.logo ? campaignLogo_baseurl + single.logo : "no-image"})`,
                                                                height: "100px",
                                                                backgroundSize: "contain",
                                                                backgroundRepeat: "no-repeat",
                                                                marginLeft: "7%"
                                                            }}>
                                                        </div>
                                                        :
                                                        <img className="dashboard_icon"
                                                            src={require('../../../assets/Images/admin.png')}
                                                            style={{
                                                                height: "100px",
                                                                width: "95px",
                                                                backgroundRepeat: "no-repeat",
                                                                marginLeft: "44%"
                                                            }}
                                                        />
                                                    }
                                                    <div className="file is-small has-name has-margin-left-60 has-padding-left-20">
                                                        <label className="file-label">
                                                            <input className="file-input fnt-poppins"
                                                                type="file" name="resume"
                                                                accept="image/*"
                                                                onChange={event => uploadOverlayImage(event)}
                                                            />
                                                            <span className="file-cta has-margin-top-5">
                                                                <span className="file-icon">
                                                                    <i className="fas fa-upload"></i>
                                                                </span>
                                                                <span className="file-label width-bt-80 ">
                                                                    Choose file
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div> */}
                                    {/* <div className="has-margin-bottom-20 has-margin-left-80">
                                        <div className="btns-of-add mrg-top-10 has-margin-left-60 fnt-poppins">
                                            <span className="has-padding-5 Save-btn-of-form fnt-poppins"
                                                onClick={() => addVariation()}
                                            >Add Logo</span>
                                        </div>
                                    </div> */}
                                    {/* hashtag back color */}
                                    <label className="fnt-poppins mrg-left-50">Hash Tag Back Color</label>
                                    {/* <div className="mrg-left-50 mrg-top-20">
                                        {!dataSecondary && !dataPrimary && !dataTertiary ?
                                            <div>
                                                <h5>No Records Found</h5>
                                            </div>
                                            : ""}
                                    </div> */}
                                    {!hideShowColors ?
                                        <div className="is-flex">
                                            <div className="mrg-left-50 mrg">
                                                {renderData && renderData.Secondary_color ?
                                                    <div>
                                                        <div className="react-input-color mrg-top-20"
                                                            style={{
                                                                width: 80,
                                                                height: 50,
                                                                marginBottom: 20,
                                                                backgroundColor: renderData && renderData.Secondary_color
                                                            }}>
                                                        </div>
                                                        <label>Secondary Color</label>
                                                    </div>
                                                    : ""}
                                            </div>
                                            <div className="mrg-left-50 mrghas-margin-top-30">
                                                {renderData && renderData.Tertiary_color ?
                                                    <div>
                                                        <div className="react-input-color mrg-top-20"
                                                            style={{
                                                                width: 80,
                                                                height: 50,
                                                                marginBottom: 20,
                                                                backgroundColor: renderData && renderData.Tertiary_color
                                                            }}>
                                                        </div>
                                                        <label>Tertiary Color</label>
                                                    </div>
                                                    : ""}
                                            </div>
                                            <div className="mrg-left-50 mrghas-margin-top-30">
                                                {renderData && renderData.Primary_color ?
                                                    <div>
                                                        <div className="react-input-color mrg-top-20"
                                                            style={{
                                                                width: 80,
                                                                height: 50,
                                                                marginBottom: 20,
                                                                backgroundColor: renderData && renderData.Primary_color
                                                            }}>
                                                        </div>
                                                        <label>Primary Color</label>
                                                    </div>
                                                    : ""}
                                            </div>
                                        </div>
                                        : ""}
                                    {hideShowColors ?
                                        <div className="is-flex">
                                            <div className="mrg-left-50 mrg">
                                                <div>
                                                    <div className="react-input-color mrg-top-20"
                                                        style={{
                                                            width: 80,
                                                            height: 50,
                                                            marginBottom: 20,
                                                            backgroundColor: secondaryColor.hex,
                                                        }}>
                                                        {secondaryColor.hex}
                                                    </div>
                                                    <div>
                                                        <InputColor initialHexColor={secondary} onChange={setSecondaryColor} />
                                                    </div>
                                                    <label>Select Secondary Color</label>
                                                </div>
                                            </div>
                                            <div className="mrg-left-50 mrghas-margin-top-30">
                                                <div>
                                                    <div className="react-input-color mrg-top-20"
                                                        style={{
                                                            width: 80,
                                                            height: 50,
                                                            marginBottom: 20,
                                                            backgroundColor: tertiary.hex,
                                                        }}>
                                                        {tertiary.hex}
                                                    </div>
                                                    <div>
                                                        <InputColor initialHexColor={tertiaryC} onChange={setTertiaryColor} />
                                                    </div>
                                                    <label>Select Tertiary Color</label>
                                                </div>
                                            </div>
                                            <div className="mrg-left-50 mrghas-margin-top-30">
                                                <div>
                                                    <div className="react-input-color mrg-top-20"
                                                        style={{
                                                            width: 80,
                                                            height: 50,
                                                            marginBottom: 20,
                                                            backgroundColor: color.hex,
                                                        }}>
                                                        {color.hex}                                                    </div>
                                                    <div>
                                                        <InputColor initialHexColor={initial} onChange={setColor} />
                                                    </div>
                                                    <label>Select Primary Color</label>
                                                </div>
                                            </div>
                                        </div>
                                        : ""}
                                    <div className="has-margin-bottom-20">
                                        <div className="btns-of-add mrg-top-10 has-margin-left-50 fnt-poppins">
                                            <span className="has-padding-5 Save-btn-of-form fnt-poppins"
                                                onClick={() => displayHide(false)}
                                            >{hideShowButtonText}</span>
                                        </div>
                                    </div>
                                    {/* checkbox */}
                                    <div className="mrg-left-50 fnt-poppins mrg-top-20">
                                        <div>
                                            <label>Featured</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="checkbox-for-edit-forms mrg-left-5" type="checkbox"
                                                checked={renderData && renderData.is_admin_boosted === "1"}
                                                onChange={event => {
                                                    if (renderData && renderData.is_admin_boosted === "1") {
                                                        let duplicateData = { ...renderData }
                                                        duplicateData.is_admin_boosted = "0"
                                                        setRenderData({ ...duplicateData })
                                                    }
                                                    else{
                                                        let duplicateData = { ...renderData }
                                                        duplicateData.is_admin_boosted = "1"
                                                        setRenderData({ ...duplicateData })
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* inputs starts from here */}
                                    <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                        <div className="Form-section1-main-div-of-inputs  ">
                                            {/* Campaign Name */}
                                            <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                                <div className="form-group">
                                                    <div>
                                                        <label className="mrg-top-20 fnt-poppins">Campaign Name*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins"
                                                            value={renderData && renderData.Name}
                                                            onChange={event => {
                                                                let dupilcateName = { ...renderData }
                                                                dupilcateName.Name = event.target.value
                                                                setRenderData({ ...dupilcateName })
                                                            }}
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
                                                            value={renderData && renderData.ShortDescription}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.ShortDescription = event.target.value
                                                                setRenderData({ ...duplicateData });
                                                            }}
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
                                                            value={renderData && renderData.facebook_url}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.facebook_url = event.target.value
                                                                setRenderData({ ...duplicateData });
                                                            }}
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
                                                                value={renderData && renderData.EndDate}
                                                                required
                                                                onChange={event => {
                                                                    let duplicateData = { ...renderData }
                                                                    duplicateData.EndDate = event.target.value
                                                                    setRenderData({ ...duplicateData });
                                                                }}
                                                                type="date"
                                                            />
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
                                                            value={renderData && renderData.StartDate}
                                                            required
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.StartDate = event.target.value
                                                                setRenderData({ ...duplicateData });
                                                            }}
                                                            type="date"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label >Email</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins"
                                                            type={email}
                                                            value={email}
                                                            onChange={event => {
                                                                setEmail(event.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Form section2 dv start here */}
                                        <div className="Form-section2-main-div-of-inputs mrg-top-10">
                                            {/* slug */}
                                            {/* Category */}
                                            <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    {data && data.SingleCampaign && data.SingleCampaign.CampaignType ?
                                                        <label className="">
                                                            {data && data.SingleCampaign && data.SingleCampaign.CampaignType === "Fundraiser" ? "Monetary Goal" : ""}
                                                            {data && data.SingleCampaign && data.SingleCampaign.CampaignType === "Petition" ? "Petition Goal" : ""}
                                                            {data && data.SingleCampaign && data.SingleCampaign.CampaignType === "Pledge" ? "No of Pledges Aiming For" : ""}
                                                        </label>
                                                        : ""}
                                                    <div>
                                                        {data && data.SingleCampaign && data.SingleCampaign.CampaignType ?
                                                            <input className="mrg-top-10 fnt-poppins" type="Hash-Tag"
                                                                value={renderData && renderData.goal_support}
                                                                onChange={event => {
                                                                    let duplicateData = { ...renderData }
                                                                    duplicateData.goal_support = event.target.value
                                                                    setRenderData({ ...duplicateData });
                                                                }}
                                                            />
                                                            : ""}
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
                                                            value={renderData && renderData.Description}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.Description = event.target.value
                                                                setRenderData({ ...duplicateData });
                                                            }}
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
                                                        <select className="mrg-top-10 fnt-poppins" type="keyword"
                                                            value={renderData && renderData.CategoryId ? renderData.CategoryId : ""}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.CategoryId = event.target.value
                                                                setRenderData({ ...duplicateData });
                                                            }}
                                                        >
                                                            <option>Select Category</option>
                                                            {getAllCampaignsType && getAllCampaignsType.length !== 0 && getAllCampaignsType.map(single =>
                                                                <option value={single.Id}>{single.Name}</option>
                                                            )}
                                                        </select>
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
                                                            value={renderData && renderData.website_url}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.website_url = event.target.value
                                                                setRenderData({ ...duplicateData });
                                                            }}
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

                                                            value={renderData && renderData.twitter_url}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.twitter_url = event.target.value
                                                                setRenderData({ ...duplicateData });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                            </div>
                                        </div>
                                    </div>
                                    {/* Form section2 div end here */}
                                    {/* file chosen button end here */}
                                    {/* Cancel and Save button */}
                                    <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                        <span className="cancel-btn-of-form fnt-poppins"
                                            onClick={() => history.goBack("/campaign?page=" + path)}
                                        >Cancel</span>
                                        <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">{updateButtonText}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                :
                <ContentLoader
                    speed={2}
                    viewBox="100 -30 750 1000"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="207" y="11" rx="0" ry="0" width="499" height="19" />
                    <rect x="243" y="63" rx="5" ry="5" width="205" height="21" />
                    <rect x="483" y="63" rx="5" ry="5" width="204" height="21" />
                    <rect x="244" y="114" rx="5" ry="5" width="203" height="21" />
                    <rect x="243" y="168" rx="5" ry="5" width="205" height="21" />
                    <rect x="484" y="168" rx="5" ry="5" width="204" height="21" />
                    <rect x="246" y="286" rx="5" ry="5" width="443" height="82" />
                    <circle cx="261" cy="220" r="13" />
                    <circle cx="261" cy="261" r="13" />
                    <rect x="286" y="216" rx="0" ry="0" width="45" height="7" />
                    <rect x="286" y="258" rx="0" ry="0" width="45" height="6" />
                    <rect x="206" y="13" rx="0" ry="0" width="21" height="438" />
                    <rect x="207" y="432" rx="0" ry="0" width="517" height="24" />
                    <rect x="703" y="11" rx="0" ry="0" width="22" height="429" />
                    <rect x="248" y="388" rx="6" ry="6" width="82" height="25" />
                    <rect x="341" y="388" rx="6" ry="6" width="82" height="25" />
                </ContentLoader>
            }
        </>
    );
}

export default withRouter(CompaignDetails);