import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import productApi from "../services/product.service";
import authApi from "../services/auth.service";
import cartApi from "../services/cart.service";

type StoreItemProps = {
  id: number;
};

export function StoreItem({ id }: StoreItemProps) {
  const user = authApi.getCurrentUser();
  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    productApi
      .getProductById(id)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);
        setStock(productData.stock);
        fetchCartItemQuantity();
      })
      .catch((error) => {
        console.error("Error while fetching product:", error);
      });
  }, [id]);

  const fetchCartItemQuantity = async () => {
    try {
      const cartResponse = await cartApi.getCart(user.id);
      const cartItemsData = cartResponse.data || [];
      const cartItem = cartItemsData.find((item: { product: { id: number; }; }) => item.product.id === id);
      setQuantity(cartItem ? cartItem.quantity : 0);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleAddToCart = () => {
    cartApi.increaseCartQuantity(id, user.id)
      .then(() => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        fetchCartItemQuantity();
      })
      .catch((error) => {
        console.error("Error while adding product to cart:", error);
      });
  };

  const handleDecreaseCartQuantity = () => {
    cartApi.decreaseCartQuantity(id, user.id)
      .then(() => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
        fetchCartItemQuantity();
      })
      .catch((error) => {
        console.error(
          "Error while decreasing product quantity in cart:",
          error
        );
      });
  };

  const handleRemove = () => {
    cartApi.removeFromCart(id, user.id)
      .then(() => {
        setQuantity(0);
        fetchCartItemQuantity();
      })
      .catch((error) => {
        console.error("Error while removing product from cart:", error);
      });
  };

  if (!product) return null;

  const { name, imageUrl, description, price } = product;

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imageUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <Card.Text>
          <span className="card-text text-muted">{description}</span>
        </Card.Text>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={handleAddToCart}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={handleDecreaseCartQuantity}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                {quantity < stock ? (
                  <Button onClick={handleAddToCart}>+</Button>
                ) : (
                  <Button disabled>+</Button>
                )}
              </div>
              <Button onClick={handleRemove} variant="danger" size="sm">
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
