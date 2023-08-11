import React, { useEffect, useState } from "react";
import { getOrderReport } from "../services/order.service";
import { getCurrentUser } from "../services/auth.service";

interface Address {
  id: number;
  firstName: string;
  lastName: string;
  companyName?: string | null;
  streetAddress: string;
  city: string;
  department: string;
  zip: string;
  phone?: string | null;
  emailAddress: string;
}

interface ProductReportDTO {
  productName: string;
  quantity: number;
  price: number;
}

interface OrderReportDTO {
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  products: ProductReportDTO[];
  deliveryAddress: Address;
  orderStatus: string;
  orderTotalAmount: number;
}

const Completion: React.FC = () => {
  const [orderReports, setOrderReports] = useState<OrderReportDTO[]>([]);
  const user = getCurrentUser();
  useEffect(() => {
    getOrderReport(user.id)
      .then((response) => {
        setOrderReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order reports:", error);
      });
  }, []);

  return (
    <div>
      <h1>Order Completion Report</h1>
      <ul>
        {orderReports.map((report, index) => (
          <li key={index}>
            <h3>Customer:</h3>
            <p>
              Name: {report.customerFirstName} {report.customerLastName}
              <br />
              Email: {report.customerEmail}
            </p>
            <h3>Cart:</h3>
            <ul>
              {report.products.map((product, productIndex) => (
                <li key={productIndex}>
                  {product.productName} : {product.quantity}x 
                  {product.price}$ = {product.quantity*product.price}$
                </li>
              ))}
            </ul>
            <p>Total Amount: {report.orderTotalAmount}$</p>
            <h3>Delivery Address:</h3>
            <p>
              {report.deliveryAddress.firstName}{" "}
              {report.deliveryAddress.lastName}
              {report.deliveryAddress.companyName &&
                `, ${report.deliveryAddress.companyName}`}
              <br />
              {report.deliveryAddress.streetAddress}
              <br />
              {report.deliveryAddress.city}, {report.deliveryAddress.department}
              , {report.deliveryAddress.zip}
              <br />
              {report.deliveryAddress.phone &&
                `Phone: ${report.deliveryAddress.phone}`}
              <br />
              Email: {report.deliveryAddress.emailAddress}
            </p>
            <p>Order Status: {report.orderStatus}</p>
          </li>
        ))}
      </ul>
      <h2>Thank you! 🎉</h2>
    </div>
  );
};

export default Completion;
