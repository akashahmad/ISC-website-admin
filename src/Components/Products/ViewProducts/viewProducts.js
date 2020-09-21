import React, { useState, useEffect } from 'react'
import Editlogo from '../../../assets/Images/edit.svg'
import Deletelogo from '../../../assets/Images/delete.svg'
import Style from './style'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { PRODUCTS } from '../../apollo/Mutations/productsMutation'
import { DELETE_PRODUCT } from '../../apollo/Mutations/deleteProduct'
import Loader from '../../commonComponents/Loader/loader'
import ReactPaginate from "react-paginate";
import { productImages } from '../../../Config'
import { getParams } from '../../functions/index'
import ContentLoader from 'react-content-loader'

const ViewProduct = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [products] = useMutation(PRODUCTS);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);
    const [data, setData] = useState("");
    const [totalPages, setTotalPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState([]);

    const searchHandler = (value) => {
        let resultData = data ? data.filter(sin => sin.Name.toLowerCase().indexOf(value.toLowerCase()) !== -1) : []
        setSearch(resultData)
    }
    const pageHandler = (value) => {
        setPage(parseInt(value.selected) + 1);
        history.push("/product?page=" + (parseInt(value.selected) + 1));
        products({
            variables: {
                page: parseInt(value.selected) + 1,
                limit: 5
            }
        }
        ).then(response => {
            setData(response && response.data && response.data.getAllProducts ? response.data.getAllProducts.products : []);
            setTotalPage(response && response.data.getAllProducts ? response.data.getAllProducts.totalPages : [1]);
            setTotalProducts(response && response.data.getAllProducts && response.data.getAllProducts.totalProducts);
            setSearch(response && response.data && response.data.getAllProducts ? response.data.getAllProducts.products : []);
        })
    }


    useEffect(() => {
        products({
            variables: {
                page: path && parseInt(path.page) ? parseInt(path.page) : page,
                limit: 5
            }
        }
        ).then(response => {
            setData(response && response.data && response.data.getAllProducts ? response.data.getAllProducts.products : []);
            setTotalPage(response && response.data.getAllProducts ? response.data.getAllProducts.totalPages : [1]);
            setTotalProducts(response && response.data.getAllProducts && response.data.getAllProducts.totalProducts);
            setSearch(response && response.data && response.data.getAllProducts ? response.data.getAllProducts.products : []);
        })
    }, [])

    const deleteProducts = (Id) => {
        deleteProduct({
            variables: {
                Id: parseInt(Id),
            }
        }).then(response => {
            if (window.confirm("Are you sure you want to delete Data"));
            window.location.replace("/product")
        })
    }

    return (
        <>
            {data && data.length !== 0 ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Products</h6>
                        <button onClick={() => history.push("/add-product")} className="cursor-pointer header-btn-of-table fnt-poppins">Create</button>
                    </div>
                    {/* Table of Administrator  */}
                    <div className="Table-of-administrator">
                        <div className="background-of-table">
                        </div>
                        <div className="Table-Header">
                            <h6 className="fnt-poppins">All Products Records</h6>
                            <input className="input-for-search fnt-poppins" placeholder="Name"
                                onChange={event => {
                                    searchHandler(event.target.value)
                                }}
                            />
                        </div>
                        {/* Table-Title */}
                        <div className="container-fluid Table-title">
                            <table className="main-table-heading">
                                <thead className="heading-of-table background-color-head">
                                    <tr className="table-row-of-head fnt-poppins">
                                        <th>Name</th>
                                        <th>Created By</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Created By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-of-data">
                                    {search && search.length !== 0 && search.map((single, index) =>
                                        <tr key={index} className="table-row-data-of-body fnt-poppins">
                                            <td>{single.Name ? single.Name : "-"}</td>
                                            <td>{single.CreatedBy ? single.CreatedBy : "-"}</td>
                                            {single.image ?
                                                <td className="has-margin-top-15" style={{
                                                    backgroundImage: `url(${single.image ? productImages + single.image : ""})`,
                                                    backgroundSize: 'contain',
                                                    height: '143px',
                                                    backgroundRepeat: 'no-repeat'
                                                }}></td>
                                                : <div style={{ marginTop: "10px", marginLeft: "20px", height: '143px' }}>No-Image</div>}
                                            <td>{"$" + " " + single.sale_price}</td>
                                            <td>{single.CreatedBy}</td>
                                            <td>
                                                <div className="applying-flex-products-btn">
                                                    <img onClick={() => history.push("/edit-product/" + single.Id)} className=" cursor-pointer edit-image-table view-subscription-btn-edit" alt="edit-button" src={Editlogo} />
                                                    <img className="cursor-pointer delete-image-table" alt="delete-button" onClick={() => deleteProducts(single.Id)} src={Deletelogo} />
                                                    {/* <span className="cursor-pointer view-btn-of-table view-subscription-btn-products">Assign</span> */}
                                                    <span onClick={() => history.push("/view-all-campaign/" + single.Id)} className="cursor-pointer view-btn-of-table view-subscription-btn-products">View</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="table-footer">
                                        <td colSpan={5}>Total</td>
                                        <td>{totalProducts}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mrg-top-10">
                            <ReactPaginate previousLabel={<span className="fa fa-chevron-right "> &#60; </span>}
                                nextLabel={<span className="fa fa-chevron-right "> > </span>}
                                breakLabel={". . ."}
                                breakClassName={"break-me"}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={pageHandler}
                                containerClassName={"digit-icons main"}
                                subContainerClassName={"container column"}
                                activeClassName={"p-one"}
                                forcePage={path && parseInt(path.page) ? (parseInt(path.page) - 1) : 0}
                            />
                        </div>
                    </div>
                    <Style />
                </div>
                :
                <ContentLoader
                    speed={2}
                    viewBox="0 0 1000 550"
                    backgroundColor="#eaeced"
                    foregroundColor="#ffffff"
                    {...props}
                >
                    <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
                    <circle cx="879" cy="123" r="11" />
                    <circle cx="914" cy="123" r="11" />
                    <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
                    <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
                    <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
                    <circle cx="880" cy="184" r="11" />
                    <circle cx="915" cy="184" r="11" />
                    <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
                    <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
                    <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
                    <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
                    <circle cx="881" cy="242" r="11" />
                    <circle cx="916" cy="242" r="11" />
                    <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
                    <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
                    <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
                    <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
                    <circle cx="882" cy="303" r="11" />
                    <circle cx="917" cy="303" r="11" />
                    <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
                    <rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
                    <circle cx="881" cy="363" r="11" />
                    <circle cx="916" cy="363" r="11" />
                    <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
                    <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
                    <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
                    <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
                    <circle cx="882" cy="424" r="11" />
                    <circle cx="917" cy="424" r="11" />
                    <rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
                    <rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
                    <rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
                    <circle cx="882" cy="484" r="11" />
                    <circle cx="917" cy="484" r="11" />
                    <rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
                    <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
                    <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
                    <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
                    <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
                    <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
                    <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
                </ContentLoader>
            }
        </>
    );
}
export default withRouter(ViewProduct)