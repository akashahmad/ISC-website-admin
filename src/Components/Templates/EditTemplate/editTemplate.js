import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { SINGLE_TEMPLATE } from '../../apollo/Quries/singleTemplate'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { UPDATE_TEMPLATE } from '../../apollo/Mutations/updateTemplate'
import JoditEditor from "jodit-react";
import { getParams } from '../../functions'
import ContentLoader from 'react-content-loader'

const EditTemplate = (props) => {
    let { history, match, location } = props;
    let path = getParams(location.search);

    let id = match.params && match.params.id ? match.params.id : "";
    const { loading, data } = useQuery(SINGLE_TEMPLATE(id));
    const [editData] = useMutation(UPDATE_TEMPLATE);
    const [renderData, setRenderData] = useState("");
    const [buttonText, setButtontext] = useState("Update");
    const [templateVariables, setTemplatevariables] = useState([]);
    const [category, setCategory] = useState("");
    const [joditvalue, setJoditValue] = useState("");
    const [joditContent, setJoditContent] = useState("");

    console.log("data && data.singletemplate && data.singletemplate.Category",data && data.singletemplate && data.singletemplate.Category)

    useEffect(() => {
        setRenderData(data && data.singletemplate ? { ...data.singletemplate } : {});
        setCategory(data && data.singletemplate && data.singletemplate.Category);
        setJoditValue(data && data.singletemplate.Content ? data.singletemplate.Content : "");
        // template variables
        if (data && data.singletemplate && data.singletemplate.Category === "") {
            setTemplatevariables("");
        }
        if (data && data.singletemplate && data.singletemplate.Category === "signUp") {
            setTemplatevariables("[user_name][userId][uid]");
        }
        if (data && data.singletemplate && data.singletemplate.Category === "welcome") {
            setTemplatevariables("[user_name]");
        }
        if (data && data.singletemplate && data.singletemplate.Category === "CreateCampaign") {
            setTemplatevariables("[creator_name][creator_email][campaign_name][campaign_link]");
        }
        if (data && data.singletemplate && data.singletemplate.Category === "campaignSupported") {
            setTemplatevariables("[supporters][campaign_name][campaign_link][supporters_percentage][user_name]");
        }
        if (data && data.singletemplate && data.singletemplate.Category === "forgetPassword") {
            setTemplatevariables("[userId][uid][user_name]");
        }
        if (data && data.singletemplate && data.singletemplate.Category === "notPremium") {
            setTemplatevariables("[user_name][campaign_name][campaign_link]");
        }
        if (data && data.singletemplate && data.singletemplate.Category === "sellerRecive") {
            setTemplatevariables("[buyer_email][buyer_name][charge_amount][order_id][shipment_charges][total_products][buyer_country][tax][address][phone][state][postal_code][application_fee][recived_amount][seller_name]")
        }
        if (data && data.singletemplate && data.singletemplate.Category === "buyerRecive") {
            setTemplatevariables("[seller_email][seller_name][charge_amount][order_id][shipment_charges][total_products][seller_country][tax][buyer_name]")
        }
        if (data && data.singletemplate && data.singletemplate.Category === "fundriser") {
            setTemplatevariables("[buyer_name][seller_email][seller_name][charge_amount][seller_country]")
        }
        if (data && data.singletemplate && data.singletemplate.Category === "fundriseReciver") {
            setTemplatevariables("[seller_name][buyer_email][buyer_name][charge_amount][application_fee][recived_amount]")
        }
        if (data && data.singletemplate && data.singletemplate.Category === "succesfullySubscribed") {
            setTemplatevariables("[membership_name][membership_charges][storefront_limit][campaign_limit]")
        }
        if (data && data.singletemplate && data.singletemplate.Category === "resetSucessfully") {
            setTemplatevariables("[user_name]")
        }
    }, [data, data && data.singletemplate])

    // method for variables on bassis of templates selection
    const variablesHandler = (obj) => {
        setCategory(obj);
        switch (obj) {
            case "": {
                setTemplatevariables("")
                return;
            }
            case "signUp": {
                setTemplatevariables("[user_name][userId][uid]")
                return;
            }
            case "welcome": {
                setTemplatevariables("[user_name]")
                return;
            }
            case "CreateCampaign": {
                setTemplatevariables("[creator_name][creator_email][campaign_name][campaign_link]")
                return;
            }
            case "campaignSupported": {
                setTemplatevariables("[supporters][campaign_name][campaign_link][supporters_percentage][user_name]")
                return;
            }
            case "forgetPassword": {
                setTemplatevariables("[userId][uid][user_name]")
                return;
            }
            case "notPremium": {
                setTemplatevariables("[user_name][campaign_name][campaign_link]")
                return;
            }
            case "sellerRecive": {
                setTemplatevariables("[buyer_email][buyer_name][charge_amount][order_id][shipment_charges][total_products][buyer_country][tax][address][phone][state][postal_code][application_fee][recived_amount][seller_name]")
                return;
            }
            case "buyerRecive": {
                setTemplatevariables("[seller_email][seller_name][charge_amount][order_id][shipment_charges][total_products][seller_country][tax][buyer_name]")
                return;
            }
            case "fundriser": {
                setTemplatevariables("[buyer_name][seller_email][seller_name][charge_amount][seller_country]")
                return;
            }
            case "fundriseReciver": {
                setTemplatevariables("[seller_name][buyer_email][buyer_name][charge_amount][application_fee][recived_amount]")
                return;
            }
            case "succesfullySubscribed": {
                setTemplatevariables("[membership_name][membership_charges][storefront_limit][campaign_limit]")
                return;
            }
            case "resetSucessfully": {
                setTemplatevariables("[user_name]")
                return;
            }
        }
    }

    const onChangeEditor = (value) => {
        setJoditContent(value);
    }

    // method for editing template
    const updateUser = (event) => {
        event.preventDefault();
        setButtontext("Updating...")
        editData({
            variables: {
                Id: parseInt(id),
                Title: renderData.Title,
                Subject: renderData.Subject,
                Email: renderData.Email,
                FromText: renderData.FromText,
                Content: joditContent,
                Status: renderData.Status,
                Type: renderData.Type,
                Category: category
            }
        }).then(res => {
            setButtontext("Updated")
        }).catch(error => {
            setButtontext("Update")
        })
    }

    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Edit Templates</h6>
                        <button onClick={() => history.goBack("/tempelates?page=" + path)} className=" cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                    {/* Table of Administrator  */}
                    <form onSubmit={(event) => updateUser(event)}>
                        <div className="Table-of-administrator">
                            <div className="container-fluid background-of-table">
                                <div className="blanck-dev"></div>
                                {/* Table Section */}
                                <div className="container  Form-section-startup Form-sections-startups-responsive">
                                    <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                        <div className="Form-section1-main-div-of-inputs  ">
                                            {/* Title**/}
                                            <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                                <div className="form-group">
                                                    <div>
                                                        <label className="mrg-top-20 fnt-poppins">Title*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name"
                                                            value={renderData && renderData.Title}
                                                            onChange={event => {
                                                                let dupilcateName = { ...renderData }
                                                                dupilcateName.Title = event.target.value
                                                                setRenderData({ ...dupilcateName })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Email**/}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label>Email*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10" typr="email" placeholder="Enter Short Description"
                                                            value={renderData && renderData.Email}
                                                            onChange={event => {
                                                                let dupilcateName = { ...renderData }
                                                                dupilcateName.Email = event.target.value
                                                                setRenderData({ ...dupilcateName })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Form-section2-main-div-of-inputs mrg-top-10">
                                            {/*Subject* */}
                                            <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label >Subject*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10" type="slug" placeholder="Enter Slug"
                                                            value={renderData && renderData.Subject}
                                                            onChange={event => {
                                                                let dupilcateName = { ...renderData }
                                                                dupilcateName.Subject = event.target.value
                                                                setRenderData({ ...dupilcateName })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* From Name* */}
                                            <div className="is-flex Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label>From Name*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10" type="keyword"
                                                            value={renderData && renderData.FromText}
                                                            onChange={event => {
                                                                let dupilcateName = { ...renderData }
                                                                dupilcateName.FromText = event.target.value
                                                                setRenderData({ ...dupilcateName })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* radioButtons */}
                                    <div className="form-group has-margin-left-50">
                                        <div className="is-flex Form-Inputs-Fields mrg-top-10 fnt-poppins">
                                            <div className="form-group">
                                                <div>
                                                    <label>Select Category</label>
                                                </div>
                                                <div>
                                                    <select className="mrg-top-10 fnt-poppins" type="keyword"
                                                        value={category}
                                                        onChange={event => {
                                                            // let dupilcateName = { ...renderData }
                                                            // dupilcateName.Category = event.target.value
                                                            // setRenderData({ ...dupilcateName })
                                                            variablesHandler(event.target.value);
                                                        }}
                                                    >
                                                        <option value="">Select Category</option>
                                                        <option value="signUp">SignUp Confirmation</option>
                                                        <option value="welcome">Welcome</option >
                                                        <option value="CreateCampaign">Create Campaign</option>
                                                        <option value="forgetPassword">Forget Password</option>
                                                        <option value="notPremium">Premium Subscription 2 Days</option>
                                                        <option value="campaignSupported">Supported Campaign</option>
                                                        <option value="sellerRecive">Seller Reciver</option>
                                                        <option value="buyerRecive">Buyer Reciver</option>
                                                        <option value="fundriser">Fundriser</option>
                                                        <option value="fundriseReciver">Fundrise Reciver</option>
                                                        <option value="succesfullySubscribed">Succesfully Subscribed</option>
                                                        <option value="resetSucessfully">Reset Sucessfully</option>
                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="radios mrg-top-20 mrg-left-50">
                                        <div className="radio">
                                            <label>Select Type</label>
                                            <input className="mrg-top-40" type="radio" id="radio1" name="radio"
                                                checked={renderData && renderData.Type == "Website"}
                                                onChange={event => {
                                                    let dupilcateName = { ...renderData }
                                                    dupilcateName.Type = "Website"
                                                    setRenderData({ ...dupilcateName })
                                                }}
                                            />
                                            <label className="label-of-radio" for="radio1">
                                                <div className="checker"></div>
                                                Websiter
                                            </label>
                                        </div>
                                    </div>
                                    <div className="radios mrg-left-50">
                                        <div className="radio">
                                            <input type="radio" id="radio2" name="radio"
                                                checked={renderData && renderData.Type == "NewsLetter"}
                                                onChange={event => {
                                                    let dupilcateName = { ...renderData }
                                                    dupilcateName.Type = "NewsLetter"
                                                    setRenderData({ ...dupilcateName })
                                                }}
                                            />
                                            <label className="label-of-radio" for="radio2">
                                                <div className="checker"></div>
                                                <div>NewsLetter</div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* radioButtons second for Status*/}
                                    <div className="radios-of-group mrg-top-20 mrg-left-50">
                                        <div className="radio-of-group">
                                            <label>Select Status</label>
                                            <input className="mrg-top-40" type="radio" id="radio3" name="radio-of-groups"
                                                checked={renderData && renderData.Status == "Enable"}
                                                onChange={event => {
                                                    let dupilcateName = { ...renderData }
                                                    dupilcateName.Status = "Enable"
                                                    setRenderData({ ...dupilcateName })
                                                }}
                                            />
                                            <label className="label-of-radio" for="radio3">
                                                <div className="checker"></div>
                                                Enable
                                            </label>
                                        </div>
                                    </div>
                                    <div className="radios-of-group mrg-left-50">
                                        <div className="radio-of-group">
                                            <input type="radio" id="radio4" name="radio-of-groups"
                                                checked={renderData && renderData.Status == "Delete"}
                                                onChange={event => {
                                                    let dupilcateName = { ...renderData }
                                                    dupilcateName.Status = "Delete"
                                                    setRenderData({ ...dupilcateName })
                                                }}
                                            />
                                            <label className="label-of-radio" for="radio4">
                                                <div className="checker"></div>
                                                <div>Disable</div>
                                            </label>
                                        </div>
                                    </div>
                                    {/*Templates Variable* */}
                                    <div className=" mrg-top-20 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Templates Variable </label>
                                            </div>
                                            <div>
                                                <input disabled className="redonly-input mrg-top-10  fnt-poppins"
                                                    value={templateVariables}
                                                    type="keyword" readonly />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mail Content**/}
                                    <div className=" ck-editor-of-compaign mrg-left-50 mrg-top-20">
                                        <div className="form-group">
                                            <div>
                                                <label>Mail Content*</label>
                                            </div>
                                            <div className="ck-editor-of-compaign-border mrg-top-10">
                                                <JoditEditor className="form-control" placeholder="Enter Description" rows="5"
                                                    value={joditvalue ? joditvalue : ""}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onChange={onChangeEditor}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                        <span className="cancel-btn-of-form fnt-poppins"
                                            onClick={() => history.goBack("/tempelates?page=" + path)}
                                        >Cancel</span>
                                        <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">{buttonText}</button>
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
export default withRouter(EditTemplate);