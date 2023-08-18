import React, { useEffect, useState } from "react";
import orderApi from "../services/order.service";

import orderRatingApi from "../services/order-rating.service";
import  { Rating } from "react-simple-star-rating";
import authApi from "../services/auth.service";
import { format, parseISO } from "date-fns";
import Address from "../types/address.type";
import ProductReportDTO from "../types/product-report-dto.type";


interface OrderReportDTO {
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  products: ProductReportDTO[];
  deliveryAddress: Address;
  orderStatus: string;
  date: string ;
  orderTotalAmount: number;
}

const Completion: React.FC = () => {
  const [orderReports, setOrderReports] = useState<OrderReportDTO[]>([]);
  const user = authApi.getCurrentUser();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const [ratingError, setRatingError] = useState<string | null>(null);
  
    
const handleRatingChange = (rate: number) => {
  setRating(rate);
};

    const handleCommentChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setComment(event.target.value);
    };

    const handleSubmitRating = () => {
      const orderRatingData: any = {
        rating: rating,
        comment: comment,
      };

      orderRatingApi.createOrderRating(orderRatingData, user.id)
        .then((response) => {
          console.log("Order rating added:", response.data);
          loadOrderReports();
          setRating(0);
          setComment("");
          alert("Rating submitted. Thank you!");
        })
        .catch((error) => {
          console.error("Error adding order rating:", error);
          alert(
            "Error submitting rating. Please try again if you haven't submitted a review before."
          );
        });
    };

    const loadOrderReports = () => {
      orderApi.getOrderReport(user.id)
        .then((response) => {
          setOrderReports(response.data);
        })
        .catch((error) => {
          console.error("Error fetching order reports:", error);
        });
    };

    useEffect(() => {
      loadOrderReports();
    }, []);
    
  useEffect(() => {
    orderApi.getOrderReport(user.id)
      .then((response) => {
        setOrderReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order reports:", error);
      });
  }, []);

  {
    orderReports.map((report, index) => {
      console.log("Processing report at index", index, ":", report);

      // ... rest of the mapping code ...
    });
  }


  
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
                  {product.productName} : {product.quantity}x{product.price}$ ={" "}
                  {product.quantity * product.price}$
                </li>
              ))}
            </ul>
            <p>
              Execution Date:{" "}
              {format(new Date(report.date), "yyyy-MM-dd HH:mm:ss")}
            </p>
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
            {report.orderStatus === "COMPLETED" && (
              <div>
                <h3>Rate this Order:</h3>
                <div className="d-flex flex-column">
                  <div className="mb-3">
                    <Rating onClick={handleRatingChange} />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment..."
                      value={comment}
                      onChange={handleCommentChange}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary "
                      onClick={() => handleSubmitRating()}
                    >
                      Submit Rating
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
        <h2>Thank you! 🎉</h2>
      </ul>
    </div>
  );
};

export default Completion;
