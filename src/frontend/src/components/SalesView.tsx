import React, { useState, useEffect, ChangeEvent } from "react";
import orderApi from "../services/order.service";
import ISalesReport from "../types/sales.types";


const SalesView: React.FC = () => {
  const [salesReports, setSalesReports] = useState<ISalesReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<ISalesReport[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ISalesReport | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    retrieveSalesReports();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredReports(salesReports);
    } else {
      const filtered = salesReports.filter((report) =>
        report.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  }, [searchTerm, salesReports]);

  const retrieveSalesReports = () => {
    orderApi
      .getSalesView()
      .then((response: any) => {
        setSalesReports(response.data);
        setFilteredReports(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const showProductDetails = (product: ISalesReport) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <h4>Sales Reports</h4>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>
      <ul className="list-group">
        {filteredReports.map((report, index) => (
          <li
            className="list-group-item"
            onClick={() => showProductDetails(report)}
            key={index}
          >
            {report.productName}
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <div>
          <h4>Product Details</h4>
          <div>
            <label>
              <strong>Product Name:</strong>
            </label>{" "}
            {selectedProduct.productName}
          </div>
          <div>
            <label>
              <strong>Total Quantity Sold:</strong>
            </label>{" "}
            {selectedProduct.totalQuantitySold}
          </div>
          <div>
            <label>
              <strong>Total Revenue:</strong>
            </label>{" "}
            {selectedProduct.totalRevenue} $
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesView;
