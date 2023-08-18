import { useEffect, useState } from "react";
import Stripe from "react-stripe-checkout";
import axios from "axios";
import authApi from "../services/auth.service";
import orderApi from "../services/order.service";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigate = useNavigate();

  const user = authApi.getCurrentUser();

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await orderApi.getOrderTotalAmount(user.id);
        const total = parseFloat(response.data);
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching cart total:", error);
      }
    };

    fetchTotalAmount();
  }, [user.id]);

const handleToken = async (token: any) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}` + "/api/payment/charge",
      {
        token: token.id,
        amount: totalAmount,
      }
    );

    // Zakończ zamówienie i pobierz zaktualizowane zamówienia z serwera
    const updatedOrdersResponse = await orderApi.completeOrder(user.id);
    const updatedOrders = updatedOrdersResponse.data;

    alert("Payment Success");
    navigate("/completion", { state: { updatedOrders } });
  } catch (error) {
    alert("Payment Failed. Please try again later.");
    console.error("Error processing payment:", error);
  }
};


  return (
    <div>
      <h1>Payment</h1>
      <p>Total Amount: {totalAmount} USD</p>
      <Stripe
        stripeKey={import.meta.env.VITE_APP_PUBLIC_KEY}
        token={handleToken}
      />
    </div>
  );
}

export default Payment;
