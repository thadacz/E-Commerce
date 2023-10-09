import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IProductData from "../types/product.type";
import productApi from "../services/product.service";
import Category from "../types/category.type";
import categoryApi from "../services/category.service";

const Product: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialProductState = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: null as File | null,
    category: { id: "", name: "" },
  };

  const [currentProduct, setCurrentProduct] =
    useState<IProductData>(initialProductState);
  const [categoryNames, setCategoryNames] = useState<Category[]>([]);
  const [message, setMessage] = useState<string>("");

  const getProduct = (id: number) => {
    productApi
      .getProductById(id)
      .then((response: any) => {
        setCurrentProduct(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getCategoriesNames = () => {
    categoryApi
      .getCategoriesNames()
      .then((response: any) => {
        setCategoryNames(response.data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) {
      getProduct(Number(id));
      getCategoriesNames();
    }
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectedCategory = categoryNames.find(
      (category) => category.id.toString() === value
    );
    if (selectedCategory) {
      setCurrentProduct((prevProduct) => ({
        ...prevProduct,
        category: { id: selectedCategory.id, name: selectedCategory.name },
      }));
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCurrentProduct((prevProduct) => ({
        ...prevProduct,
        image: event.target.files[0],
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    if (
      !currentProduct.name ||
      !currentProduct.description ||
      !currentProduct.category ||
      currentProduct.price === 0 ||
      currentProduct.stock === 0
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }
    updateProductById();
  };

  const updateProductById = () => {
    const formData = new FormData();
    formData.append("name", currentProduct.name);
    formData.append("description", currentProduct.description);
    formData.append("price", currentProduct.price.toString());
    formData.append("stock", currentProduct.stock.toString());
    formData.append("category", currentProduct.category?.id || "");
    if (currentProduct.image) {
      formData.append("image", currentProduct.image);
    }

    productApi
      .updateProduct(currentProduct.id, formData)
      .then((response: any) => {
        setMessage("The product was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteProductById = () => {
    productApi
      .deleteProduct(currentProduct.id)
      .then((response: any) => {
        navigate("/products");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct.id ? (
        <div className="edit-form">
          <h4>Product</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                className="form-control"
                id="category"
                value={currentProduct.category?.id || ""}
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
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                value={currentProduct.stock}
                onChange={handleInputChange}
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button className="btn btn-danger ml-2" onClick={deleteProductById}>
              Delete
            </button>
            <p>{message}</p>
          </form>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
  );
};

export default Product;