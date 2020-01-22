import React from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'

export default () => {
    return (
        <>
            <div className="container-fluid Table-for-administrator-main-div">

                {/* header */}

                <div className="header-of-viewAdministrator">
                    <h6 className="heading6-of-header fnt-poppins">All Compaigns</h6>
                </div>

                {/* Table of Administrator  */}

                <div className="Table-of-administrator">
                    <div className="background-of-table">
                    </div>
                    <div className="Table-Header">
                        <h6 className="fnt-poppins">All Compaigns</h6>
                    </div>
                    {/* Table-Title */}
                    <div className="container-fluid Table-title">
                        <div>
                            <table className="viewAnnouncement-Table">
                                <thead className="viewAnnouncement-Table-header fnt-poppins">
                                    <tr >
                                        <th className="white-color">Compaign Name</th>
                                        <th className="white-color">Compaign Type</th>
                                        <th className="white-color">Action</th>
                                    </tr>
                                </thead>
                                <tr className="fnt-poppins background-white">
                                    <td>Alfreds Futterkiste</td>
                                    <td>Alfreds</td>
                                    <td>
                                        <div className="appling-flex-btns">
                                            <img className="delete-image-table" src={Deletelogo} />
                                        </div>
                                    </td>
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