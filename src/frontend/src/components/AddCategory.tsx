import React, { useState, ChangeEvent } from "react";
import ICategory from "../types/category.type"; 
import categoryApi from "../services/category.service";

const AddCategory: React.FC = () => {
  const initialCategoryState = {
    name: "",
  };
  const [category, setCategory] = useState<ICategory>(initialCategoryState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const saveCategory = () => {
    var data = {
      name: category.name,
    };

    categoryApi.addCategory(data)
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
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={category.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <button onClick={saveCategory} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
