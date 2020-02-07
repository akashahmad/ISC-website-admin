import React, { useEffect, useState } from 'react'
import Image1 from '../../assets/Images/larki.jpg'
import { withRouter } from 'react-router-dom'
import Style from './style'
import ReactPaginate from "react-paginate";
import { useQuery} from '@apollo/react-hooks';
import { ADMIN_DASHBOARD } from '../apollo/Quries/dashboardQurie'
import Loader from '../commonComponents/Loader/loader'

const Dashboard = () => {

  // const {loading, error, data} = useQuery(ADMIN_DASHBOARD, { context: { clientName: "second" } });
  const { loading, data } = useQuery(ADMIN_DASHBOARD);
  
  

  if (loading) return <Loader />;

  return (
    <div className="container-fluid Table-for-administrator-main-div">
      {/* header */}
      <div className="header-of-viewAdministrator">
        <h6 className="heading6-of-header fnt-poppins">Dashboard</h6>
      </div>
      {/* Table of Administrator  */}
      <div className="container">
        <form>
          <div className="Table-of-administrator">
            <div className="background-of-table">
              <div className="blanck-dev"></div>
              {/* Table Section */}
              <div className="Form-section-startup">
                <div className="has-margin-bottom-20 extra-div">
                </div>
                {/* { Dashboard  Campaign cards start here      */}
                {/* <first card */}
                <div className=" dashboard-main-cards-div flex-row ">
                  <div className="dash-board-cards mrg-left-20 $White-color">
                    <div className="dashboard-card-headr ">
                      <h1 className="has-padding-top-20 fnt-poppins fnt-size-20 text-center fnt-weight-600 ">Total Support</h1>
                    </div>
                    <div className="dashboard-card-hr-line mrg-left-20 mrg-top-10"></div>
                    <div className="card-inner-main-div d-flex flex-row">
                      <div className="card-left-text  ">
                        <h1 className="mrg-left-60 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data ">Today</h1>
                        <p className="mrg-left-70 mrg-top-20  fnt-poppins card-number-styling number-data-responsive">{data.adminDashboard.TotalSupportToday}</p>
                      </div>
                      <div className="dashboard-cards-min-line mrg-top-10 "></div>
                      <div className="card-right-text">
                        <h1 className="mrg-left-45 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Last Week</h1>
                        <p className=" mrg-left-70 mrg-top-20  fnt-poppins card-number-styling number-data-responsive">{data.adminDashboard.TotalSupportLastWeek}</p>
                      </div>
                    </div>
                  </div>
                  {/* second card */}
                  <div className="dash-board-cards dashboard-responsive-card-marglft mrg-left-50 $White-color">
                    <div className="dashboard-card-headr">
                      <h1 className="has-padding-top-20 fnt-poppins fnt-size-20 text-center fnt-weight-600">Total New Campaigns</h1>
                    </div>
                    <div className="dashboard-card-hr-line mrg-left-20 mrg-top-10"></div>
                    <div className="card-inner-main div d-flex flex-row">
                      <div className="card-left-text  ">
                        <h1 className="mrg-left-60 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Today</h1>
                        <p className=" mrg-left-70 mrg-top-20  fnt-poppins card-number-styling number-data-responsive">105</p>
                      </div>
                      <div className="dashboard-cards-min-line mrg-top-10 "></div>
                      <div className="card-right-text">
                        <h1 className="mrg-left-45 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Last Week</h1>
                        <p className=" mrg-left-70 mrg-top-20  fnt-poppins card-number-styling number-data-responsive">1105</p>
                      </div>
                    </div>
                  </div>
                  {/* Third card */}
                  <div className="dash-board-cards dashboard-responsive-card-marglft mrg-left-50 $White-color">
                    <div className="dashboard-card-headr">
                      <h1 className=" has-padding-top-20 fnt-poppins fnt-size-20 text-center fnt-weight-600">New Users</h1>
                    </div>
                    <div className="dashboard-card-hr-line mrg-left-20 mrg-top-10"></div>
                    <div className="card-inner-main div d-flex flex-row">
                      <div className="card-left-text  ">
                        <h1 className="mrg-left-60 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Today</h1>
                        <p className="mrg-left-70 mrg-top-20 0 fnt-poppins card-number-styling number-data-responsive">105</p>
                      </div>
                      <div className="dashboard-cards-min-line mrg-top-10 "></div>
                      <div className="card-right-text">
                        <h1 className="mrg-left-45 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Last Week</h1>
                        <p className="mrg-left-70 mrg-top-20  fnt-poppins card-number-styling number-data-responsive">1105</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* card second section2 start here */}
                {/* first card section2*/}
                <div className=" dashboard-main-cards-div flex-row mrg-top-50">
                  <div className="dash-board-cards mrg-left-20 $White-color">
                    <div className="dashboard-card-headr ">
                      <h1 className="has-padding-top-20 fnt-poppins fnt-size-20 text-center fnt-weight-600">New Support Campaigns</h1>
                    </div>
                    <div className="dashboard-card-hr-line mrg-left-20 mrg-top-10"></div>
                    <div className="card-inner-main div d-flex flex-row">
                      <div className="card-left-text  ">
                        <h1 className="mrg-left-60 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Today</h1>
                        <p className="mrg-left-70 mrg-top-20  fnt-poppins card-number-styling number-data-responsive">105</p>
                      </div>
                      <div className="dashboard-cards-min-line mrg-top-10 "></div>
                      <div className="card-right-text">
                        <h1 className="mrg-left-45 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Last Week</h1>
                        <p className="mrg-left-70 mrg-top-20  fnt-poppins card-number-styling number-data-responsive">1105</p>
                      </div>
                    </div>
                  </div>
                  {/* second card  section2*/}
                  <div className="dash-board-cards dashboard-responsive-card-marglft mrg-left-50 $White-color">
                    <div className="dashboard-card-headr">
                      <h1 className="has-padding-top-20 fnt-poppins fnt-size-20 text-center fnt-weight-600">New Petition Campaigns</h1>
                    </div>
                    <div className="dashboard-inner-responsive-contents"></div>
                    <div className="dashboard-card-hr-line mrg-left-20 mrg-top-10"></div>
                    <div className="card-inner-main div d-flex flex-row">
                      <div className="card-left-text  ">
                        <h1 className="mrg-left-60 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Today</h1>
                        <p className="mrg-left-70 mrg-top-20  fnt-poppins card-number-styling number-data-responsive">105</p>
                      </div>
                      <div className="dashboard-cards-min-line mrg-top-10 "></div>
                      <div className="card-right-text">
                        <h1 className="mrg-left-45 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Last Week</h1>
                        <p className="mrg-left-70 mrg-top-20  fnt-poppins card-number-styling number-data-responsive">1105</p>
                      </div>
                    </div>
                  </div>
                  {/* Third card  section2*/}
                  <div className="dash-board-cards dashboard-responsive-card-marglft mrg-left-50 $White-color">
                    <div className="dashboard-card-headr">
                      <h1 className=" has-padding-top-20 fnt-poppins fnt-size-20 text-center fnt-weight-600">New Pledge Campaigns</h1>
                    </div>
                    <div className="dashboard-card-hr-line mrg-left-20 mrg-top-10"></div>
                    <div className="card-inner-main div d-flex flex-row">
                      <div className="card-left-text  ">
                        <h1 className="mrg-left-60 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Today</h1>
                        <p className="mrg-left-70 mrg-top-20 card-number-styling fnt-poppins number-data-responsive">105</p>
                      </div>
                      <div className="dashboard-cards-min-line mrg-top-10 "></div>
                      <div className="card-right-text">
                        <h1 className="mrg-left-45 mrg-top-30 fnt-size-20 fnt-poppins fnt-weight-400 dashboard-reesposive-data">Last Week</h1>
                        <p className=" mrg-left-70 mrg-top-20 card-number-styling fnt-poppins number-data-responsive">1105</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* dashboard Campaign card end here */}
                {/* dashboard lastweek Campaign card start here */}
                <div className="container last-week-main-dev ">
                  <div className="Table-Header mrg-top-50">
                    <h1 className=" fnt-poppins white-color fnt-size-20">Last Week Campaigns</h1>
                    <div className="is-flex">
                      <div className="has-padding-right-20 has-padding-top-5 fnt-poppins">View</div>
                      <select className="select-option-of-adminstrator dashboard-responsive-select-opt-wdth fnt-poppins">
                        <option>Campaigns</option>
                        <option>Petitions</option>
                        <option>Pledges</option>
                        <option>Users</option>
                      </select>
                    </div>
                  </div>
                  {/* 1st Card of Last Week Views and of Compaigns */}
                  <div className="is-flex Last-week-cards-main-dev">
                    <div className="Last-week-card-section mrg-top-50">
                      <img src={Image1} alt="" />
                      <div className="mrg-top-10  text-center" >
                        <h4 className="fnt-size-15 fnt-poppins">Update Profile Picture</h4>
                        <p className="mrg-top-5 fnt-size-13  fnt-poppins">Category:Human-Rights</p>
                        <button className="Save-btn-of-form mrg-top-20 fnt-poppins">Support</button>
                      </div>
                    </div>
                    {/* 2nd Card of Last Week Views and of Compaigns */}
                    <div className="Last-week-card-section mrg-top-50">
                      <img src={Image1} alt="" />
                      <div className="mrg-top-10  text-center" >
                        <h4 className="fnt-size-15 fnt-poppins">Update Profile Picture</h4>
                        <p className="mrg-top-5 fnt-size-13  fnt-poppins">Category:Human-Rights</p>
                        <button className="Save-btn-of-form mrg-top-20 fnt-poppins">Support</button>
                      </div>
                    </div>
                    {/* 3rd Card of Last Week Views and of Compaigns */}
                    <div className="Last-week-card-section mrg-top-50">
                      <img src={Image1} alt="" />
                      <div className="mrg-top-10  text-center" >
                        <h4 className="fnt-size-15 fnt-poppins">Update Profile Picture</h4>
                        <p className="mrg-top-5 fnt-size-13  fnt-poppins">Category:Human-Rights</p>
                        <button className="Save-btn-of-form mrg-top-20 fnt-poppins">Support</button>
                      </div>
                    </div>
                    {/* 4th Card of Last Week Views and of Compaigns */}
                    <div className="Last-week-card-section mrg-top-50">
                      <img src={Image1} alt="" />
                      <div className="mrg-top-10 text-center" >
                        <h4 className="fnt-size-15 fnt-poppins">Update Profile Picture</h4>
                        <p className="mrg-top-5 fnt-size-13  fnt-poppins">Category:Human-Rights</p>
                        <button className="Save-btn-of-form  mrg-top-20  fnt-poppins">Support</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="has-margin-top-40">
                  <ReactPaginate previousLabel={<span className="fa fa-chevron-right "> &#60; </span>}
                    nextLabel={<span className="fa fa-chevron-right "> > </span>}
                    breakLabel={". . ."}
                    breakClassName={"break-me"}
                    pageCount={5}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={5}
                    containerClassName={"digit-icons main"}
                    subContainerClassName={"container column"}
                    activeClassName={"p-one"} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Style />
    </div>
  );
}
export default withRouter(Dashboard);