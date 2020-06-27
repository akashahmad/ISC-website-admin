import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER_INTEREST } from '../../apollo/Mutations/createUserInterestType'
import { getParams } from '../../functions'

const AddAdson = (props) => {
    let { history ,location } = props;
    let path = getParams(location.search);
    const [addUserInterest] = useMutation(CREATE_USER_INTEREST);
    const [name, setName] = useState("")
    const [buttonText, setButtonText] = useState("Create")

    // method for userIntest
    const onSubmit = (event) => {
        event.preventDefault();
        setButtonText("Creating...")
        addUserInterest({
            variables: {
                name: name
            }
        }).then(res => {
            setButtonText("Created")
            history.push("/edit-user-interest/" + res.data.createInterests.id)
        }).catch(error => {
            setButtonText("Create")
        })
    }

    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add User Interest</h6>
                <button onClick={() => history.goBack("/view-user-interest?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form
                onSubmit={event => onSubmit(event)}
            >
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
                                                <label className="mrg-top-20 fnt-poppins">Name</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins"
                                                    required
                                                    value={name}
                                                    onChange={event => setName(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <span className="cancel-btn-of-form fnt-poppins"
                                    onClick={() => history.goBack("/view-user-interest?page=" + path)}
                                >Cancel</span>
                                <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">{buttonText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}
export default withRouter(AddAdson);