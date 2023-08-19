import { useEffect, useState } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { Link } from "react-router-dom";
import CartItem from "../types/cart-item.type";
import authApi from "../services/auth.service";
import cartApi from "../services/cart.service";
import { Button } from "react-bootstrap";

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const user = authApi.getCurrentUser();
  const customerId = user.id;

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = () => {
      cartApi.getCart(customerId)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };


  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="d-flex align-items-center">
            <div className="me-auto">
              <div>
                {item.product.name}{" "}
                {item.quantity > 1 && (
                  <span className="text-muted" style={{ fontSize: ".65rem" }}>
                    x{item.quantity}
                  </span>
                )}
              </div>
              <div className="text-muted" style={{ fontSize: ".75rem" }}>
                {formatCurrency(item.product.price)}
              </div>
            </div>
            <div> {formatCurrency(item.product.price * item.quantity)}</div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => cartApi.removeFromCart(item.id,user.id)}
            >
              &times;
            </Button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <div className="d-flex flex-column align-items-center mt-3">
          <div className="h3">Total: {formatCurrency(calculateTotal())}</div>
          <Link to="/delivery-form" className="btn btn-primary mt-3">
            Go to delivery form
          </Link>
        </div>
      )}
    </div>
  );
}
