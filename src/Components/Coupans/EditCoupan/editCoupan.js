import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { SINGLE_COUPON } from '../../apollo/Quries/singleCoupan'
import { isupportcauseCampaign } from '../../../Config'
import { EDIT_COUPON } from '../../apollo/Mutations/updateCoupon'
import { getParams } from '../../functions'
import ContentLoader from 'react-content-loader'

const EditCoupan = (props) => {
    let { history, match, location } = props;
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : "";
    const { loading, data } = useQuery(SINGLE_COUPON(id))
    const [renderData, setRenderData] = useState("")
    const [updateCoupan] = useMutation(EDIT_COUPON)
    const [btnText, setBtnText] = useState("Update");
    const [code, setCode] = useState("");

    useEffect(() => {
        setRenderData(data && data.singleCouponById ? { ...data.singleCouponById } : {})
        setCode(data && data.singleCouponById && data.singleCouponById.Coupon_code ? data.singleCouponById.Coupon_code : "");
    }, [data])

    const coupanCodeData = (value) => {
        setCode(value);
        let duplicateData = { ...renderData }
        duplicateData.Coupon_code = value
        setRenderData({ ...duplicateData });
    }

    const update = (event) => {
        event.preventDefault();
        setBtnText("Updating...")
        updateCoupan({
            variables: {
                Id: parseInt(id),
                Coupon_code: code.replace(/ /g, ''),
                Status_coupon: renderData.Status_coupon,
                Discount_percentage: parseInt(renderData.Discount_percentage)
            }
        }).then(res => {
            setBtnText("Updated")
        }).catch(error => {
            setBtnText("Update")
        })
    }

    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Update Coupon</h6>
                        <button onClick={() => history.goBack("/coupans?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                    {/* Table of Administrator  */}
                    <form onSubmit={event => update(event)}>
                        <div className="Table-of-administrator">
                            <div className="background-of-table">
                                <div className="blanck-dev"></div>
                                {/* Table Section */}
                                <div className="Form-section-startup">
                                    <div className="has-margin-bottom-20 extra-div">
                                    </div>
                                    {/* Coupon Code**/}
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Coupon Code*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator"
                                                required
                                                value={code ? code : ""}
                                                onChange={event => {
                                                    coupanCodeData(event.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/*Discount Percentage**/}
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Discount Percentage*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator" type="number"
                                                required
                                                value={renderData.Discount_percentage}
                                                onChange={event => {
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.Discount_percentage = event.target.value
                                                    setRenderData({ ...duplicateData });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* Select Coupon Status**/}
                                    <div className="mrg-left-60 fnt-poppins mrg-top-20">
                                        <div>
                                            <label>Select Coupon Status*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <select className="inputs-of-admistrator fnt-poppins"
                                                required
                                                value={renderData.Status_coupon}
                                                onChange={event => {
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.Status_coupon = event.target.value
                                                    setRenderData({ ...duplicateData });
                                                }}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Enable">Enable</option>
                                                <option value="Disable">Disable</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/*Page Url Link With Coupon*/}
                                    <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                        <div>
                                            <label>Page Url Link With Coupon*</label>
                                        </div>
                                        <div className="mrg-top-10">
                                            <input className="inputs-of-admistrator" value={isupportcauseCampaign + code.replace(/ /g, '')} disabled />
                                        </div>
                                        {/* <button className="Save-btn-of-form Save-btns-of-forms-responsive mrg-top-10 fnt-poppins">Link Copy</button> */}
                                    </div>
                                    <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                        <span className="cancel-btn-of-form fnt-poppins"
                                            onClick={() => history.goBack("/coupans?page=" + path)}
                                        >Cancel</span>
                                        <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">{btnText}</button>
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
export default withRouter(EditCoupan)