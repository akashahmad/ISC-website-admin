import React, { useState, useEffect } from 'react'
import Image from '../../../assets/Images/admin.png'
import { withRouter } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { SINGLE_PRODUCT } from '../../apollo/Quries/singleProduct'
import { productImages, campaignLogo_baseurl, productImage_BaseUrl } from '../../../config'
import axios from 'axios'
import { UPDATE_PRODUCT } from '../../apollo/Mutations/updateProduct'
import { apiPath } from '../../../config'
import Loader from '../../commonComponents/Loader/loader'
import { getParams } from '../../functions'
import ContentLoader from 'react-content-loader'

const EditProduct = (props) => {

    let { history, match, location } = props;
    let path = getParams(location.search);
    let id = match.params && match.params.id ? match.params.id : "";
    const { loading, data } = useQuery(SINGLE_PRODUCT(id))
    const [renderData, setRenderData] = useState("");
    const [addProduct] = useMutation(UPDATE_PRODUCT);
    const [variation, setVariation] = useState([])
    const [buttonText, setButtonText] = useState("Update")
    let currentDate = new Date();
    currentDate = currentDate.toISOString();
    const [productImg, setProductImg] = useState("");

    useEffect(() => {
        let duplicateData = data && data.getproductbyId ? { ...data.getproductbyId } : {}
        let variation = duplicateData.variation ? JSON.parse(duplicateData.variation) : [];
        variation.forEach(sin => {
            let varationValue = "";
            varationValue += sin.value.map((single, ind) => single)
            sin.value = varationValue;
        });
        setRenderData(duplicateData);
        setVariation(variation);
        setProductImg(data && data.getproductbyId && data.getproductbyId.image);
    }, [data, data && data.getproductbyId])

    // method for uploading productImg
    const uploadProductImage = (event, index) => {
        const file = event.target.files[0];
        setProductImg("Loading");
        getBase64(file).then(
            data => {
                let final = {
                    imageFile: data,
                    imageTitle: file.name.split('.').slice(0, -1).join('.').replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '-').toLowerCase()
                };
                axios.post(apiPath + '/uploadProductMedia', final).then(res => {
                    let duplicateProducts = { ...renderData };
                    duplicateProducts.image = res.data.imageUrl;
                    setRenderData({ ...duplicateProducts })
                    setProductImg(res.data.imageUrl);
                });
            });
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // method for adding more than one variation
    const addVariation = () => {
        let duplicateVariation = [...variation]
        duplicateVariation.push({ name: "", value: "" })
        setVariation(duplicateVariation);
    }

    // method for editing prodcut
    const editData = (event) => {
        event.preventDefault();
        setButtonText("Updating...")
        let duplicateVariation = [...variation]
        duplicateVariation.forEach(sin => {
            sin.value = sin.value.split(",");
        })
        addProduct({
            variables: {
                Id: parseInt(id),
                Name: renderData.Name,
                description: renderData.description,
                sale_price: parseFloat(renderData.sale_price),
                image: renderData && renderData.image ? renderData.image : "",
                category: renderData.category,
                actual_weight: parseFloat(renderData.actual_weight),
                height: parseFloat(renderData.height),
                width: parseFloat(renderData.width),
                length: parseFloat(renderData.length),
                variation: duplicateVariation ? JSON.stringify(duplicateVariation) : JSON.stringify([])
            }
        }).then(res => {
            setButtonText("Updated");
        }).catch(error => {
            setButtonText("Update");
        })
    }

    return (
        <>
            {!loading ?
                <div className="container-fluid Table-for-administrator-main-div">
                    {/* header */}
                    <div className="header-of-viewAdministrator">
                        <h6 className="heading6-of-header fnt-poppins">Edit Product</h6>
                        <button onClick={() => history.goBack("/product?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
                    </div>
                    {/* Table of Administrator  */}
                    <form onSubmit={event => editData(event)}>
                        <div className="Table-of-administrator">
                            <div className="container-fluid background-of-table">
                                <div className="blanck-dev"></div>
                                {/* Table Section */}
                                <div className="container  Form-section-startup Form-sections-startups-responsive">
                                    <div className="Form-section2-uploading-image">
                                        <div className="has-padding-top-20">
                                            {productImg ?
                                                <div className="store-front-image"
                                                    style={{
                                                        backgroundImage: `url(${productImg !== "Loading" ? productImage_BaseUrl + renderData.image : require('../../../assets/Images/main-loader.gif')})`,
                                                        height: "100px",
                                                        backgroundSize: "contain",
                                                        backgroundRepeat: "no-repeat",
                                                        marginLeft: "89px",
                                                        width: "100px"
                                                    }}>
                                                </div>
                                                :
                                                <img className="dashboard_icon"
                                                    src={require('../../../assets/Images/imageplaeholder.png')}
                                                    style={{
                                                        height: "100px",
                                                        width: "100px",
                                                        backgroundRepeat: "no-repeat",
                                                        marginLeft: "89px"
                                                    }}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="Form-section2-uploading-btn">
                                        <div className="file mrg-left-55 mrg-top-20 fnt-poppins">
                                            <label className="file-label">
                                                <input className="file-input fnt-poppins"
                                                    type="file" name="resume"
                                                    accept="image/*"
                                                    onChange={event => uploadProductImage(event)} />
                                                <span className="file-cta">
                                                    <span className="file-icon">
                                                        <i className="fas fa-upload"></i>
                                                    </span>
                                                    <span className="file-label">
                                                        Choose a file…
                                                </span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="Form-main-div-of-sectons flex-row flex-column-responsive">
                                        <div className="Form-section1-main-div-of-inputs  ">
                                            {/* Product Name***/}
                                            <div className="Form-Inputs-Fields mrg-top-30 mrg-left-50">
                                                <div className="form-group">
                                                    <div>
                                                        <label className="mrg-top-20 fnt-poppins">Product Name*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name"
                                                            value={renderData && renderData.Name}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.Name = event.target.value
                                                                setRenderData(duplicateData)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Product Sale Price($)**/}
                                            <div className="Form-Inputs-Fields mrg-top-10 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label>Product Sale Price($)*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10" type="number" placeholder="Enter Short Description"
                                                            value={renderData && renderData.sale_price}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.sale_price = event.target.value
                                                                setRenderData(duplicateData)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Form-section2-main-div-of-inputs has-margin-top-10">
                                            {/*Product Short Description**/}
                                            <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                                <div className="form-group">
                                                    <div>
                                                        <label>Product Short Description*</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="slug"
                                                            value={renderData && renderData.description}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.description = event.target.value
                                                                setRenderData(duplicateData)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="Form-Inputs-Fields has-margin-top-10">
                                                    <div className="form-group">
                                                        <div>
                                                            <label className="mrg-top-20 fnt-poppins">Product Category</label>
                                                        </div>
                                                        <div>
                                                            <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name"
                                                                value={renderData && renderData.category}
                                                                onChange={event => {
                                                                    let duplicateData = { ...renderData }
                                                                    duplicateData.category = event.target.value
                                                                    setRenderData(duplicateData)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Form-section2-main-div-of-inputs has-margin-top-10 is-flex">
                                        {/*Product Short Description**/}
                                        <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                            <div className="Form-Inputs-Fields has-margin-top-20">
                                                <div className="form-group">
                                                    <div>
                                                        <label className="mrg-top-20 fnt-poppins">Height
                                                </label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name"
                                                            value={renderData && renderData.height}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.height = event.target.value
                                                                setRenderData(duplicateData)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                            <div className="Form-Inputs-Fields has-margin-top-20">
                                                <div className="form-group">
                                                    <div>
                                                        <label className="mrg-top-20 fnt-poppins">width</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name"
                                                            value={renderData && renderData.width}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.width = event.target.value
                                                                setRenderData(duplicateData)
                                                            }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Form-section2-main-div-of-inputs has-margin-top-10 ">
                                        {/*Product Short Description**/}
                                        <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins is-flex">
                                            <div className="form-group">
                                                <div>
                                                    <label>Length</label>
                                                </div>
                                                <div>
                                                    <input className="mrg-top-10" type="slug"
                                                        value={renderData && renderData.length}
                                                        onChange={event => {
                                                            let duplicateData = { ...renderData }
                                                            duplicateData.length = event.target.value
                                                            setRenderData(duplicateData)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="Form-Inputs-Fields has-margin-left-50">
                                                <div className="form-group">
                                                    <div>
                                                        <label className="mrg-top-20 fnt-poppins">Weight</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name"
                                                            value={renderData && renderData.actual_weight}
                                                            onChange={event => {
                                                                let duplicateData = { ...renderData }
                                                                duplicateData.actual_weight = event.target.value
                                                                setRenderData(duplicateData)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Form-section2-main-div-of-inputs has-margin-top-10 ">
                                        {/*Product Short Description**/}
                                        {variation && variation.map((single, index) =>
                                            <div key={index} className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins is-flex">
                                                <div className="form-group">
                                                    <div>
                                                        <label>Variation Label</label>
                                                    </div>
                                                    <div>
                                                        <input className="mrg-top-10" type="slug"
                                                            value={single.name}
                                                            onChange={event => {
                                                                let duplicateVariation = [...variation]
                                                                duplicateVariation[index].name = event.target.value
                                                                setVariation(duplicateVariation)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="Form-Inputs-Fields has-margin-left-50">
                                                    <div className="form-group">
                                                        <div>
                                                            <label className="mrg-top-20 fnt-poppins">Variation Value</label>
                                                        </div>
                                                        <div>
                                                            <input className="mrg-top-10" type="slug"
                                                                value={single.value}
                                                                onChange={event => {
                                                                    let duplicateVariation = [...variation]
                                                                    duplicateVariation[index].value = event.target.value
                                                                    setVariation(duplicateVariation)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="btns-of-add mrg-top-30 has-margin-left-60 fnt-poppins">
                                            <span className="has-padding-5 Save-btn-of-form fnt-poppins"
                                                onClick={() => addVariation()}
                                            >Add Variation</span>
                                        </div>
                                    </div>
                                    <div className="btns-of-add mrg-left-60 mrg-top-30 fnt-poppins">
                                        <span className="cancel-btn-of-form fnt-poppins"
                                            onClick={() => history.goBack("/product?page=" + path)}
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
export default withRouter(EditProduct);