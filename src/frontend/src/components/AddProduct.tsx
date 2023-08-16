import React, { useState, ChangeEvent, useEffect } from "react";
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
    category: { id: "", },
  };

  const [product, setProduct] = useState<IProduct>(initialProductState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [categoryNames, setCategoryNames] = useState<Category[]>([]);

    useEffect(() => {
      categoryApi.getCategoriesNames()
        .then((response: any) => {
          setCategoryNames(response.data);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProduct({ ...product, image: event.target.files[0] });
    }
  };

   const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
     const { value } = event.target;
     const selectedCategory = categoryNames.find(
       (category) => category.id.toString() === value
     );
     if (selectedCategory) {
       setProduct({ ...product, category: { id: selectedCategory.id } });
     }
   };

  const saveProduct = () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    formData.append("category", product.category?.id);
    if (product.image) {
      formData.append("image", product.image);
    }

    productApi.addProduct(formData)
      .then((response: any) => {
        setProduct(initialProductState);
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Add Another Product
          </button>
        </div>
      ) : (
        <div>
          <h4>Add new product</h4>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={product.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={product.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              value={product.category?.id || ""}
              onChange={handleCategoryChange}
              name="category"
              required
            >
              <option value="">Select a category</option>
              {categoryNames.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={product.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              required
              value={product.stock}
              onChange={handleInputChange}
              name="stock"
            />
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
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
