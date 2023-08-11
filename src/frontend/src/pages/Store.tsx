import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { getAllProducts } from "../services/product.service";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  size: string;
  color: string;
}

export function Store() {
  const [products, setProducts] = useState<Product[]>([]); 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Store</h1>
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
