import React from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Style from './style'
import {Link} from 'react-router-dom'

export default () => {
    return (
        <>
            <div className="container-fluid Table-for-administrator-main-div">
                {/* header */}
                <div className="header-of-viewAdministrator">
                    <h6 className="heading6-of-header fnt-poppins">Files</h6>
                </div>
                {/* Table of Administrator  */}
                <div className="Table-of-administrator">
                    <div className="background-of-table">
                    </div>
                    <div className="Table-Header">
                        <h6 className="fnt-poppins">Select File</h6>
                    </div>
                    {/* Table-Title */}
                    <div className="container-fluid Table-title">
                        <div>
                            <table className="viewAnnouncement-Table">
                                <tr className="fnt-poppins background-white has-height-100">
                                    <div className="is-flex main-div-of-file">
                                        <li className="has-padding-top-10  has-padding-left-10 list-style">Robots<span></span></li>
                                        <Link to="edit-file"><img className="edit-image-table  has-margin-top-5 has-margin-left-20 has-width-20 has-height-20" alt="" src={Editlogo} /></Link>
                                    </div>
                                    <div className="is-flex main-div-of-file">
                                        <li className="has-padding-top-10 has-padding-left-10 list-style">Sitemap<span></span></li>
                                        <Link to="edit-file"><img className="edit-image-table  has-margin-top-5 has-margin-left-10 has-width-20 has-height-20" alt="" src={Editlogo} /></Link>
                                    </div>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <Style />
            </div>
        </>
    );
}