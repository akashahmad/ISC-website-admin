import React,{useEffect} from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import cookie from 'react-cookies'
// SideNav
import Sidenav from './Components/Sidenav/sidenav'
// Dashboard
import Dashboard from './Components/Dashboard/dashboard'
// Administration
import AddAdministrator from './Components/Administrator/AddAdministrator/addAdministrator'
import AdminInformation from './Components/Administrator/AdminInformation/adminInformation'
import EditAdministrator from './Components/Administrator/EditAdministrator/editAdministrator'
import ViewAdministrator from './Components/Administrator/ViewAdministrators/viewAdministrator'
// Users
import AddUser from './Components/User/AddUser/addUser'
import EditUser from './Components/User/EditUser/editUser'
import UserInformationCampaigns from './Components/User/UserInformation/Compaign/compaign'
import UserInformationActivities from './Components/User/UserInformation/UserActivity/userInformation'
import ViewActivities from './Components/User/ViewActivities/viewActivities'
import ViewUser from './Components/User/ViewUser/viewUser'
// Subscription
import AddSubscriptionRecord from './Components/Subscription/AddSubscriptionRecord/addSubscriptionRecord'
import EditSubscription from './Components/Subscription/EditSubscription/editSubscription'
import EditSubscriptionDetails from './Components/Subscription/EditSubscriptionDetail/editSubscriptionRecord'
import SubscriptionDetailRecord from './Components/Subscription/Subscription-DetailRecords/subscriptionDetailRecords'
import ViewSubscription from './Components/Subscription/ViewSubscription/viewSubscription'
// Announcement
import AddAnnouncement from './Components/Announcement/AddAnnouncement/addAnnouncement'
import AnnouncementDetail from './Components/Announcement/AnnouncementDetail/AnnouncementDetail'
import EditAnnouncemnent from './Components/Announcement/EditAnnouncement/editAnnouncement'
import ViewAnnouncement from './Components/Announcement/ViewAnnouncement/viewAnnouncement'
// Category
import AddCategory from './Components/Categories/AddCategory/addCatogry'
import CategoryDetails from './Components/Categories/CategoryDetails/categoryDetails'
import EditCategory from './Components/Categories/EditCategory/editCategory'
import ViewCategory from './Components/Categories/ViewCategories/viewCategories'
// NewsLetter
import AddNewsLetter from './Components/NewsLetter/AddNewsletter/addNewsletter'
import EditNewsLetter from './Components/NewsLetter/EditNewsletter/editNewsLetter'
import ViewNewsLetter from './Components/NewsLetter/ViewNewsLetter/viewNewsletter'
// Pages
import AddPages from './Components/Pages/AddPage/addPage'
import EditPages from './Components/Pages/EditPage/editPage'
import ViewPages from './Components/Pages/ViewPages/viewPages'
// Setting
import AddSetting from './Components/Setting/AddSetting/AddSetting'
import EditSetting from './Components/Setting/EditSetting/editSetting'
import LiveSetting from './Components/Setting/LiveSetting/liveSetting'
import ViewSetting from './Components/Setting/ViewSetting/viewSetting'
// Campaign
import CampaignDetails from './Components/Compaigns/CompaignDetails/compaignDetails'
import CreateCamapaign from './Components/Compaigns/CreateCompaigns/createCompaigns'
import EditCampaign from './Components/Compaigns/EditCompaign/editCompaign'
import ViewCampaign from './Components/Compaigns/ViewCompaigns/viewCompaigns'
// Product
import AddProduct from './Components/Products/AddProduct/addProduct'
import AddProductInCampaign from './Components/Products/AddProduct-InCompaign/addProduct-inCompaign'
import EditProduct from './Components/Products/EditProduct/editProduct'
import ViewAllCampaign from './Components/Products/ViewAllCompaigns/viewAllCompaigns'
import ViewProduct from './Components/Products/ViewProducts/viewProducts'
// Adsons
import AddAdson from './Components/Adsons/AddAdson/addAdson'
import EditAdson from './Components/Adsons/EditAdson/editAdson'
import ViewAdson from './Components/Adsons/ViewAdsons/viewAdsons'
import ViewDetails from './Components/Adsons/ViewDetails/viewDetails'
// Coupans
import AddCoupans from './Components/Coupans/AddCoupan/addCoupan'
import EditCoupans from './Components/Coupans/EditCoupan/editCoupan'
import ViewCoupans from './Components/Coupans/ViewCoupans/viewCoupans'
// Templates
import AddTamplates from './Components/Templates/AddTemplate/addTemplate'
import EditTamplates from './Components/Templates/EditTemplate/editTemplate'
import ViewTamplates from './Components/Templates/ViewTemplates/viewtemplates'
// Files
import EditFiles from './Components/Files/EditFile/editFile'
import Viewfiles from './Components/Files/ViewFiles/viewFiles'
const AllRouters = (props) => {
    let {history, location} = props;
    useEffect(() => {
        let token = cookie.load("token");
        console.log("Routetoken",token);
        if (!token) {
            setTimeout(() => {
                history.push("/signin");
            }, 100);
        }
    }, [location.pathname]);
    return (
        <div className="main-routes-div is-flex">
            {/* SideNav */}
            <Sidenav />
            <div className="main-routes main-dev-of-routes">
                <div className="right-section">
                        <Switch>
                            {/* Administration */}
                            <Route path={"/add-administrator"} component={AddAdministrator} />
                            <Route path={"/admin-information"} component={AdminInformation} />
                            <Route path={"/edit-administrator"} component={EditAdministrator} />
                            <Route path={"/administrator"} component={ViewAdministrator} />
                            {/* Users */}
                            <Route path={"/add-user"} component={AddUser} />
                            <Route path={"/edit-user"} component={EditUser} />
                            <Route path={"/user-information-campaings"} component={UserInformationCampaigns} />
                            <Route path={"/user-information-activities"} component={UserInformationActivities} />
                            <Route path={"/view-activities"} component={ViewActivities} />
                            <Route path={"/users"} component={ViewUser} />
                            {/* Subscription */}
                            <Route path={"/add-subscription-record"} component={AddSubscriptionRecord} />
                            <Route path={"/edit-subscription"} component={EditSubscription} />
                            <Route path={"/edit-subscription-detail"} component={EditSubscriptionDetails} />
                            <Route path={"/subscription-detail-record"} component={SubscriptionDetailRecord} />
                            <Route path={"/subscription"} component={ViewSubscription} />
                            {/* Announcemnent */}
                            <Route path={"/add-announcement"} component={AddAnnouncement} />
                            <Route path={"/announcement-details"} component={AnnouncementDetail} />
                            <Route path={"/edit-announcement"} component={EditAnnouncemnent} />
                            <Route path={"/announcement"} component={ViewAnnouncement} />
                            {/* Cateories */}
                            <Route path={"/add-category"} component={AddCategory} />
                            <Route path={"/category-details"} component={CategoryDetails} />
                            <Route path={"/edit-category"} component={EditCategory} />
                            <Route path={"/category"} component={ViewCategory} />
                            {/* Newsletter */}
                            <Route path={"/add-newsletter"} component={AddNewsLetter} />
                            <Route path={"/edit-newsletter"} component={EditNewsLetter} />
                            <Route path={"/newsletter"} component={ViewNewsLetter} />
                            {/* Pages */}
                            <Route path={"/add-pages"} component={AddPages} />
                            <Route path={"/edit-pages"} component={EditPages} />
                            <Route path={"/pages"} component={ViewPages} />
                            {/* Settings */}
                            <Route path={"/add-setting"} component={AddSetting} />
                            <Route path={"/edit-setting"} component={EditSetting} />
                            <Route path={"/live-setting"} component={LiveSetting} />
                            <Route path={"/setting"} component={ViewSetting} />
                            {/* Campaigns */}
                            <Route path={"/Camapaign-details"} component={CampaignDetails} />
                            <Route path={"/create-camapaign"} component={CreateCamapaign} />
                            <Route path={"/edit-campaign"} component={EditCampaign} />
                            <Route path={"/campaign"} component={ViewCampaign} />
                            {/* Product */}
                            <Route path={"/add-product"} component={AddProduct} />
                            <Route path={"/add-product-incamapaign"} component={AddProductInCampaign} />
                            <Route path={"/edit-product"} component={EditProduct} />
                            <Route path={"/view-all-campaign"} component={ViewAllCampaign} />
                            <Route path={"/product"} component={ViewProduct} />
                            {/* Adsons */}
                            <Route path={"/add-adson"} component={AddAdson} />
                            <Route path={"/edit-adson"} component={EditAdson} />
                            <Route path={"/adson"} component={ViewAdson} />
                            <Route path={"/view-details"} component={ViewDetails} />
                            {/* Coupans */}
                            <Route path={"/add-coupans"} component={AddCoupans} />
                            <Route path={"/edit-coupans"} component={EditCoupans} />
                            <Route path={"/coupans"} component={ViewCoupans} />
                            {/* Templates */}
                            <Route path={"/add-tamplates"} component={AddTamplates} />
                            <Route path={"/edit-tamplates"} component={EditTamplates} />
                            <Route path={"/tamplates"} component={ViewTamplates} />
                            {/* File */}
                            <Route path={"/edit-file"} component={EditFiles} />
                            <Route path={"/file"} component={Viewfiles} />
                             {/* Dashboard */}
                             <Route path={"/"} exact={true} component={Dashboard} />
                        </Switch>
                </div>
            </div>
        </div>
    );
}
export default withRouter(AllRouters);