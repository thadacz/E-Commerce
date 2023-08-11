import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { deleteProduct, getProductById, updateProduct } from "../services/product.service";
import IProductData from "../types/product.type"; 

const Product: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialProductState = {
    name: "",
    price: 0,
    stock: 0,
  };
  const [currentProduct, setCurrentProduct] =
    useState<IProductData>(initialProductState);
  const [message, setMessage] = useState<string>("");

  const getProduct = (id: number) => {
    getProductById(id)
      .then((response: any) => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getProduct(Number(id));
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updateProductById = () => {
    updateProduct(currentProduct.id, currentProduct)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The product was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteProductById = () => {
    deleteProduct(currentProduct.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/products");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct.id ? (
        <div className="edit-form">
          <h4>Product</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                value={currentProduct.stock}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={updateProductById}
          >
            Update
          </button>
          <button className="btn btn-danger ml-2" onClick={deleteProductById}>
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
  );
};

export default Product;