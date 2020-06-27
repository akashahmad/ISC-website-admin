import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { SINGLE_SETTING } from '../../apollo/Quries/singleSetting'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { UPDATE_SETTING } from '../../apollo/Mutations/updateSetting'
import ContentLoader from 'react-content-loader'
import { getParams } from '../../functions'

const EditSetting = (props) => {
    let { history, match, location } = props;
    let ID = match.params && match.params.id ? match.params.id : "";
    let path = getParams(location.search);
    const { loading, data } = useQuery(SINGLE_SETTING(ID));
    const [editData] = useMutation(UPDATE_SETTING);
    const [renderData, setRenderData] = useState("");
    const [buttonText, setButtonText] = useState("Update")

    // method for editing 
    const updateUser = (event) => {
        event.preventDefault();
        setButtonText("Updating...")
        editData({
            variables: {
                ID: parseInt(ID),
                fieldName: renderData.fieldName,
                Keytext: renderData.Keytext,
                value: renderData.value,
                setting_type: renderData.setting_type
            }
        }).then(res => {
            setButtonText("Updated")
        }).catch(error => {
            setButtonText("Update")
        })
    }

    useEffect(() => {
        setRenderData(data && data.singlesettings);
    }, [data])

    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Update General Setting</h6>
                        <button onClick={() => history.goBack("/setting?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                    {/* Table of Administrator  */}
                    <form onSubmit={event => updateUser(event)}>
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
                                                value={renderData && renderData.fieldName}
                                                onChange={event => {
                                                    let dupilcateName = { ...renderData }
                                                    dupilcateName.fieldName = event.target.value
                                                    setRenderData({ ...dupilcateName })
                                                }}
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
                                                value={renderData && renderData.Keytext}
                                                onChange={event => {
                                                    let dupilcateName = { ...renderData }
                                                    dupilcateName.Keytext = event.target.value
                                                    setRenderData({ ...dupilcateName })
                                                }}
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
                                                value={renderData && renderData.value}
                                                onChange={event => {
                                                    let dupilcateName = { ...renderData }
                                                    dupilcateName.value = event.target.value
                                                    setRenderData({ ...dupilcateName })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/*Setting type*/}
                                    <div className="mrg-left-60 fnt-poppins mrg-top-20">
                                        <div>
                                            <label>Setting type*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <select className="inputs-of-admistrator fnt-poppins"
                                                value={renderData && renderData.setting_type}
                                                onChange={event => {
                                                    let dupilcateName = { ...renderData }
                                                    dupilcateName.setting_type = event.target.value
                                                    setRenderData({ ...dupilcateName })
                                                }}
                                            >
                                                <option>Select Setting</option>
                                                <option value="General">General</option>
                                                <option value="Payment">Payment</option>
                                                <option value="Social">Social</option>
                                                <option value="Email">Email</option>
                                                <option value="Apps">Apps</option>
                                                <option value="campaignCategories">Campaign Categories</option>
                                            </select>
                                        </div>
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
export default withRouter(EditSetting);