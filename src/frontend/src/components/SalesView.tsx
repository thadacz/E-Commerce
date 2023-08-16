import React, { useState, useEffect, ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import orderApi from "../services/order.service";
import ISalesReport from "../types/sales.types";

const SalesView: React.FC = () => {
  const [salesReports, setSalesReports] = useState<ISalesReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<ISalesReport[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ISalesReport | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const handleDateFilter = () => {
    retrieveSalesReports(); 
  };

const retrieveSalesReports = () => {
  const formattedStartDate = startDate ? startDate.toISOString() : "";
  const formattedEndDate = endDate ? endDate.toISOString() : "";

  orderApi
    .getSalesView(formattedStartDate, formattedEndDate) 
    .then((response: any) => {
      setSalesReports(response.data);
      setFilteredReports(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
};




  const showProductDetails = (product: ISalesReport) => {
    setSelectedProduct(selectedProduct === product ? null : product);
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
      <div className="mb-3">
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          placeholderText="Select start date"
          dateFormat="yyyy-MM-dd"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          placeholderText="Select end date"
          dateFormat="yyyy-MM-dd"
        />
        <button onClick={handleDateFilter}>Filter</button>{" "}
      </div>
      <ul className="list-group">
        {filteredReports.map((report, index) => (
          <li
            className={`list-group-item ${
              selectedProduct === report ? "active" : ""
            }`}
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
