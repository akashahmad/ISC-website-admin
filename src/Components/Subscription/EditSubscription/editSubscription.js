import React, { useState, useEffect } from 'react'
import '../../../assets/Style/Common.scss'
import { withRouter } from 'react-router-dom'
import { SINGLE_MEMBERSHIP } from '../../apollo/Quries/singleMemberShip'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { UPDATE_MEMBERSHIP } from '../../apollo/Mutations/updateMemberShip'
import ContentLoader from 'react-content-loader'
import { getParams } from '../../functions/index'

const EditSubscription = (props) => {

    let { history, match, location } = props;
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : ""
    const { loading, data } = useQuery(SINGLE_MEMBERSHIP(id))
    const [editData] = useMutation(UPDATE_MEMBERSHIP);
    const [renderData, setRenderData] = useState("");
    const [buttonText, setButtonText] = useState("Update")

    useEffect(() => {
        setRenderData(data && data.getsinglemembership ? { ...data.getsinglemembership } : "")
    }, [data, data && data.getsinglemembership])

    // method for editing subscription
    const updateUser = (event) => {
        event.preventDefault();
        setButtonText("Updating...")
        editData({
            variables: {
                id: parseInt(renderData.id),
                Name: renderData.Name,
                StorefrontLimit: parseInt(renderData.StorefrontLimit),
                CampaignLimit: parseInt(renderData.CampaignLimit),
                ChargePercentage: parseFloat(renderData.ChargePercentage),
                SubscriptionCharges: parseFloat(renderData.SubscriptionCharges)
            }
        }).then(res => {
            setButtonText("Updated");
        }).catch(error => {
            setButtonText("update");
        })
    }

    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Edit Subscription</h6>
                        <button onClick={() => history.goBack("/subscription?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
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
                                    {/*Subscription Name**/}
                                    <div className="mrg-left-60 fnt-poppins">
                                        <div>
                                            <label>Subscription Name*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator"
                                                value={renderData.Name}
                                                onChange={event => {
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.Name = event.target.value
                                                    setRenderData(duplicateData)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/*Subscription Amount**/}
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label> Storefront Limit*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator"
                                                value={renderData.StorefrontLimit}
                                                onChange={event => {
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.StorefrontLimit = event.target.value
                                                    setRenderData(duplicateData)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/*Discount Percentage*/}
                                    <div className="mrg-left-60 fnt-poppins mrg-top-20">
                                        <div>
                                            <label>Campaign Limit</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator"
                                                value={renderData.CampaignLimit}
                                                onChange={event => {
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.CampaignLimit = event.target.value
                                                    setRenderData(duplicateData)
                                                }}
                                            />

                                        </div>
                                    </div>
                                    {/* Discount Name*/}
                                    <div className="mrg-left-60 fnt-poppins mrg-top-20">
                                        <div>
                                            <label>Charge Percentage</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator"
                                                value={renderData.ChargePercentage}
                                                onChange={event => {
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.ChargePercentage = event.target.value
                                                    setRenderData(duplicateData)
                                                }}
                                            />

                                        </div>
                                    </div>
                                    {/* Discount Start Date*/}
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label> Subscription Charges</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator fnt-poppins"
                                                value={renderData.SubscriptionCharges}
                                                onChange={event => {
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.SubscriptionCharges = event.target.value
                                                    setRenderData(duplicateData)
                                                }} />
                                        </div>
                                    </div>
                                    <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                        <span className="cancel-btn-of-form fnt-poppins"
                                            onClick={() => history.goBack("/subscription?page=" + path)} s
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
export default withRouter(EditSubscription);
