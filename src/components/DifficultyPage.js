// DifficultyPage.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DifficultyPage = () => {
  const { categoryId } = useParams();

  return (
    <div className="category-grid difficulty-grid">
      <h2 className="category-heading">Select Difficulty</h2>
      <div className="category-buttons difficulty-buttons">
        <Link to={`/trivia-trove/questions/${categoryId}/easy`} className="category-button">
          Easy
        </Link>
        <Link to={`/trivia-trove/questions/${categoryId}/medium`} className="category-button">
          Medium
        </Link>
        <Link to={`/trivia-trove/questions/${categoryId}/hard`} className="category-button">
          Hard
        </Link>
      </div>
    </div>
  );
};

export default DifficultyPage;
