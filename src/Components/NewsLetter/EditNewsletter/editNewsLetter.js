import React, { useEffect, useState } from 'react'
import cancelImg from '../../../assets/Images/cancel.png'
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { NEWSLETTERS_TEMPLATES } from '../../apollo/Mutations/getAllNewsletterTemplates'
import { SINGLE_NEWSLETTER } from '../../apollo/Quries/singleNewsletter'
import Loader from '../../commonComponents/Loader/loader'
import { UPDATE_NEWSLETTER } from '../../apollo/Mutations/updateNewsletter'
import axios, { CancelToken } from "axios";
import { apiPath } from '../../../config'
import Style from '../AddNewsletter/style'
import { standardDate } from '../../functions/index'
import { getParams } from '../../functions/index'
import ContentLoader from 'react-content-loader'

const EditNewsletter = (props) => {

    let { history, match, location } = props;
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : "";
    const [hideShow, setHideShow] = useState(false);
    const [hideShowDate, setHideShowDate] = useState(false);
    const [searchHide, setSearchHide] = useState(false)
    const { loading, data } = useQuery(SINGLE_NEWSLETTER(id));
    const [getTemplates] = useMutation(NEWSLETTERS_TEMPLATES);
    const [updateNewsletter] = useMutation(UPDATE_NEWSLETTER);
    const [templates, setTemplates] = useState("");
    const [renderData, setRenderData] = useState("");
    const [interestData, setInterestData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [selectTemplate, setSelectTemplate] = useState("")
    const [buttonText, setButtonText] = useState("Update")
    const [searchData, setSearchData] = useState();
    const [newSearch, setNewSearch] = useState();
    const [dateTime, setDatetime] = useState("");

    useEffect(() => {
        getTemplates().then(res => {
            setTemplates(res && res.data && res.data.getNewsLetterTemplates);
        })
    }, [])

    let dateFormate = renderData.datetime ? standardDate(renderData.datetime) : "";
    dateFormate = dateFormate ? dateFormate.fullYear + "-" + dateFormate.monthNumber + "-" + dateFormate.dateNumber : ""
    let stDate = new Date(dateFormate);

    useEffect(() => {
        // let duplicateSelectedIntrestedIds = data && data.singlenewsletter && data.singlenewsletter.interestedIds
        // let duplicateAllIntrestedData = data && data.getAllIntersts
        // duplicateSelectedIntrestedIds = duplicateSelectedIntrestedIds && duplicateSelectedIntrestedIds.map(single => {
        //     let obj = duplicateAllIntrestedData.find(sin => sin.id == single.interestId)
        //     duplicateAllIntrestedData = duplicateAllIntrestedData.filter(sin => sin.id != single.interestId)
        //     return obj
        // })
        // setSelectedData(duplicateSelectedIntrestedIds)
        setInterestData(data && data.getAllIntersts);
        console.log("data && data.getAllIntersts",data && data.getAllIntersts)
        setRenderData(data && data.singlenewsletter ? { ...data.singlenewsletter } : {})
        setSelectTemplate(data && data.singlenewsletter && data.singlenewsletter.Template);
        setNewSearch(data && data.singlenewsletter && data.singlenewsletter.campaign_id ? data.singlenewsletter.campaignName : "")
        setDatetime(data && data.singlenewsletter && data.singlenewsletter.datetime ? data.singlenewsletter.datetime : "");
    }, [data])

    let cancel;
    const onChageKeyword = (value) => {
        setNewSearch(value);
        cancel && cancel();
        axios.post(
            apiPath + "/campainNameSearch",
            {
                Name: value
            },
            {
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancel = c;
                })
            }
        ).then(res => {
            setSearchData(res && res.data && res.data.name);
        })
    }

    const onSelectCampaign = (value) => {
        setNewSearch(value.Name);
        let duplicateNewsletter = { ...renderData }
        duplicateNewsletter.campaign_id = value.Id;
        setRenderData({ ...duplicateNewsletter });
        setSearchData([]);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setButtonText("Upating...")
        let currentDate = new Date();
        currentDate = currentDate.toISOString();
        // let interestIds = []
        // if (selectedData) {
        //     selectedData.forEach(single => {
        //         interestIds.push(single.id)
        //     })
        // }
        updateNewsletter({
            variables: {
                Id: parseInt(id),
                name: renderData.name,
                support_mailsettings_id: parseInt(renderData.Template.Id),
                status: renderData.status,
                datetime: renderData && renderData.status == "Schedule" ? stDate.toISOString() : null,
                group: renderData.group,
                cron_status: "pending",
                date_updated: currentDate,
                interestId: renderData && renderData.group == "interestedusers" ? parseInt(renderData.interestId) : null,
                campaign_id: renderData && renderData.group == "campaignusers" ? renderData.campaign_id : null
            }
        }).then(res => {
            setButtonText("Updated")
        }).catch(error => {
            setButtonText("Update")
        })
    }

    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Edit NewsLetter</h6>
                        <button onClick={() => history.goBack("/newsletter?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                    {/* Table of Administrator  */}
                    <form onSubmit={event => onSubmit(event)}>
                        <div className="Table-of-administrator">
                            <div className="container-fluid background-of-table">
                                <div className="blanck-dev"></div>
                                {/* Table Section */}
                                <div className="container  Form-section-startup Form-sections-startups-responsive ">
                                    <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                        <div className="Form-section1-main-div-of-inputs  ">
                                            {/* NewsLetter Name***/}
                                            <div className="Form-Inputs-Fields  mrg-top-30 mrg-left-50">
                                                <div className="form-group">
                                                    <div>
                                                        <label className="mrg-top-20 fnt-poppins">NewsLetter Name*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name"
                                                            value={renderData && renderData.name}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.name = event.target.value
                                                                setRenderData(duplicateData)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Form-section2-main-div-of-inputs mrg-top-10">
                                            {/*Select Tempelate* */}
                                            <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label >Select Template*</label>
                                                    </div>
                                                    <div>
                                                        <select className="mrg-top-10 fnt-poppins"
                                                            value={renderData && renderData.Template && renderData.Template.Id}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.Template.Id = event.target.value
                                                                setRenderData({ ...duplicateData })
                                                            }}>
                                                            <option>Select Template</option>
                                                            {templates && templates.length !== 0 && templates.map(single =>
                                                                <option value={single.Id}>{single.Title}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* radioButtons */}
                                    <div className="radios mrg-top-20 mrg-left-50">
                                        <div className="radio">
                                            <label>Select</label>
                                            <input className="mrg-top-40" type="radio" id="radio1" name="radio"
                                                checked={renderData && renderData.status == "Schedule"}
                                                onChange={event => {
                                                    if (renderData && renderData.status == "Schedule") {
                                                        setHideShowDate(true)
                                                    }
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.status = "Schedule"
                                                    setRenderData({ ...duplicateData })
                                                }}
                                            />
                                            <label className="label-of-radio" for="radio1">
                                                <div className="checker"></div>
                                                Schedule Newsletter
                                </label>
                                        </div>
                                    </div>
                                    <div className="radios mrg-left-50">
                                        <div className="radio">
                                            <input type="radio" id="radio2" name="radio"
                                                checked={renderData && renderData.status == "Draft"}
                                                onChange={event => {
                                                    setHideShowDate(false)
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.status = "Draft"
                                                    setRenderData({ ...duplicateData })
                                                }}
                                            />
                                            <label className="label-of-radio" for="radio2">
                                                <div className="checker"></div>
                                                <div>Save As Draft</div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* Set Newsletter Date And Time (MM/DD/YYYY HH:mm:ss)**/}
                                    {renderData && renderData.status == "Schedule" ?
                                        <div>
                                            {/* {hideShowDate && */}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 mrg-top-20 fnt-poppins">
                                                <div className="form-group fnt-poppins">
                                                    <div>
                                                        <label>Set Newsletter Date And Time </label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" id="myDate" placeholder="Enter Short Description"
                                                            value={dateFormate}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.datetime = event.target.value
                                                                setRenderData({ ...duplicateData })
                                                            }}
                                                            type="date"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* } */}
                                        </div>
                                        : ""}
                                    {/* radioButtons second for Select Group**/}
                                    <div className="radios-of-group mrg-top-20 mrg-left-50">
                                        <div className="radio-of-group">
                                            <label>Select Group*</label>
                                            <input className="mrg-top-40" type="radio" id="radio3" name="radio-of-groups"
                                                checked={renderData && renderData.group == "campaignusers"}
                                                onChange={event => {
                                                    if (searchHide == true) {
                                                        setSearchHide(false)
                                                        setHideShow(false)
                                                    }
                                                    else if (searchHide == false) {
                                                        setSearchHide(true)
                                                        setHideShow(false)
                                                        let duplicateData = { ...renderData }
                                                        duplicateData.group = "campaignusers"
                                                        setRenderData({ ...duplicateData })
                                                    }
                                                }}
                                            />
                                            <label className="label-of-radio" for="radio3">
                                                <div className="checker"></div>
                                                    Campaign Users
                                            </label>
                                        </div>
                                    </div>
                                    <div className="radios-of-group mrg-left-50">
                                        <div className="radio-of-group">
                                            <input type="radio" id="radio4" name="radio-of-groups"
                                                checked={renderData && renderData.group == "campaigncreators"}
                                                onChange={event => {
                                                    setHideShow(false)
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.group = "campaigncreators"
                                                    setRenderData({ ...duplicateData })
                                                }}
                                            />
                                            <label className="label-of-radio" for="radio4">
                                                <div className="checker"></div>
                                                <div>Campaign Creators</div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="radios-of-group mrg-left-50">
                                        <div className="radio-of-group">
                                            <input type="radio" id="radio5" name="radio-of-groups"
                                                checked={renderData && renderData.group == "interestedusers"}
                                                onChange={event => {
                                                    setHideShow(true)
                                                    setSearchHide(false)
                                                    let duplicateData = { ...renderData }
                                                    duplicateData.group = "interestedusers"
                                                    setRenderData({ ...duplicateData })
                                                }}
                                            />
                                            <label className="label-of-radio" for="radio5">
                                                <div className="checker"></div>
                                                <div>Interested Users</div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Select Campaigns***/}
                                    {renderData && renderData.group == "interestedusers" ?
                                        < div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                            <div className="form-group">
                                                <div>
                                                    <label className="mrg-top-20 fnt-poppins">Select User Interest</label>
                                                </div>
                                                <div>
                                                    <select className="mrg-top-10 fnt-poppins" type="name"
                                                        value={renderData && renderData.interestId}
                                                        onChange={event => {
                                                            let duplicateData = { ...renderData }
                                                            duplicateData.interestId = event.target.value
                                                            setRenderData({ ...duplicateData })
                                                        }}
                                                    >
                                                        <option value="">select User Interest</option>
                                                        {interestData && interestData.map(single =>
                                                            <option value={single.id}>{single.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                {/* <div>
                                                    {selectedData && selectedData.length !== 0 && selectedData.map(single =>
                                                        <ul className=" is-flex back-color back-color">
                                                            <li className="has-padding-left-10">{single.name}</li>
                                                            <li className="has-padding-right-10"><img src={cancelImg} onClick={() => remove(single.id)}
                                                                className="has-cursor-pointer has-margin-left-15 cancel-img" /></li>
                                                        </ul>
                                                    )}
                                                </div> */}
                                            </div>
                                        </div>
                                        : ""}
                                    {/* search input field */}
                                    {renderData && renderData.group == "campaignusers" ?
                                        <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                            <div className="form-group">
                                                <div>
                                                    <label className="mrg-top-20 fnt-poppins">Search Campaign</label>
                                                </div>
                                                <div>
                                                    <input className="mrg-top-10 fnt-poppins" type="name"
                                                        value={newSearch ? newSearch : ""}
                                                        onChange={event => {
                                                            onChageKeyword(event.target.value);
                                                        }}
                                                    />
                                                    <div>
                                                        {searchData && searchData.length !== 0 ? searchData.map(single =>
                                                            <ul className="has-cursor-pointer seaarch-list" onClick={() => {
                                                                onSelectCampaign(single);

                                                            }}>
                                                                <li className="has-padding-left-10" value={single.Id}>{single.Name +"  | isupportcause.com/campaign/"+single.Slug}</li>
                                                            </ul>
                                                        ) : ""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : ""}
                                    {/* buttons */}
                                    <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                        <span className="cancel-btn-of-form fnt-poppins"
                                            onClick={() => history.goBack("/newsletter?page=" + path)}
                                        >Cancel</span>
                                        <button className="Save-btn-of-form mrg-left-20 fnt-poppins" type="submit">{buttonText}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <Style />
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
export default withRouter(EditNewsletter);
