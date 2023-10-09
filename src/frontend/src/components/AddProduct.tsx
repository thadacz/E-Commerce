import React, { useState, ChangeEvent, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import productApi from "../services/product.service";
import IProduct from "../types/product.type";
import Category from "../types/category.type";
import categoryApi from "../services/category.service";

const AddProduct: React.FC = () => {
  const initialProductState = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: null as File | null,
    category: "",
  };

  const [categoryNames, setCategoryNames] = useState<Category[]>([]);

  useEffect(() => {
    categoryApi
      .getCategoriesNames()
      .then((response: any) => {
        setCategoryNames(response.data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Stock must be an integer")
      .min(0, "Stock must be at least 0"),
    image: Yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: initialProductState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      saveProduct(values);
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      formik.setFieldValue("image", event.target.files[0]);
    }
  };

  const saveProduct = (productData: any) => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("stock", productData.stock.toString());
    formData.append("category", productData.category);
    if (productData.image) {
      formData.append("image", productData.image);
    }

    productApi
      .addProduct(formData)
      .then((response: any) => {
        formik.resetForm();
        console.log(response.data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return (
    <div className="submit-form">
      <div>
        <h4>Add new product</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="error">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              {...formik.getFieldProps("category")}
            >
              <option value="">Select a category</option>
              {categoryNames.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="error">{formik.errors.category}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              required
              {...formik.getFieldProps("stock")}
            />
            {formik.touched.stock && formik.errors.stock ? (
              <div className="error">{formik.errors.stock}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="image"
              onChange={handleImageChange}
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="error">{formik.errors.image}</div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;