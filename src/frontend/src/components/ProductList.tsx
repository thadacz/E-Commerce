import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import IProductData from "../types/product.type";
import productApi from "../services/product.service";

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Array<IProductData>>([]);
  const [currentProduct, setCurrentProduct] = useState<IProductData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    retrieveProducts();
  }, []);

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };


  const retrieveProducts = () => {
    productApi.getAllProducts()
      .then((response: any) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };


  const setActiveProduct = (product: IProductData, index: number) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };

    const findByNameContaining = () => {
      productApi.findByName(searchName)
        .then((response: any) => {
          setProducts(response.data);
          setCurrentProduct(null);
          setCurrentIndex(-1);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNameContaining}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Products List</h4>

        <ul className="list-group">
          {products &&
            products.map((product, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(product, index)}
                key={index}
              >
                {product.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Product</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentProduct.name}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>{" "}
              {currentProduct.price} $
            </div>
            <div>
              <label>
                <strong>Stock:</strong>
              </label>{" "}
              {currentProduct.stock}
            </div>

            <Link
              to={"/products/" + currentProduct.id}
              className="btn btn-success"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
