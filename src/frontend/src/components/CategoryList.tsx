import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import ICategoryData from "../types/category.type"; // Załóżmy, że jest taki typ
import { getAllCategories, findByName } from "../services/category.service"; // Załóżmy, że jest taka usługa

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Array<ICategoryData>>([]);
  const [currentCategory, setCurrentCategory] = useState<ICategoryData | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    retrieveCategories();
  }, []);

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCategories = () => {
    getAllCategories()
      .then((response: any) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCategories();
    setCurrentCategory(null);
    setCurrentIndex(-1);
  };

  const setActiveCategory = (category: ICategoryData, index: number) => {
    setCurrentCategory(category);
    setCurrentIndex(index);
  };

  const findByNameContaining = () => {
    findByName(searchName)
      .then((response: any) => {
        setCategories(response.data);
        setCurrentCategory(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNameContaining}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Categories List</h4>

        <ul className="list-group">
          {categories &&
            categories.map((category, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCategory(category, index)}
                key={index}
              >
                {category.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentCategory ? (
          <div>
            <h4>Category</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCategory.name}
            </div>

            {/* Dodaj dowolne inne informacje o kategorii, jeśli są dostępne */}

            <Link
              to={"/categories/" + currentCategory.id}
              className="btn btn-success"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Category...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
