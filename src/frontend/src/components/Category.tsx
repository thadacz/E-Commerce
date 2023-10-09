import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import categoryApi from "../services/category.service";
import ICategoryData from "../types/category.type";

const Category: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name can't exceed 50 characters"),
  });

  const [currentCategory, setCurrentCategory] = useState<ICategoryData>({
    id: "",
    name: "",
  });
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (id) {
      getCategory(Number(id));
    }
  }, [id]);

  const getCategory = (categoryId: number) => {
    categoryApi
      .getCategoryById(categoryId)
      .then((response: any) => {
        setCurrentCategory(response.data);
        formik.setFieldValue("name", response.data.name);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: currentCategory.name,
    },
    validationSchema,
    onSubmit: (values) => {
      updateCategoryById(values);
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    setCurrentCategory({
      ...currentCategory,
      [event.target.name]: event.target.value,
    });
  };

  const updateCategoryById = (updatedCategory: ICategoryData) => {
    categoryApi
      .updateCategory(currentCategory.id, updatedCategory)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The category was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteCategoryById = () => {
    categoryApi
      .deleteCategory(currentCategory.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/categories");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCategory.id ? (
        <div className="edit-form">
          <h4>Category</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={deleteCategoryById}
            >
              Delete
            </button>
            <p>{message}</p>
          </form>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Category...</p>
        </div>
      )}
    </div>
  );
};

export default Category;