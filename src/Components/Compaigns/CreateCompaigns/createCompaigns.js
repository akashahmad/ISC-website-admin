import React, { useState, useEffect } from 'react'
import InputColor from 'react-input-color';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { campaignBanner_baseurl, campaignLogo_baseurl, apiPath } from '../../../config'
import { CREATE_CAMPAIGN } from '../../apollo/Mutations/createCampaign'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CAMPAIGN_CATEGORIES } from '../../apollo/Quries/campaignCategories';
import publicIp from 'public-ip'
import ipInt from 'ip-to-int'
import cookie from 'react-cookies'
import { getParams } from '../../functions'

const CreateCompaign = (props) => {
    let { history, location } = props;
    const { data } = useQuery(CAMPAIGN_CATEGORIES, { context: { clientName: "second" } });
    let path = getParams(location.search);
    // states for colors
    const [initial] = useState("#5e72e4")
    const [secondary] = useState("#EC2027")
    const [tertiaryC] = useState("#000000")
    const [color, setColor] = useState("");
    const [secondaryColor, setSecondaryColor] = useState("");
    const [tertiary, setTertiaryColor] = useState("");
    const [addMoreImage, setAddMoreImage] = useState("");
    const [bannerimage, setBannerImage] = useState("");
    const [createCampaign] = useMutation(CREATE_CAMPAIGN);
    const [ipAddress, setIpAddress] = useState();
    // create Campaign State
    const [name, setName] = useState("")
    const [campaignType, setCampaignType] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [goalSupport, setgoal_support] = useState("")
    const [facebook, setfacebook_url] = useState("")
    const [twitter, settwitter_url] = useState("")
    const [website, setwebsite_url] = useState("")
    const [featuredChechbox, setFeaturedCheckbox] = useState("0");
    const [buttonText, setButtonText] = useState("Create")
    const [selectOverlay, setSelectOverlay] = useState("")
    const [country, setSelectCountry] = useState("")
    const [loader, setLoader] = useState(false)

    // const addImage = () => {
    //     let duplicateImage = [...addMoreImage]
    //     duplicateImage.push("")
    //     setAddMoreImage(duplicateImage)
    // }

    // method for uploading product image
    const uploadProductImage = (event) => {
        const file = event.target.files[0];
        setBannerImage("Loading");
        getBase64(file).then(
            data => {
                let final = {
                    imageFile: data,
                };
                axios.post(apiPath + "/bannerUpload", final).then(res => {
                    setBannerImage(res.data.imageUrl);
                });
            });
    };

    // method for Overlay Image
    const uploadOverlayImage = (event) => {
        setLoader(true);
        const file = event.target.files[0];
        setSelectOverlay("Loading");
        getBase64(file).then(
            data => {
                let final = {
                    imageFile: data,
                };
                axios.post(apiPath + "/uploadLogo", final).then(res => {
                    setSelectOverlay(res.data.imageUrl)
                })
            });
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // method for selecting a campaign type
    const handeler = (value) => {
        switch (value) {
            case "Petition":
                return setCampaignType("Petition")

            case "Fundraiser":
                return setCampaignType("Fundraiser")

            case "Pledge":
                return setCampaignType("Pledge")

            case "":
                return setCampaignType("")
        }
    }

    useEffect(() => {
        publicIp.v4().then(ip => {
            setIpAddress(ip);
        })
    }, [])

    // method for creating a campaign
    const onSubmit = (event) => {
        event.preventDefault();
        setButtonText("Creating...")
        let stDate = new Date(startDate)
        let edDate = new Date(endDate)
        let token = cookie.load("token")
        if (!categoryId) {
            setButtonText("Create")
        }
        if (!campaignType) {
            setButtonText("Create")
        }
        if (!shortDescription) {
            setButtonText("Create")
        }
        if (!description) {
            setButtonText("Create")
        }
        if (!goalSupport) {
            setButtonText("Create")
        }
        else {
            setButtonText("Creating...")
            createCampaign({
                variables: {
                    Name: name,
                    CampaignType: campaignType,
                    ShortDescription: shortDescription,
                    CategoryId: parseInt(categoryId),
                    Description: description,
                    StartDate: stDate.toISOString() ? stDate.toISOString() : "",
                    EndDate: edDate.toISOString() ? edDate.toISOString() : "",
                    goal_support: parseInt(goalSupport),
                    facebook_url: facebook ? facebook : "",
                    twitter_url: twitter ? twitter : "",
                    website_url: website ? website : "",
                    Primary_color: color.hex.toString() !== initial ? color.hex.toString() : "",
                    Secondary_color: secondaryColor.hex.toString() !== secondary ? secondaryColor.hex.toString() : "",
                    Tertiary_color: tertiary.hex.toString() !== tertiaryC ? tertiary.hex.toString() : "",
                    Logo: selectOverlay ? selectOverlay : "",
                    is_admin_boosted:featuredChechbox,
                    Banner: bannerimage ? bannerimage : "",
                    Createduser: "Admin",
                    CreatedIp: ipInt(ipAddress).toInt(),
                    token: token
                }
            }).then(res => {
                history.push("/edit-campaign/" + res.data.createCampaign.Id)
            }).catch(error => {
                setButtonText("Create")
            })
        }
    }

    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add Campaign</h6>
                <button onClick={() => history.goBack("/campaign?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form onSubmit={event => onSubmit(event)}>
                <div className="Table-of-administrator">
                    <div className="container-fluid background-of-table">
                        <div className="blanck-dev"></div>
                        {/* Table Section */}
                        <div className="container  Form-section-startup Form-sections-startups-responsive">
                            {/* choose file inputs start here */}
                            {/* Display Social Share Image */}
                            <div className="has-padding-top-20">
                                <label className="overlay-responsive-social-img mrg-left-50 fnt-poppins">Banner Image</label>
                                <div className="field mrg-top-20">
                                    <div className="Form-section2-uploading-image">
                                        <div className="has-padding-top-20">
                                            {bannerimage ?
                                                <div className="store-front-image"
                                                    style={{
                                                        backgroundImage: `url(${bannerimage !== "Loading" ? campaignBanner_baseurl + bannerimage : require('../../../assets/Images/main-loader.gif')})`,
                                                        height: "100px",
                                                        backgroundSize: "contain",
                                                        backgroundRepeat: "no-repeat",
                                                        marginLeft: "91px",
                                                        width: "100px"
                                                    }}>
                                                </div>
                                                :
                                                <img className="dashboard_icon"
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
                                    </div>
                                    <div className="file is-small has-name has-margin-left-60 has-padding-left-20">
                                        <label className="file-label">
                                            <input className="file-input fnt-poppins"
                                                type="file" name="resume"
                                                accept="image/*"
                                                onChange={event => uploadProductImage(event)} />
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
                            {/* Second choose file button */}
                            {selectOverlay ?
                                <div className="store-front-image has-margin-top-10"
                                    style={{
                                        backgroundImage: `url(${selectOverlay !== "Loading" ? campaignLogo_baseurl + selectOverlay : require('../../../assets/Images/main-loader.gif')})`,
                                        height: "100px",
                                        backgroundSize: "contain",
                                        width: "100px",
                                        backgroundRepeat: "no-repeat",
                                        marginLeft: "91px"
                                    }}>
                                </div>
                                :
                                <img className="dashboard_icon"
                                    src={require('../../../assets/Images/admin.png')}
                                    style={{
                                        height: "100px",
                                        width: "95px",
                                        backgroundRepeat: "no-repeat",
                                        marginLeft: "91px"
                                    }}
                                />
                            }
                            <div className="file is-small has-name has-margin-left-60 has-padding-left-20">
                                <label className="file-label">
                                    <input className="file-input fnt-poppins"
                                        type="file" name="resume"
                                        accept="image/*"
                                        onChange={event => uploadOverlayImage(event)} />
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
                            {/* hashtag back color */}
                            <div className="is-flex">
                                <div className="mrg-left-50 mrg-top-30">
                                    <label className="fnt-poppins ">Primary Color</label>
                                    <div className="react-input-color has-margin-top-20"
                                        style={{
                                            width: 80,
                                            height: 50,
                                            marginBottom: 20,
                                            backgroundColor: color.hex,
                                            initialHexColor: initial
                                        }}>
                                        {color.hex}
                                    </div>
                                    <InputColor initialHexColor={initial} onChange={setColor} />
                                </div>
                                <div className="mrg-left-50 mrg-top-30">
                                    <label className="fnt-poppins ">Secondary Color</label>
                                    <div className="react-input-color has-margin-top-20"
                                        style={{
                                            width: 80,
                                            height: 50,
                                            marginBottom: 20,
                                            backgroundColor: secondaryColor.hex,
                                            initialHexColor: secondary
                                        }}>
                                        {secondaryColor.hex}
                                    </div>
                                    <InputColor initialHexColor={secondary} onChange={setSecondaryColor} />
                                </div>
                                <div className="mrg-left-50 mrg-top-30">
                                    <label className="fnt-poppins ">Tertiary Color</label>
                                    <div className="react-input-color has-margin-top-20"
                                        style={{
                                            width: 80,
                                            height: 50,
                                            marginBottom: 20,
                                            backgroundColor: tertiary.hex,
                                            initialHexColor: tertiaryC
                                        }}>
                                        {tertiary.hex}
                                    </div>
                                    <InputColor initialHexColor={tertiaryC} onChange={setTertiaryColor} />
                                </div>
                            </div>
                            {/* checkbox */}
                            <div className="mrg-left-50 fnt-poppins mrg-top-20">
                                <div>
                                    <label>Featured</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="checkbox-for-edit-forms mrg-left-5" type="checkbox"
                                        // value={featuredChechbox}
                                        onChange={event => {
                                            if (featuredChechbox === "0") {
                                                setFeaturedCheckbox("1");
                                            }
                                            else{
                                                setFeaturedCheckbox("0");
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            {/* inputs starts from here */}
                            <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                <div className="Form-section1-main-div-of-inputs ">
                                    {/* Campaign Name */}
                                    <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                        <div className="form-group">
                                            <div>
                                                <label className="mrg-top-20 fnt-poppins">Campaign Main Headline (100 characters)*</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins " type="name" placeholder="Enter Name"
                                                    required
                                                    value={name}
                                                    onChange={event => setName(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Short Discriptions */}
                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label >Secondary Headline (300 characters)*</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" placeholder="Enter Short Description"
                                                    value={shortDescription}
                                                    onChange={event => setShortDescription(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* facebook url */}
                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Select CampaignType*</label>
                                            </div>
                                            <div>
                                                <select className="mrg-top-10 fnt-poppins" type="Hash-Tag" placeholder="Enter Hash Tag"
                                                    onChange={(event) => handeler(event.target.value)}
                                                    required
                                                >
                                                    <option value="">Select Campaign Type</option>
                                                    <option value="Fundraiser">Fundraiser</option>
                                                    <option value="Petition">Petition</option>
                                                    <option value="Pledge">Pledge</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Hash Tag */}
                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            {campaignType ?
                                                <label className="">
                                                    {campaignType === "Fundraiser" ? "Monetary Goal" : ""}
                                                    {campaignType === "Petition" ? "Petition Goal" : ""}
                                                    {campaignType === "Pledge" ? "No of Pledges Aiming For" : ""}
                                                    {campaignType === "" ? "Select Campaign Type First" : ""}
                                                </label>
                                                : "Select Campaign Type First"}
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" type="number" placeholder="Enter Hash Tag" required
                                                    onChange={(event) => setgoal_support(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Start date */}
                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label >Start Date*</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" type="date"
                                                    value={startDate}
                                                    required
                                                    onChange={event => setStartDate(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* End date */}
                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label >End Date*</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" type="date"
                                                    value={endDate}
                                                    required
                                                    onChange={event => setEndDate(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* are you an**/}
                                    {/* <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Are you an*</label>
                                            </div>
                                            <div>
                                                <select className="mrg-top-10 fnt-poppins" type="Hash-Tag" placeholder="Enter Hash Tag">
                                                    <option value="">Individual</option>
                                                    <option value="">Company</option>
                                                    <option value="">Non-Profit / NGO</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                {/* Form section2 dv start here */}
                                <div className="Form-section2-main-div-of-inputs mrg-top-10">
                                    {/* slug */}
                                    <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label >Category*</label>
                                            </div>
                                            <div>
                                                <select className="has-margin-top-10 fnt-poppins"
                                                    onChange={event => setCategoryId(event.target.value)} required>
                                                    <option value="">Select Category</option>
                                                    {data && data.campaignCategories && data.campaignCategories.map((single, index) =>
                                                        <option value={single.Id}>{single.Name}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Description */}

                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Description*</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" type="keyword" placeholder="Enter Keyword"
                                                    required
                                                    value={description}
                                                    onChange={event => setDescription(event.target.value)}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* KeyWord */}

                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Facebook Url</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" type="Hash-Tag" placeholder="Enter Hash Tag"
                                                    value={facebook}
                                                    onChange={(event) => setfacebook_url(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Transparency */}
                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Twitter Url</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins"
                                                    value={twitter}
                                                    onChange={event => settwitter_url(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Hash Tag Font */}
                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label >Website Url</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins"
                                                    value={website}
                                                    onChange={event => setwebsite_url(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Select Currency*/}
                                    {/* <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Currency Type*</label>
                                            </div>
                                            <div>
                                                <select className="mrg-top-10 fnt-poppins" type="Hash-Tag" placeholder="Enter Hash Tag">
                                                    <option value="">Choose Currency</option>
                                                    <option value="">UED</option>
                                                    <option value="">INR</option>
                                                    <option value="">EUR</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* select Country */}
                                    {/* <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Select Country*</label>
                                            </div>
                                            <div>
                                            <select required className="fnt-poppins mrg-top-10"
                                                onChange={(event) => {
                                                    setSelectCountry(event.target.value)
                                                }}
                                            >
                                                <option value="">Select Country</option>
                                                {getData().map((single, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={getCode(single.name)}
                                                        >
                                                            {single.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            {/* Form section2 div end here */}
                            {/* Cancel and Save button */}
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <span className="cancel-btn-of-form fnt-poppins"
                                    onClick={() => history.goBack("/campaign?page=" + path)}
                                >Cancel</span>
                                <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">{buttonText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default withRouter(CreateCompaign)