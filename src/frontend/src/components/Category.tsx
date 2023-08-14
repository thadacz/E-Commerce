import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../services/category.service";
import ICategoryData from "../types/category.type";

const Category: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialCategoryState = {
    name: "",
  };
  const [currentCategory, setCurrentCategory] =
    useState<ICategoryData>(initialCategoryState);
  const [message, setMessage] = useState<string>("");

  const getCategory = (id: number) => {
    getCategoryById(id)
      .then((response: any) => {
        setCurrentCategory(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getCategory(Number(id));
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const updateCategoryById = () => {
    updateCategory(currentCategory.id, currentCategory)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The category was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteCategoryById = () => {
    deleteCategory(currentCategory.id)
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
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCategory.name}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={updateCategoryById}
          >
            Update
          </button>
          <button className="btn btn-danger ml-2" onClick={deleteCategoryById}>
            Delete
          </button>
          <p>{message}</p>
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
