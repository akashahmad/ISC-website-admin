import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_CATEGORY } from '../../apollo/Mutations/createCategory'
import { getParams } from '../../functions'

const AddCategory = (props) => {

    let { history, location } = props;
    let path = getParams(location.search);
    const [addCategory] = useMutation(CREATE_CATEGORY);
    const [name, setName] = useState("");
    const [description, setDiscription] = useState("");
    const [buttonText, setButtonText] = useState("Create");

    // method for creating category
    const createCategories = (event) => {
        event.preventDefault();
        setButtonText("Creating...")
        addCategory({
            variables: {
                Name: name,
                description: description,
                Status: "Enable"
            }
        }).then(res => {
            history.push("/edit-category/" + res.data.createcategory.Id);
        }).catch(error => {
            setButtonText("Create");
        })
    }

    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add Category</h6>
                <button onClick={() => history.goBack("/category?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form onSubmit={event => createCategories(event)}>
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                        <div className="blanck-dev"></div>
                        {/* Table Section */}
                        <div className="Form-section-startup">
                            <div className="has-margin-bottom-20 extra-div">
                            </div>
                            {/* Category Name***/}
                            <div className="mrg-left-60 fnt-poppins">
                                <div>
                                    <label>Category Name*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={name}
                                        required
                                        onChange={event => setName(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Description**/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Description*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <textarea className="textarea-of-admistrator" value={description}
                                        required
                                        onChange={event => setDiscription(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/* buttons */}
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <span className="cancel-btn-of-form fnt-poppins"
                                    onClick={() => history.goBack("/category?page=" + path)}
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
export default withRouter(AddCategory);