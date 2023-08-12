import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { getProductById } from "../services/product.service";
import { getCurrentUser, logout } from "../services/auth.service";
import {
  addProductToCart,
  decreaseProductQuantityInCart,
  removeProductFromCart,
} from "../services/cart.service";

type StoreItemProps = {
  id: number;
};

export function StoreItem({ id }: StoreItemProps) {
  const {
    getItemQuantity,
    getItemStock,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
    const user = getCurrentUser();
  const quantity = getItemQuantity(id);
  const stock = getItemStock(id);
  const [product, setProduct] = useState<any | null>(null);



  useEffect(() => {
    getProductById(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching product:", error);
      });
  }, [id]);

  console.log("Product:", product);

  const handleAddToCart = (productId: number) => {
    addProductToCart(productId, user.id)
      .then(() => {
        increaseCartQuantity(productId);
        //window.location.reload();
      })
      .catch((error) => {
        console.error("Error while adding product to cart:", error);
      });
  };

  const handleDecreaseCartQuantity = (productId: number) => {
    decreaseProductQuantityInCart(productId, user.id)
      .then(() => {
        decreaseCartQuantity(productId);
      })
      .catch((error) => {
        console.error("Error while adding product to cart:", error);
      });
  };

  const handleIncreaseCartQuantity = (productId: number) => {
    addProductToCart(productId, user.id)
      .then(() => {
        increaseCartQuantity(productId);
      })
      .catch((error) => {
        console.error("Error while adding product to cart:", error);
      });
  };

  const handleRemove = (productId: number) => {
    removeProductFromCart(productId, user.id)
      .then(() => {
        removeFromCart(productId);
      })
      .catch((error) => {
        console.error("Error while adding product to cart:", error);
      });
  };

  if (!product) return null;

  const { name, price } = product;

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => handleAddToCart(id)}>
              {" "}
              {}+ Add To Cart
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
                <Button onClick={() => handleDecreaseCartQuantity(id)}>
                  -
                </Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                {quantity < stock ? (
                  <Button onClick={() => handleIncreaseCartQuantity(id)}>
                    +
                  </Button>
                ) : (
                  <Button disabled>+</Button>
                )}
              </div>
              <Button
                onClick={() => handleRemove(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
