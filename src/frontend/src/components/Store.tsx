import { ChangeEvent, useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import productApi from "../services/product.service";
import IProduct from "../types/product.type";

export function Store() {
const [products, setProducts] = useState<Array<IProduct>>([]);
const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
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
  productApi
    .getAllProducts()
    .then((response: any) => {
      setProducts(response.data);
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
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
    <>
      <h1>Store</h1>

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

      <Row md={2} xs={1} lg={3} className="g-3">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
}
