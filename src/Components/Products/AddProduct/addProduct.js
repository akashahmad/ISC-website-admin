import React, { useState } from 'react'
import Image from '../../../assets/Images/admin.png'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_PRODUCT } from '../../apollo/Mutations/createProduct'
import { productImages, campaignLogo_baseurl, productImage_BaseUrl } from '../../../config'
import axios from 'axios'
import { apiPath } from '../../../config'
import ImgLoader from '../../../assets/Images/main-loader.gif'
import Loader from '../../commonComponents/Loader/loader'
import { getParams } from '../../functions'

const AddProduct = (props) => {
    let { history, location } = props;
    let path = getParams(location.search);
    const [addProduct] = useMutation(CREATE_PRODUCT);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [salePrice, setSalePrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [length, setLength] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [variation, setVariation] = useState([])
    const [buttonText, setButtonText] = useState("Creating")

    let currentDate = new Date();
    currentDate = currentDate.toISOString();

    // method for uploading product image
    const uploadProductImage = (event) => {
        const file = event.target.files[0];
        setImage("Loading");
        getBase64(file).then(
            data => {
                let final = {
                    imageFile: data,
                    imageTitle: file.name.split('.').slice(0, -1).join('.').replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '-').toLowerCase()
                };
                axios.post(apiPath + '/uploadProductMedia', final).then(res => {
                    setImage(res.data.imageUrl);
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

    // method for creating a product
    const onSubmit = (event) => {
        event.preventDefault();
        setButtonText("Creating...");
        let duplicateVariation = [...variation]
        duplicateVariation.forEach(sin => {
            sin.value = sin.value.split(",");
        })
        addProduct({
            variables: {
                Name: name,
                CreatedBy: 123,
                description: description,
                sale_price: parseFloat(salePrice),
                image: image,
                category: category,
                actual_weight: parseFloat(weight),
                height: parseFloat(height),
                width: parseFloat(width),
                length: parseFloat(length),
                variation: duplicateVariation ? JSON.stringify(duplicateVariation) : JSON.stringify([])
            }
        }).then(res => {
            history.push("/edit-product/" + res.data.createProduct.Id)
        }).catch(error => {
            setButtonText("Create")
        })
    }

    return (
        <div className="container-fluid Table-for-administrator-main-div">
            {/* header */}
            <div className="header-of-viewAdministrator">
                <h6 className="heading6-of-header fnt-poppins">Add Product</h6>
                <button onClick={() => history.goBack("/product?page=" + path)} className="cursor-pointer header-btn-of-table fnt-poppins">Back</button>
            </div>
            {/* Table of Administrator  */}
            <form
                onSubmit={(event) => onSubmit(event)}
            >
                <div className="Table-of-administrator">
                    <div className="container-fluid background-of-table">
                        <div className="blanck-dev"></div>
                        {/* Table Section */}
                        <div className="container  Form-section-startup Form-sections-startups-responsive">
                            <div className="Form-section2-uploading-image">
                                <div className="has-padding-top-20">
                                    {image ?
                                        <div className=""
                                            style={{
                                                backgroundImage: `url(${image !== "Loading" ? productImage_BaseUrl + image : require('../../../assets/Images/main-loader.gif')})`,
                                                height: "100px",
                                                backgroundSize: "contain",
                                                width: "95px",
                                                marginLeft: "89px",
                                                backgroundRepeat: "no-repeat"
                                            }}>
                                        </div>
                                        :
                                        <img className="dashboard_icon"
                                            src={require('../../../assets/Images/imageplaeholder.png')}
                                            style={{
                                                height: "100px",
                                                width: "130px",
                                                backgroundRepeat: "no-repeat",
                                                marginLeft: "5%"
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
                                                <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name" value={name}
                                                    required
                                                    onChange={event => setName(event.target.value)}
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
                                                    required
                                                    value={salePrice}
                                                    onChange={event => setSalePrice(event.target.value)}
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
                                                <input className="mrg-top-10" type="slug"
                                                    value={description}
                                                    onChange={event => setDescription(event.target.value)}
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
                                                        value={category}
                                                        onChange={event => setCategory(event.target.value)}
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
                                                    value={height}
                                                    onChange={event => setHeight(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Form-Inputs-Fields mrg-top-20 mrg-left-50 fnt-poppins">
                                    <div className="Form-Inputs-Fields has-margin-top-20">
                                        <div className="form-group">
                                            <div>
                                                <label className="mrg-top-20 fnt-poppins">Width</label>
                                            </div>
                                            <div>
                                                <input className="mrg-top-10 fnt-poppins" type="name" placeholder="Enter Name"
                                                    value={width}
                                                    onChange={event => setWidth(event.target.value)}
                                                />
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
                                                value={length}
                                                onChange={event => setLength(event.target.value)}
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
                                                    value={weight}
                                                    onChange={event => setWeight(event.target.value)}
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
    );
}
export default withRouter(AddProduct);