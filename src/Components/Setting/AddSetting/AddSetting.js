import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_SETTING } from '../../apollo/Mutations/createSetting'
import publicIp from 'public-ip'
import ipInt from 'ip-to-int'
import { getParams } from '../../functions'

const AddSetting = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [addSetting] = useMutation(CREATE_SETTING);
    const [fieldName, setFieldName] = useState("");
    const [keyText, setKeyText] = useState("");
    const [value, setvalue] = useState("");
    const [settingType, setSettingType] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [settingTypeValidator, setSettingTypeValidator] = useState(false);
    const [buttonText, setButtonText] = useState("Create");

    useEffect(() => {
        publicIp.v4().then(ip => {
            setIpAddress(ip);
        })
    }, [])

    // method for createSetting
    const createSetting = (event) => {
        event.preventDefault();
        setButtonText("Creating...");
        let crntDate = new Date();
        crntDate = crntDate.toISOString();
        if (!settingType) {
            setSettingTypeValidator(true)
        }
        else {
            addSetting({
                variables: {
                    fieldName: fieldName,
                    Keytext: keyText,
                    CreatedIp: ipInt(ipAddress).toInt(),
                    value: value,
                    setting_type: settingType,
                    createdDate: crntDate
                }
            }).then(res => {
                history.push("/edit-setting/" + res.data.createsettings.ID)
            })
                .catch(error => {
                    setButtonText("Create")
                })
        }
    }
    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add General Setting</h6>
                <button onClick={() => history.goBack("/setting?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form onSubmit={event => createSetting(event)}>
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                        <div className="blanck-dev"></div>
                        {/* Table Section */}
                        <div className="Form-section-startup">
                            <div className="has-margin-bottom-20 extra-div">
                            </div>
                            {/*Name**/}
                            <div className="mrg-left-60 fnt-poppins">
                                <div>
                                    <label>Name*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator"
                                        required
                                        value={fieldName}
                                        onChange={event => setFieldName(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/*Key*/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Key*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator"
                                        required
                                        value={keyText}
                                        onChange={event => setKeyText(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/*Value*/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Value*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator"
                                        required
                                        value={value}
                                        onChange={event => setvalue(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/*Setting type*/}
                            <div className="mrg-left-60 fnt-poppins mrg-top-20">
                                <div>
                                    <label>Setting type*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <select onChange={event => {
                                        setSettingTypeValidator(false)
                                        setSettingType(event.target.value)
                                    }}
                                        className="inputs-of-admistrator fnt-poppins">
                                        <option>Select Type</option>
                                        <option value="General">General</option>
                                        <option value="Payment">Payment</option>
                                        <option value="Social">Social</option>
                                        <option value="Email">Email</option>
                                        <option value="Apps">Apps</option>
                                        <option value="campaignCategories">Campaign Categories</option>
                                    </select>
                                </div>
                            </div>
                            <div className="color-red-text has-margin-left-60 has-margin-top-20">
                                {settingTypeValidator ? "Select Setting Type" : ""}
                            </div>
                            {/* buttons */}
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <span className="cancel-btn-of-form fnt-poppins"
                                    onClick={() => history.goBack("/setting?page=" + path)}
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
export default withRouter(AddSetting);