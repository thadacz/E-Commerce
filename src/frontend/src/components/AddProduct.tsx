import React, { useState, ChangeEvent } from "react";
import { addProduct } from "../services/product.service";
import IProduct from "../types/product.type"; 
import { uploadFile } from "../services/blob.service";

const AddProduct: React.FC = () => {
  const initialProductState = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  };
  const [product, setProduct] = useState<IProduct>(initialProductState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      if (files && files.length > 0) {
        setImageUrl(URL.createObjectURL(files[0]));
        setProduct({ ...product, image: files[0] }); // Update 'image' field
      } else {
        setImageUrl("");
        setProduct({ ...product, image: "" }); // Clear 'image' field
      }
    } else {
      setProduct({ ...product, [name]: value });
    }
  };




const saveProduct = () => {
  const { name, description, price, stock, image } = product;

  if (image instanceof File) {
    uploadFile(image)
      .then((uploadResponse: any) => {
        const imageUrl = uploadResponse.data.url; 
        const data = { name, description, imageUrl, price, stock };

        addProduct(data)
          .then((response: any) => {
            setProduct({
              name: response.data.name,
              description: response.data.description,
              price: response.data.price,
              stock: response.data.stock,
              image: imageUrl,
            });
            setImageUrl("");
            setSubmitted(true);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      })
      .catch((uploadError: Error) => {
        console.log(uploadError);
      });
  } else {
    const data = { name, description, price, stock };

    addProduct(data)
      .then((response: any) => {
        setProduct({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          stock: response.data.stock,
          image: imageUrl,
        });
        setImageUrl("");
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
};


  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          {imageUrl && <img src={imageUrl} alt="Product" />}{" "}
          {}
          <button className="btn btn-success" onClick={newProduct}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={product.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={product.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleInputChange}
              name="image"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={product.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              required
              value={product.stock}
              onChange={handleInputChange}
              name="stock"
            />
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;