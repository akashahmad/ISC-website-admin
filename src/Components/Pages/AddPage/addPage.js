import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import { CREATE_WEB_PAGE } from '../../apollo/Mutations/createWebPageMutation'
import publicIp from 'public-ip'
import ipInt from 'ip-to-int'
import JoditEditor from "jodit-react";
import { getParams } from '../../functions/index'

const AddPage = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [content, setContent] = useState("");
    const [metaKeywords, setMetaKeyWord] = useState("");
    const [pageTitle, setPageTitle] = useState("");
    const [pageHeading, setPageHeading] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [btnText, setBtnText] = useState("Create");
    const [ipAddress, setIpAddress] = useState();
    const [data] = useMutation(CREATE_WEB_PAGE);

    useEffect(() => {
        publicIp.v4().then(ip => {
            setIpAddress(ip);
        })
    }, [])

    // method for creating page
    const addPage = (event) => {
        event.preventDefault();
        setBtnText("Creating...");
        data({
            variables: {
                MetaKeywords: metaKeywords,
                pageTitle: pageTitle,
                pageHeading: pageHeading,
                MetaDescription: metaDescription,
                pageContent: content,
                createdIp: ipInt(ipAddress).toInt()
            }
        }).then(res => {
            setBtnText("Created");
            history.push("/edit-pages/" + res.data.createwebpages.id)
        }).catch(error => {
            setBtnText("Create");
        })
    }
    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add Page</h6>
                <button onClick={() => history.goBack("/pages?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form onSubmit={(event) => addPage(event)}>
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                        <div className="blanck-dev"></div>
                        {/* Table Section */}
                        <div className="Form-section-startup">
                            <div className="has-margin-bottom-20 extra-div">
                            </div>
                            {/* Meta Title**/}
                            <div className="mrg-left-60 fnt-poppins">
                                <div>
                                    <label>Meta Title*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" required value={pageTitle}
                                        onChange={event => setPageTitle(event.target.value)} />
                                </div>
                            </div>
                            {/* Meta Description**/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Meta Description*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <textarea className="textarea-of-admistrator" required value={metaDescription}
                                        onChange={event => setMetaDescription(event.target.value)} />
                                </div>
                            </div>
                            {/*Meta Keywords**/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Meta Keywords*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" required value={metaKeywords}
                                        onChange={event => setMetaKeyWord(event.target.value)} />
                                </div>
                            </div>
                            {/*Page Heading***/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Page Heading*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" required value={pageHeading}
                                        onChange={event => setPageHeading(event.target.value)} />
                                </div>
                            </div>
                            {/*Page Content**/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins ck-Editor">
                                <div>
                                    <label>Page Content*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <JoditEditor className="form-control" placeholder="Enter Description" rows="5"
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onChange={setContent}
                                    />
                                </div>
                            </div>
                            {/*buttons*/}
                            <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                <span className="cancel-btn-of-form fnt-poppins"
                                    onClick={() => history.goBack("/pages?page=" + path)}
                                >Cancel</span>
                                <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">{btnText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default withRouter(AddPage);