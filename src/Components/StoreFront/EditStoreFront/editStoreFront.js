import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { SINGLE_STOREFRONT } from '../../apollo/Quries/singleStoreFront'
import { UPDATE_STOREFRONT } from '../../apollo/Mutations/updateStorefront'
import cookie from 'react-cookies'
import { getData, getCode, getName } from "country-list";
import { UsaStates } from "usa-states";
import ContentLoader from 'react-content-loader'
import { getParams } from '../../functions'

const UpdateStoreFront = (props) => {
    let { history, match, location } = props;
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : "";
    let names = new UsaStates();
    const { loading, data } = useQuery(SINGLE_STOREFRONT(id))
    const [updateStoreFront] = useMutation(UPDATE_STOREFRONT);
    const [renderData, setRenderData] = useState("");
    const [buttonText, setButtonText] = useState("Update")
    const [state, setState] = useState("")

    useEffect(() => {
        setRenderData(data && data.singleStorefrontBySlug ? { ...data.singleStorefrontBySlug } : "")
    }, [data])

    // method for editing storefront data
    let token = cookie.load("token");
    const onSubmit = (event) => {
        event.preventDefault();
        setButtonText("Updating...")
        updateStoreFront({
            variables: {
                Id: parseInt(id),
                Name: renderData && renderData.Name,
                OriginCountry: renderData && renderData.OriginCountry,
                OriginState: renderData && renderData.OriginCountry === "CA" || renderData.OriginCountry === "US" ? renderData.OriginState : "",
                OriginPostalCode: parseInt(renderData && renderData.OriginPostalCode),
                token: token,
            }
        }).then(res => {
            setButtonText("Updated")
        }).catch(error => {
            setButtonText("Update")
        })
    }

    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Edit StoreFront</h6>
                        <button onClick={() => history.goBack("/storefront?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                    {/* Table of Administrator  */}
                    <form
                        onSubmit={(event) => onSubmit(event)}
                    >
                        <div className="Table-of-administrator">
                            <div className="container-fluid background-of-table">
                                <div className="blanck-dev"></div>
                                {/* Table Section */}
                                <div className="container  Form-section-startup Form-sections-startups-responsive">
                                    <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                        <div className="Form-section1-main-div-of-inputs  ">
                                            {/*Name***/}
                                            <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                                <div className="form-group">
                                                    <div>
                                                        <label className="mrg-top-20 fnt-poppins">Name*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name"
                                                            required
                                                            value={renderData && renderData.Name}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.Name = event.target.value
                                                                setRenderData({ ...duplicateData })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Origin Postal Code**/}
                                            <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label>Origin Postal Code*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="number"
                                                            value={renderData && renderData.OriginPostalCode}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.OriginPostalCode = event.target.value
                                                                setRenderData({ ...duplicateData })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Form-section2-main-div-of-inputs has-margin-top-10 ">
                                        {/*Select Country**/}
                                        <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins is-flex">
                                            <div className="form-group">
                                                <div>
                                                    <label>Select County</label>
                                                </div>
                                                <div>
                                                    <select required className="fnt-poppins"
                                                        value={renderData && renderData.OriginCountry}
                                                        onChange={event => {
                                                            let duplicateData = { ...renderData }
                                                            duplicateData.OriginCountry = event.target.value
                                                            setRenderData({ ...duplicateData })
                                                        }}
                                                    >
                                                        <option value="">select Country</option>
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
                                        </div>
                                    </div>
                                    {renderData && renderData.OriginCountry === "CA" || renderData.OriginCountry === "US" ?
                                        <div className="Form-section2-main-div-of-inputs has-margin-top-10 ">
                                            {/*Select State**/}
                                            <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins is-flex">
                                                <div className="form-group">
                                                    <div>
                                                        <label>States</label>
                                                    </div>
                                                    <div>
                                                        <select required
                                                            className="fnt-poppins"
                                                            value={renderData && renderData.OriginState}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.OriginState = event.target.value
                                                                setRenderData({ ...duplicateData })
                                                                // setState(event.target.value);
                                                            }}
                                                        >
                                                            <option value="">Select State</option>
                                                            {names.states.map((single, index) => {
                                                                return (
                                                                    <option key={index}>{single.abbreviation}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : ""}
                                    <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                        <span className="cancel-btn-of-form fnt-poppins"
                                            onClick={() => history.goBack("/storefront?page=" + path)}
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
export default withRouter(UpdateStoreFront);