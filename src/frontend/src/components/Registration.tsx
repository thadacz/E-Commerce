import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import authApi from "../services/auth.service";

type Props = {};

const Register: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  } = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
    email: Yup.string().email("Invalid email").required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleRegister = (formValue: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const { firstName, lastName, email, password } = formValue;

    setMessage("");
    setLoading(true);

    authApi.register(firstName, lastName, email, password).then(
      () => {
        navigate("/login");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <>
      <h1 className="text-center">Sign Up</h1>
      <div className="col-md-4 mx-auto">
        <div className="card card-container ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" type="text" className="form-control" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" className="form-control" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span >Sign Up</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
