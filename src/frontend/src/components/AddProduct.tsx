import React, { useState, ChangeEvent, useEffect } from "react";
import { addProduct } from "../services/product.service";
import IProduct from "../types/product.type";
import { uploadFile } from "../services/blob.service";
import { getCategoriesNames } from "../services/category.service";
import Category from "../types/category.type";

const AddProduct: React.FC = () => {
  const initialProductState = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "", // Zmiana nazwy zmiennej
    category: { id: "" },
  };

  const [product, setProduct] = useState<IProduct>(initialProductState);
  const [categoryNames, setCategoryNames] = useState<Category[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    getCategoriesNames()
      .then((response: any) => {
        setCategoryNames(response.data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      if (files && files.length > 0) {
        setImageUrl(URL.createObjectURL(files[0]));
        setProduct({ ...product, imageUrl: files[0] }); // Zmiana nazwy zmiennej
      } else {
        setImageUrl("");
        setProduct({ ...product, imageUrl: "" }); // Zmiana nazwy zmiennej
      }
    } else {
      setProduct({ ...product, [name]: value });
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
    const { name, description, price, stock, imageUrl, category } = product; // Zmiana nazwy zmiennej

    if (imageUrl instanceof File) {
      uploadFile(imageUrl)
        .then((uploadResponse: any) => {
          const uploadedImageUrl = uploadResponse.data.url;
          const data = {
            name,
            description,
            imageUrl: uploadedImageUrl,
            price,
            stock,
            category,
          };

          addProduct(data)
            .then((response: any) => {
              setProduct({
                ...product,
                imageUrl: uploadedImageUrl, // Zmiana nazwy zmiennej
                name: response.data.name,
                description: response.data.description,
                price: response.data.price,
                stock: response.data.stock,
                category: response.data.category, // Assuming the API returns the created category object
              });
              setImageUrl("");
              setSubmitted(true);
              console.log(response.data);
            })
            .catch((e: Error) => {
              console.log(e);
            });
        })
        .catch((uploadError: Error) => {
          console.log(uploadError);
        });
    } else {
      const data = { name, description, price, stock, category };

      addProduct(data)
        .then((response: any) => {
          setProduct({
            name: response.data.name,
            description: response.data.description,
            price: response.data.price,
            stock: response.data.stock,
            imageUrl, // Zmiana nazwy zmiennej
            category: response.data.category,
          });
          setImageUrl("");
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
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
          {imageUrl && <img src={imageUrl} alt="Product" />} {}
          <button className="btn btn-success" onClick={newProduct}>
            Add
          </button>
        </div>
      ) : (
        <div>
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
            <input
              type="text"
              className="form-control"
              id="description"
              required
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
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleInputChange}
              name="image"
            />
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

          <button onClick={saveProduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
