import React, { useState, ChangeEvent } from "react";
import { addProduct } from "../services/product.service";
import IProduct from "../types/product.type"; 

const AddProduct: React.FC = () => {
  const initialProductState = {
    name: "",
    price: 0,
    stock: 0,
  };
  const [product, setProduct] = useState<IProduct>(initialProductState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      name: product.name,
      price: product.price,
      stock: product.stock,
    };

    addProduct(data) 
      .then((response: any) => {
        setProduct({
          name: response.data.name,
          price: response.data.price,
          stock: response.data.stock,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
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
