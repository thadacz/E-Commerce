import  { useEffect, useState } from "react";
import Stripe from "react-stripe-checkout";
import axios, { AxiosResponse } from "axios";
import { getCurrentUser } from "../services/auth.service";
import { completeOrder, getOrderTotalAmount } from "../services/order.service";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigate = useNavigate();

  const user = getCurrentUser();


  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response: AxiosResponse<any, any> = await getOrderTotalAmount(
          user.id
        );
        const total = parseFloat(response.data);
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching cart total:", error);
      }
    };

    fetchTotalAmount();
  }, [user.id]);

  const handleToken = async (token: { id: any; }) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}` + "/api/payment/charge",
        {
          token: token.id,
          amount: totalAmount,
        }
      );
      alert("Payment Success");
      completeOrder(user.id);
      navigate("/completion");
    } catch (error) {
      alert("Payment Failed. Please try again later.");
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <p>Total Amount: {totalAmount} USD</p>
      {}
      <Stripe
        stripeKey={import.meta.env.VITE_APP_PUBLIC_KEY}
        token={handleToken}
      />
    </div>
  );
}

export default Payment;
