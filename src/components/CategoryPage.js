//CategoryPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Render an error message or handle the error as needed
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Choose a Category</h2>
      {categories === null ? (
        <p>Loading categories...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/questions/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;
