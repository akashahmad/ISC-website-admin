import React, { useState } from 'react'
import InputColor from 'react-input-color';
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_ADSON } from '../../apollo/Mutations/createAdson'
import axios, { CancelToken } from "axios";
import { apiPath } from '../../../config'
import { getParams } from '../../functions'

const AddAdson = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [initial] = useState('#5e72e4');
    const [showHide, setShowHide] = useState(false);
    const [color, setColor] = useState("");
    const [addAdson] = useMutation(CREATE_ADSON);
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [placeOn, setPlaceOn] = useState("");
    const [adLink, setAdLink] = useState("");
    const [adText, setAdText] = useState("");
    const [adButton, setAdButton] = useState("");
    const [adImage, setAdImage] = useState("");
    const [bgColor, setBgColor] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    let cancel;

    // method to search campaign
    const onChageKeyword = (value) => {
        cancel && cancel();
        axios.post(
            apiPath + "/campainNameSearch",
            {
                Name: value
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancel = c;
                })
            }
        )
            .then(res => {
                console.log(res.data);
            })
    }

    let currentDate = new Date();
    currentDate = currentDate.toISOString();
    // method for creating adson
    const onSubmit = (event) => {
        event.preventDefault();
        addAdson({
            variables: {
                user_id: 1,
                status: status,
                place_on: parseInt(placeOn),
                type: type,
                bgcolor: color.hex.toString(),
                ad_text: adText,
                ad_button: adButton,
                ad_image: adImage,
                startdate: startDate,
                enddate: endDate,
                date_created: currentDate
            }
        }).then(res => {
            history.push("/adson")
        })
    }

    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add Adson</h6>
                <button onClick={() => history.goBack("/adson?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
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
                                    {/* Status**/}
                                    <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                        <div className="form-group">
                                            <div>
                                                <label className="mrg-top-20 fnt-poppins">Status*</label>
                                            </div>
                                            <div>
                                                <select className="mrg-top-10 fnt-poppins"
                                                    onChange={event => setStatus(event.target.value)}
                                                >
                                                    <option>Select Status</option>
                                                    <option value="Enable">Enable</option>
                                                    <option value="Disable">Disable</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Form-section2-main-div-of-inputs mrg-top-10">
                                    {/*Place On**/}
                                    <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Place On*</label>
                                            </div>
                                            <div>
                                                <select className="mrg-top-10 fnt-poppins"
                                                    onChange={event => setPlaceOn(event.target.value)}
                                                >
                                                    <option>Select place_on</option>
                                                    <option value="1">Top Bar, Horizontal </option>
                                                    <option value="2">Side Bar, Vertical </option>
                                                    <option value="3">Bottom Bar Horizontal </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* radioButtons */}
                            <div className="radios mrg-top-20 mrg-left-50">
                                <div className="radio">
                                    <label>Select Type</label>
                                    <input className="mrg-top-40" type="radio" id="radio1" name="radio"
                                        checked
                                        value="Global"
                                        onChange={event => setType(event.target.value)}
                                        onClick={() => setShowHide(false)}
                                    />
                                    <label className="label-of-radio" for="radio1">
                                        <div className="checker"></div>
                                        Global
                                </label>
                                </div>
                            </div>
                            <div className="radios mrg-left-50">
                                <div className="radio">
                                    <input type="radio" id="radio2" name="radio"
                                        value="SpecificCampaign"
                                        onChange={event => setType(event.target.value)}
                                        onClick={() => setShowHide(true)}
                                    />
                                    <label className="label-of-radio" for="radio2">
                                        <div className="checker"></div>
                                        <div>Specific Campaign</div>
                                    </label>
                                </div>
                            </div>
                            {/* hashtag back color */}
                            <div className="mrg-left-50 mrg-top-30">
                                <label className="fnt-poppins ">Hash Tag Back Color</label>
                                <div className="react-input-color mrg-top-20"
                                    style={{
                                        width: 80,
                                        height: 50,
                                        marginBottom: 20,
                                        backgroundColor: color.hex
                                    }}>
                                    {color.hex}
                                </div>
                                <InputColor initialHexColor={initial}
                                    onChange={setColor}
                                />
                            </div>
                            {showHide ?
                                <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                    <div className="Form-section1-main-div-of-inputs  ">
                                        {/* Compaign**/}
                                        <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                            <div className="form-group">
                                                <div>
                                                    <label className="mrg-top-20 fnt-poppins">Compaign**</label>
                                                </div>
                                                <div>
                                                    <input className="mrg-top-10 fnt-poppins"
                                                        onChange={event => onChageKeyword(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Form-section2-main-div-of-inputs mrg-top-10">
                                        {/*Compaign Url*/}
                                        <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                            <div className="form-group">
                                                <div>
                                                    <label>Compaign Url*</label>
                                                </div>
                                                <div>
                                                    <input className="mrg-top-10"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : ""}
                            {/* Ad link */}
                            <div className="mrg-top-30 mrg-left-50">
                                <label>Ad Link*</label>
                            </div>
                            <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                <div className="Form-section1-main-div-of-inputs  ">
                                    {/* Ad Text***/}
                                    <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                        <div className="form-group">
                                            <div>
                                                <label className="mrg-top-20 fnt-poppins">Ad Text</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" value={adText}
                                                    onChange={event => setAdText(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Form-section2-main-div-of-inputs mrg-top-10">
                                    {/*Ad Button Text*/}
                                    <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Ad Button Text</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10" valur={adButton}
                                                    onChange={event => setAdButton(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                <div className="Form-section1-main-div-of-inputs  ">
                                    {/* Ad Image Url*/}
                                    <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                        <div className="form-group">
                                            <div>
                                                <label className="mrg-top-20 fnt-poppins">Ad Image Url</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" value={adImage}
                                                    onChange={event => setAdImage(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Form-section2-main-div-of-inputs mrg-top-10">
                                    {/*Start Date*/}
                                    <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                        <div className="form-group">
                                            <div>
                                                <label>Start Date*</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" type="date" value={startDate}
                                                    onChange={event => setStartDate(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Date*/}
                            <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                <div className="form-group">
                                    <div>
                                        <label>End Date</label>
                                    </div>
                                    <div>
                                        <input className="mrg-top-10 fnt-poppins" type="date" value={endDate}
                                            onChange={event => setEndDate(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <span className="cancel-btn-of-form fnt-poppins"
                                    onClick={() => history.goBack("/adson?page=" + path)}
                                >Cancel</span>
                                <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default withRouter(AddAdson);