import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import productApi from "../services/product.service";
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  size: string;
  color: string;
}



export function CategoryProducts() {
    const { categoryId } = useParams(); 
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await productApi.getProductsByCategoryId(Number(categoryId));
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [categoryId]);

  return (
    <>
      <h1>Category</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
