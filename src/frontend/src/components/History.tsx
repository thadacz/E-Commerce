import { useEffect, useState } from "react"
import OrderReport from "../types/orderReport.type"
import orderApi from "../services/order.service";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import authApi from "../services/auth.service";

export function History(){

  const [orders, setOrders] = useState<Array<OrderReport>>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderReport | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const user = authApi.getCurrentUser();



      useEffect(() => {
        retrieveOrders();
      }, []);

     const retrieveOrders = () => {
       orderApi.getHistory(user.id)
         .then((response: any) => {
           setOrders(response.data);
           console.log(response.data);
         })
         .catch((e: Error) => {
           console.log(e);
         });
     };

      const setActiveOrder = (order: OrderReport, index: number) => {
        setCurrentOrder(order);
        setCurrentIndex(index);
      };

    return (
      <div>
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3"></div>
          </div>
          <div className="col-md-6">
            <h4>Order History</h4>

            <ul className="list-group">
              {orders &&
                orders.map((order, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveOrder(order, index)}
                    key={index}
                  >
                    Order #{order.id} Created at{" "}
                    {format(new Date(order.date), "yyyy-MM-dd HH:mm:ss")} Total
                    amount:{order.orderTotalAmount}$
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentOrder ? (
              <div>
                <h4>Order Details</h4>

                <div>
                  <h5>Customer:</h5>
                  <p>
                    Name: {currentOrder.customerFirstName}{" "}
                    {currentOrder.customerLastName}
                    <br />
                    Email: {currentOrder.customerEmail}
                  </p>
                </div>
                <div>
                  <h5>Delivery Address:</h5>
                  <p>
                    {currentOrder.deliveryAddress.firstName}{" "}
                    {currentOrder.deliveryAddress.lastName}
                    {currentOrder.deliveryAddress.companyName &&
                      `, ${currentOrder.deliveryAddress.companyName}`}
                    <br />
                    {currentOrder.deliveryAddress.streetAddress}
                    <br />
                    {currentOrder.deliveryAddress.city},{" "}
                    {currentOrder.deliveryAddress.department},{" "}
                    {currentOrder.deliveryAddress.zip}
                    <br />
                    {currentOrder.deliveryAddress.phone &&
                      `Phone: ${currentOrder.deliveryAddress.phone}`}
                    <br />
                    Email: {currentOrder.deliveryAddress.emailAddress}
                  </p>
                </div>
                <div>
                  <h5>Order Status:</h5>
                  <p>{currentOrder.orderStatus}</p>
                  <div>
                    <label>
                      <strong>Date:</strong>
                    </label>{" "}
                    {format(new Date(currentOrder.date), "yyyy-MM-dd HH:mm:ss")}
                  </div>
                </div>
                <div>
                  <h5>Cart:</h5>
                  <ul>
                    {currentOrder.products.map((product, index) => (
                      <li key={index}>
                        {product.productName} : {product.quantity}x
                        {product.price}$ = {product.quantity * product.price}$
                        Product stock: {product.stock}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label>
                    <strong>Total amount:</strong>
                  </label>{" "}
                  {currentOrder.orderTotalAmount} $
                </div>
                {currentOrder.orderStatus === "CREATED" && (
                  <Link
                    to={"/payment/" + currentOrder.id}
                    className="btn btn-success"
                  >
                    Continue Ordering
                  </Link>
                )}
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Order...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}