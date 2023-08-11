import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import IProductData from "../types/product.type";
import { getAllProducts } from "../services/product.service";

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Array<IProductData>>([]);
  const [currentProduct, setCurrentProduct] = useState<IProductData | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveProducts();
  }, []);



  const retrieveProducts = () => {
    getAllProducts()
      .then((response: any) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProducts();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (product: IProductData, index: number) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };


  return (
    <div className="list row">
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
              className="link-success"
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
