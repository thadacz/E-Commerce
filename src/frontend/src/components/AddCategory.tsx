import React, { useState, ChangeEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ICategory from "../types/category.type";
import categoryApi from "../services/category.service";

const AddCategory: React.FC = () => {
  const initialCategoryState = {
    name: "",
  };
  const [category, setCategory] = useState<ICategory>(initialCategoryState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name can't exceed 50 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: initialCategoryState.name,
    },
    validationSchema,
    onSubmit: (values) => {
      saveCategory(values);
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  const saveCategory = (values: { name: any; }) => {
    var data = {
      name: values.name,
    };

    categoryApi
      .addCategory(data)
      .then((response: any) => {
        setCategory({
          name: response.data.name,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newCategory = () => {
    setCategory(initialCategoryState);
    setSubmitted(false);
    formik.resetForm();
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCategory}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                id="name"
                required
                value={formik.values.name}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                name="name"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
