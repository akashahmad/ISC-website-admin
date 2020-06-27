import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { EDIT_CATEGORY } from '../../apollo/Mutations/updateCategory'
import { SINGLE_CATEGORY } from '../../apollo/Quries/singleCategoryQurie'
import ContentLoader from 'react-content-loader'
import { getParams } from '../../functions'


const EidtCategory = (props) => {
    let { history, match, location } = props;
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : "";
    const { loading, data } = useQuery(SINGLE_CATEGORY(id))
    const [editCategory] = useMutation(EDIT_CATEGORY);
    const [renderData, setRenderData] = useState();
    const [buttonText, setButtonText] = useState("Update");

    // method for editing category
    const editData = (event) => {
        event.preventDefault();
        setButtonText("Updating...")
        editCategory({
            variables: {
                Id: parseInt(id),
                Name: renderData.Name,
                description: renderData.description
            }
        }).then(res => {
            setButtonText("Updated")
        })
    }

    // get all data and store in a state
    useEffect(() => {
        setRenderData(data && data.SingleCategory);
    }, [data])

    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Edit Category</h6>
                        <button onClick={() => history.goBack("/category?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                    {/* Table of Administrator  */}
                    <form onSubmit={event => editData(event)}>
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
                                            <input className="inputs-of-admistrator fnt-poppins"
                                                value={renderData && renderData.Name}
                                                onChange={event => {
                                                    let duplicateRenderData = { ...renderData }
                                                    duplicateRenderData.Name = event.target.value;
                                                    setRenderData({ ...duplicateRenderData })
                                                }
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/* Description**/}
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Description*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <textarea className="textarea-of-admistrator fnt-poppins"
                                                value={renderData && renderData.description}
                                                onChange={event => {
                                                    let duplicateDiscription = { ...renderData }
                                                    duplicateDiscription.description = event.target.value;
                                                    setRenderData({ ...duplicateDiscription })
                                                }}
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
export default withRouter(EidtCategory);