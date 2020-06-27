import React, { useState, useEffect, useRef } from 'react'
import JoditEditor from "jodit-react";
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_TEMPLATE } from '../../apollo/Mutations/createTemplate'
import publicIp from 'public-ip'
import ipInt from 'ip-to-int'
import { getParams } from '../../functions'

const AddTemplate = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [addTemplate] = useMutation(CREATE_TEMPLATE);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fromText, setFromText] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [ipAddress, setIpAddress] = useState();
    const [statusValidator, setStatusValidator] = useState(false);
    const [typeValidator, setTypeValidator] = useState(false);
    const [categoryValidator, setCategoryValidator] = useState(false);
    const [btnText, setBtnText] = useState("Create");
    const [templateVariables, setTemplatevariables] = useState([]);

    const [content, setContent] = useState("");

    useEffect(() => {
        publicIp.v4().then(ip => {
            setIpAddress(ip);
        })
    }, [])

    // method for creating a template
    let currentDate = new Date();
    currentDate = currentDate.toISOString();
    const onSubmit = (event) => {
        event.preventDefault();
        setBtnText("Creating...");
        if (!status) {
            setStatusValidator(true)
            setBtnText("Create");
        }
        if (!type) {
            setTypeValidator(true)
            setBtnText("Create");
        }
        if (!category) {
            setCategoryValidator(true)
            setBtnText("Create");
        }
        else {
            setBtnText("Creating...");
            addTemplate({
                variables: {
                    Title: title,
                    Subject: subject,
                    Email: email,
                    Password: password,
                    FromText: fromText,
                    Content: content,
                    Status: status,
                    Type: type,
                    CreatedIp: ipInt(ipAddress).toInt(),
                    CreatedDate: currentDate,
                    Category: category
                }
            }).then(res => {
                setBtnText("Created");
                history.push("/edit-tempelates/" + res.data.createTemplate.Id)
            }).catch(error => {
                setBtnText("Create");
            })

        }
    }

    // methods for variables to change on bassis of tempelate selection
    const variablesHandler = (obj) => {
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


    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add Templates</h6>
                <button onClick={() => history.goBack("/tempelates?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form onSubmit={event => onSubmit(event)}>
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
                                                <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name" value={title} required
                                                    onChange={event => setTitle(event.target.value)}
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
                                                <input className="mrg-top-10" placeholder="Enter Short Description" value={email}
                                                    onChange={event => setEmail(event.target.value)}
                                                    required
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
                                                <input className="mrg-top-10" type="slug" placeholder="Enter Slug" value={subject}
                                                    onChange={event => setSubject(event.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Password* */}
                                    <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label >Password*</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10" type="password" placeholder="Enter Keyword" value={password}
                                                    onChange={event => setPassword(event.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* From Name* */}
                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins is-flex">
                                <div className="form-group">
                                    <div>
                                        <label>From Name*</label>
                                    </div>
                                    <div>
                                        <input className="mrg-top-10" type="keyword" value={fromText}
                                            onChange={event => setFromText(event.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group has-margin-left-50">
                                    <div>
                                        <label>Select Category*</label>
                                    </div>
                                    <div>
                                        <select className="mrg-top-10 fnt-poppins" type="keyword"
                                            required
                                            onChange={event => {
                                                setCategoryValidator(false)
                                                variablesHandler(event.target.value)
                                                setCategory(event.target.value)
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
                                        <div className="color-red-text ">
                                            {categoryValidator ? "Select Category" : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* radioButtons */}
                            <div className="radios mrg-top-20 mrg-left-50">
                                <div className="radio">
                                    <label>Select Type*</label>
                                    <input className="mrg-top-40" type="radio" id="radio1" name="radio"
                                        value="Website"
                                        onChange={event => {
                                            setTypeValidator(false)
                                            setType(event.target.value)
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
                                        value="NewsLetter"
                                        onChange={event => {
                                            setTypeValidator(false)
                                            setType(event.target.value)
                                        }}
                                    />
                                    <label className="label-of-radio" for="radio2">
                                        <div className="checker"></div>
                                        <div>NewsLetter</div>
                                    </label>
                                </div>
                            </div>
                            <div className="color-red-text has-margin-left-60 has-margin-top-20">
                                {typeValidator ? "Select Type" : ""}
                            </div>
                            {/* radioButtons second for Status*/}
                            <div className="radios-of-group mrg-top-20 mrg-left-50">
                                <div className="radio-of-group">
                                    <label>Select Status</label>
                                    <input className="mrg-top-40" type="radio" id="radio3" name="radio-of-groups"
                                        value="Enable"
                                        onChange={event => {
                                            setStatusValidator(false)
                                            setStatus(event.target.value)
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
                                        value="Delete"
                                        onChange={event => {
                                            setStatusValidator(false)
                                            setStatus(event.target.value)
                                        }}
                                    />
                                    <label className="label-of-radio" for="radio4">
                                        <div className="checker"></div>
                                        <div>Disable</div>
                                    </label>
                                </div>
                            </div>
                            <div className="color-red-text has-margin-left-60 has-margin-top-20">
                                {statusValidator ? "Select Status" : ""}
                            </div>
                            {/*Templates Variable* */}
                            <div className=" mrg-top-20 mrg-left-50 fnt-poppins">
                                <div className="form-group">
                                    <div>
                                        <label >Templates Variable </label>
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
                                        <label>Mail Content</label>
                                    </div>
                                    <div className="ck-editor-of-compaign-border mrg-top-10">
                                        <JoditEditor className="form-control" placeholder="Enter Description" rows="5"                                            
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            onChange={setContent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <span className="cancel-btn-of-form fnt-poppins"
                                    onClick={() => history.goBack("/tempelates?page=" + path)}
                                >Cancel</span>
                                <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit" >{btnText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default withRouter(AddTemplate);