import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_COUPON } from '../../apollo/Mutations/createCoupan'
import { isupportcauseCampaign } from '../../../Config'
import { getParams } from '../../functions/index'

const AddCoupan = (props) => {
    let { history , location } = props;
    let path = getParams(location.search);
    const [createCoupan] = useMutation(CREATE_COUPON);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [btnText, setBtnText] = useState("Create")

    const onSubmit = (event) => {
        event.preventDefault();
        setBtnText("Creating...")
        createCoupan({
            variables: {
                Coupon_code: couponCode.replace(/ /g, ''),
                Status_coupon: "Enable",
                Discount_percentage: parseInt(discount)
            }
        }).then(res => {
            if (res.data.createCoupons.error) {
                window.alert(res.data.createCoupons.error)
                setBtnText("Create")
            }
            else {
                window.location.replace("/edit-coupans/" + res.data.createCoupons.Id)
            }
        }).catch(error => {
            setBtnText("Create")
        })
    }

    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add Coupon</h6>
                <button onClick={() => history.goBack("/coupans?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form onSubmit={(event) => onSubmit(event)}>
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                        <div className="blanck-dev"></div>
                        {/* Table Section */}
                        <div className="Form-section-startup ">
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
                                        value={couponCode}
                                        onChange={event => setCouponCode(event.target.value)}
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
                                        value={discount}
                                        onChange={event => setDiscount(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/*Page Url Link With Coupon*/}
                            <div className="mrg-left-60 mrg-top-20 fnt-poppins">
                                <div>
                                    <label>Page Url Link With Coupon*</label>
                                </div>
                                <div className="mrg-top-10">
                                    <input className="inputs-of-admistrator" value={isupportcauseCampaign + couponCode.replace(/ /g, '')} disabled />
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
    );
}
export default withRouter(AddCoupan)