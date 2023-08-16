import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import orderApi from "../services/order.service";
import authApi from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

function DeliveryForm() {

    const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    department: "",
    zip: "",
    phone: "",
    emailAddress: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required!"),
    lastName: Yup.string().required("Last Name is required!"),
    companyName: Yup.string(),
    streetAddress: Yup.string().required("Street Address is required!"),
    city: Yup.string().required("City is required!"),
    department: Yup.string().required("Department is required!"),
    zip: Yup.string().required("Zip is required!"),
    phone: Yup.string(),
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email Address is required!"),
  });


  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const user = authApi.getCurrentUser();
    orderApi.createOrder(user.id, values)
      .then((response) => {
        console.log("Order created successfully:", response.data);
        localStorage.removeItem("shopping-cart");
        navigate("/payment");
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h1>Delivery Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <Field
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <Field
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <Field
              type="text"
              className="form-control"
              id="companyName"
              name="companyName"
            />
            <ErrorMessage
              name="companyName"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="streetAddress" className="form-label">
              Street Address
            </label>
            <Field
              type="text"
              className="form-control"
              id="streetAddress"
              name="streetAddress"
            />
            <ErrorMessage
              name="streetAddress"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <Field type="text" className="form-control" id="city" name="city" />
            <ErrorMessage
              name="city"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <Field
              type="text"
              className="form-control"
              id="department"
              name="department"
            />
            <ErrorMessage
              name="department"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="zip" className="form-label">
              Zip
            </label>
            <Field type="text" className="form-control" id="zip" name="zip" />
            <ErrorMessage
              name="zip"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <Field
              type="text"
              className="form-control"
              id="phone"
              name="phone"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="emailAddress" className="form-label">
              Email Address
            </label>
            <Field
              type="email"
              className="form-control"
              id="emailAddress"
              name="emailAddress"
            />
            <ErrorMessage
              name="emailAddress"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Go to the payment
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default DeliveryForm;
