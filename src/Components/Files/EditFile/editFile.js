import React, { useState } from 'react'
import CKEditor from "react-ckeditor-component";
import {withRouter} from 'react-router-dom'

const EditFile= (props) => {
    let{history}=props;
    const [content, setContent] = useState("");
    console.log("content", content);

    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Edit File</h6>
                <button onClick={()=>history.push("/file")} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form>
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                        <div className="blanck-dev"></div>
                        {/* Table Section */}
                        <div className="Form-section-startup Form-sections-startups-responsive">
                            <div className="has-margin-bottom-20 extra-div">
                            </div>
                            {/*Page Content**/}
                            <div className="ck-editor-of-compaign mrg-left-20 mrg-top-20 fnt-poppins ck-Editor-of-editfile">
                                <div>
                                    <label>Edit File Content*</label>
                                </div>
                                <div className="ck-editor-of-compaign-border mrg-top-10">
                                    <CKEditor
                                        content={content ? content : ""}
                                        events={{
                                            "change": (event) => setContent(event.editor.getData())
                                        }}
                                        className="form-control" placeholder="Enter Description" rows="5" />
                                </div>
                            </div>
                            <div className="btns-of-add mrg-left-20 mrg-top-30 fnt-poppins">
                                <button className="cancel-btn-of-form fnt-poppins">Cancel</button>
                                <button className="Save-btn-of-form mrg-left-20 fnt-poppins">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default withRouter(EditFile);