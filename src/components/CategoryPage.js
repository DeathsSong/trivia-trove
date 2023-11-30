// CategoryPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const [categories, setCategories] = useState(null);

  // Define an array of category IDs to exclude
  const excludedCategoryIds = [25, 13, 19, 24, 30]; // Add the IDs you want to exclude

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();

        // Filter out the specified category IDs
        const filteredCategories = data.trivia_categories
          .filter(category => !excludedCategoryIds.includes(category.id))
          .map(category => ({
            id: category.id,
            name: category.name.replace(/^Entertainment: /, '') // Remove the "Entertainment: " prefix
          }));

        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Render an error message or handle the error as needed
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-grid">
      <h2 className="category-heading">Choose a Category</h2>
      {categories === null ? (
        <p>Loading categories...</p>
      ) : (
        <div className="category-buttons">
          {categories.map((category) => (
            <Link key={category.id} to={`/questions/${category.id}`} className="category-button">
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;