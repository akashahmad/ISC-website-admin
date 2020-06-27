import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_STOREFRONT } from '../../apollo/Mutations/createStorefront'
import publicIp from 'public-ip'
import ipInt from 'ip-to-int'
import cookie from 'react-cookies'
import { getData, getCode, getName } from "country-list";
import { UsaStates } from "usa-states";
import { getParams } from '../../functions'

const AddStoreFront = (props) => {
    let { history , location } = props;
    let path = getParams(location.search);
    const [addStorefront] = useMutation(CREATE_STOREFRONT)
    const [name, setName] = useState("");
    const [originPostalCode, setOriginPostalCode] = useState("");
    const [ipAddress, setIpAddress] = useState("")
    const [country, setSelectCountry] = useState("")
    const [state, setState] = useState("")
    const [buttonText, setButtonText] = useState("Create")

    let names = new UsaStates();

    useEffect(() => {
        publicIp.v4().then(ip => {
            setIpAddress(ip);
        })
    }, [])

    // method for creating storefront
    const onSubmit = (event) => {
        event.preventDefault();
        setButtonText("Creating...")
        let token = cookie.load("token")
        addStorefront({
            variables: {
                Name: name,
                OriginPostalCode: parseInt(originPostalCode),
                Status: "Enable",
                Createduser: "Admin",
                CreatedIp: ipInt(ipAddress).toInt(),
                OriginCountry: country,
                OriginState: country && country === "CA" || country === "US" ? state : "",
                token: token
            }
        }).then(res => {
            history.push("/edit-storefront/" + res.data.createStorefront.Id)
        }).catch(error => {
            setButtonText("Create")
        })
    }

    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add StoreFront</h6>
                <button onClick={() => history.goBack("/storefront?page="+path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
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
                                                    value={name}
                                                    onChange={event => setName(event.target.value)}
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
                                                    required
                                                    value={originPostalCode}
                                                    onChange={event => setOriginPostalCode(event.target.value)}
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
                                            <label>Select County*</label>
                                        </div>
                                        <div>
                                            <select required className="fnt-poppins"
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
                                </div>
                            </div>
                            {country && country === "CA" || country === "US" ?
                                <div className="Form-section2-main-div-of-inputs has-margin-top-10 ">
                                    {/*Select State**/}
                                    <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins is-flex">
                                        <div className="form-group">
                                            <div>
                                                <label>States*</label>
                                            </div>
                                            <div>
                                                <select required
                                                    className="fnt-poppins"
                                                    value={state}
                                                    onChange={event => {
                                                        setState(event.target.value)
                                                    }}
                                                >
                                                    <option value="">Select States</option>
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
    );
}
export default withRouter(AddStoreFront);