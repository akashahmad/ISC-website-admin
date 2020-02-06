import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Logo from '../../assets/Images/ISC_logo.png'
import Style from './style'
import Logout from '../../assets/Images/logout.png'
import cookie from 'react-cookies'

const Sidenav = (props) => {
    let { location: routerLocation , history } = props;
    let location = routerLocation.pathname;
    const [show, setShow] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    // function for user
    const hideShow = () => {
        if (show === false) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }
    // function for Setting of hide and show 
    const hideShowSetting = () => {
        if (showSetting === false) {
            setShowSetting(true);
        }
        else {
            setShowSetting(false);
        }
    }
    const currentActive = (value) => {
        if (location === "/" && value === "/") {
            return "active"
        }
        else {
            return location.indexOf(value) === 1 ? "active" : ""
        }
    }
    // logout function
    const logout = () => {
        let age = localStorage.getItem("age");
        cookie.remove('token', {
            maxAge: parseInt(age),
            path: "/"
        });
        localStorage.removeItem("age");
        history.push("/");
    };
    return (
        <>
            <div className="container-fluid dashboard-main-dev">
                <div className="column">
                    {/* logo  */}
                    <div className="logo-dashboard">
                        <img src={Logo} alt="Logo" />
                    </div>
                    {/* Sidenav Links*/}
                    <div className="sidenav-Links">
                        {/* dashboard  */}
                        <Link to={"/"}>
                            <div className={"dashboard-name-logo" + currentActive("/")}>
                                <img className="dashboard_icon"
                                    src={currentActive("/") === "active" ? require('../../assets/Images/dashboardactive.png') : require('../../assets/Images/dashboard.png')}
                                    alt="dashboard" />
                                <span className="dashboard-link fnt-poppins">DashBoard</span>
                            </div>
                        </Link>
                        {/* Administrator */}
                        <Link to={"/administrator"}>
                            <div className={"sidenav-name-logo" + currentActive("administrator")}>
                                <img className="icon-width-admin"
                                    src={currentActive("administrator") === "active" ? require('../../assets/Images/adminactive.png') : require('../../assets/Images/admin.png')}
                                    alt="Administrator" />
                                <span className="sidenav-link fnt-poppins active">Administrator</span>
                            </div>
                        </Link>
                        {/* Users */}
                        <Link onClick={() => hideShow(false)}>
                            <div className={"sidenav-name-logo" + currentActive("users")}>
                                <img className="icon-width-admin"
                                    src={currentActive("users") === "active" ? require('../../assets/Images/usersactive.png') : require('../../assets/Images/user.png')}
                                    alt="Administrator" />
                                <span className="sidenav-link fnt-poppins active" onClick={() => hideShow(false)}>User</span>
                                {
                                    show ?
                                        <img className="icon-width-admin has-margin-left-30"
                                            src={require('../../assets/Images/upwardarrow.png')}
                                            alt="Administrator" style={{ width: "15px", height: "10px" }} />
                                        :
                                        <img className="icon-width-admin has-margin-left-30"
                                            src={require('../../assets/Images/downwardarrow.png')}
                                            alt="Administrator" style={{ width: "15px", height: "10px" }} />
                                }
                            </div>
                        </Link>
                        {show ?
                            <div className="has-margin-left-20">
                                <Link to={"/users"}>
                                    <div className={"sidenav-name-logo" + currentActive("users")}>
                                        <span className="sidenav-link fnt-poppins active">View Users</span>
                                    </div>
                                </Link>
                                <Link to={"/view-activities"}>
                                    <div className={"sidenav-name-logo" + currentActive("view-activities")}>
                                        <span className="sidenav-link fnt-poppins active">View Activities</span>
                                    </div>
                                </Link>
                            </div>
                            : ""}
                        {/* Subscription */}
                        <Link to={"/subscription"}>
                            <div className={"sidenav-name-logo" + currentActive("subscription")}>
                                <img className="administrator_icon"
                                    src={currentActive("subscription") === "active" ? require('../../assets/Images/subscriptionactive.png') : require('../../assets/Images/subscription.png')}
                                    alt="Subscription" />
                                <span className="sidenav-link fnt-poppins">Subscription</span>
                            </div>
                        </Link>
                        {/* Announcement */}
                        <Link to={"/announcement"}>
                            <div className={"sidenav-name-logo" + currentActive("announcement")}>
                                <img className="administrator_icon"
                                    src={currentActive("announcement") === "active" ? require('../../assets/Images/announcementactive.png') : require('../../assets/Images/announcement.png')}
                                    alt="Announcement" />
                                <span className="sidenav-link fnt-poppins">Announcement</span>
                            </div>
                        </Link>
                        {/* Categories */}
                        <Link to={"/category"}>
                            <div className={"sidenav-name-logo" + currentActive("category")}>
                                <img className="administrator_icon"
                                    src={currentActive("category") === "active" ? require('../../assets/Images/categoryactive.png') : require('../../assets/Images/category.png')}
                                    alt="Categories" />
                                <span className="sidenav-link fnt-poppins">Categories</span>
                            </div>
                        </Link>
                        {/* Newsletters */}
                        <Link to={"/newsletter"}>
                            <div className={"sidenav-name-logo" + currentActive("newsletter")}>
                                <img className="administrator_icon"
                                    src={currentActive("newsletter") === "active" ? require('../../assets/Images/newsletteractive.png') : require('../../assets/Images/newsletter.png')}
                                    alt="Newsletter" />
                                <span className="sidenav-link fnt-poppins">Newsletters</span>
                            </div>
                        </Link>
                        {/* Pages */}
                        <Link to={"/pages"}>
                            <div className={"sidenav-name-logo" + currentActive("pages")}>
                                <img className="administrator_icon"
                                    src={currentActive("pages") === "active" ? require('../../assets/Images/pagesactive.png') : require('../../assets/Images/pages.png')}
                                    alt="Pages" />
                                <span className="sidenav-link fnt-poppins">Pages</span>
                            </div>
                        </Link>
                        {/* General Setting */}
                        <Link onClick={() => hideShowSetting(false)}>
                            <div className={"sidenav-name-logo" + currentActive("setting")}>
                                <img className="administrator_icon"
                                    src={currentActive("setting") === "active" ? require('../../assets/Images/generalsettingactive.png') : require('../../assets/Images/Setting.png')}
                                    alt="General Setting" />
                                <span className="sidenav-link fnt-poppins active" onClick={() => hideShowSetting(false)}>Setting</span>
                                { showSetting ?
                                        <img className="icon-width-admin has-margin-left-30"
                                            src={require('../../assets/Images/upwardarrow.png')}
                                            alt="Administrator" style={{ width: "15px", height: "10px" }} />
                                        :
                                        <img className="icon-width-admin has-margin-left-30"
                                            src={require('../../assets/Images/downwardarrow.png')}
                                            alt="Administrator" style={{ width: "15px", height: "10px" }} />
                                }
                            </div>
                        </Link>
                        {showSetting ?
                            <div className="has-margin-left-30">
                                <Link to={"/setting"}>
                                    <div className={"sidenav-name-logo" + currentActive("setting")}>
                                        <span className="sidenav-link fnt-poppins active">Setting</span>
                                    </div>
                                </Link>
                                <Link to={"/live-setting"}>
                                    <div className={"sidenav-name-logo" + currentActive("live-setting")}>
                                        <span className="sidenav-link fnt-poppins active">Live Setting</span>
                                    </div>
                                </Link>
                            </div>
                            : ""}
                        {/* Compaigns */}
                        <Link to={"/campaign"}>
                            <div className={"sidenav-name-logo" + currentActive("campaign")}>
                                <img className="administrator_icon"
                                    src={currentActive("campaign") === "active" ? require('../../assets/Images/compaignactive.png') : require('../../assets/Images/compaign.png')}
                                    alt="Compaign" />
                                <span className="sidenav-link fnt-poppins">Compaigns</span>
                            </div>
                        </Link>
                        {/* Products */}
                        <Link to={"/product"}>
                            <div className={"sidenav-name-logo" + currentActive("product")}>
                                <img className="administrator_icon"
                                    src={currentActive("product") === "active" ? require('../../assets/Images/productactive.png') : require('../../assets/Images/product.png')}
                                    alt="Products" />
                                <span className="sidenav-link fnt-poppins">Products</span>
                            </div>
                        </Link>
                        {/* Adsons*/}
                        <Link to={"/adson"}>
                            <div className={"sidenav-name-logo" + currentActive("adson")}>
                                <img className="administrator_icon"
                                    src={currentActive("adson") === "active" ? require('../../assets/Images/adsonsactive.png') : require('../../assets/Images/adson.png')}
                                    alt="Adson" />
                                <span className="sidenav-link fnt-poppins">Adsons</span>
                            </div>
                        </Link>
                        {/* Coupan */}
                        <Link to={"/coupans"}>
                            <div className={"sidenav-name-logo" + currentActive("coupans")}>
                                <img className="administrator_icon"
                                    src={currentActive("coupans") === "active" ? require('../../assets/Images/coupanactive.png') : require('../../assets/Images/coupan.png')}
                                    alt="Coupan" />
                                <span className="sidenav-link fnt-poppins">Coupan</span>
                            </div>
                        </Link>
                        {/* Template */}
                        <Link to={"/tamplates"}>
                            <div className={"sidenav-name-logo" + currentActive("tamplates")}>
                                <img className="administrator_icon"
                                    src={currentActive("tamplates") === "active" ? require('../../assets/Images/templateactive.png') : require('../../assets/Images/template.png')}
                                    alt="Coupan" />
                                <span className="sidenav-link fnt-poppins">Templates</span>
                            </div>
                        </Link>
                        {/* Files */}
                        <Link to={"/file"}>
                            <div className={"sidenav-name-logo" + currentActive("file")}>
                                <img className="administrator_icon"
                                    src={currentActive("file") === "active" ? require('../../assets/Images/filesactive.png') : require('../../assets/Images/file.png')}
                                    alt="Files" />
                                <span className="sidenav-link fnt-poppins">Files</span>
                            </div>
                        </Link>
                        {/* Logout */}
                        <Link to={"/signin"} onClick={()=>logout()}>
                            <div className="sidenav-name-logo">
                                <img className="administrator_icon" alt="Logout" src={Logout} />
                                <span className="sidenav-link fnt-poppins">Logout</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Style />
        </>
    );
}
export default withRouter(Sidenav);