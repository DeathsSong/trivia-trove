// DifficultyPage.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DifficultyPage = () => {
  const { categoryId } = useParams();

  return (
    <div>
      <h2>Select Difficulty</h2>
      <ul>
        <li><Link to={`/questions/${categoryId}/easy`}>Easy</Link></li>
        <li><Link to={`/questions/${categoryId}/medium`}>Medium</Link></li>
        <li><Link to={`/questions/${categoryId}/hard`}>Hard</Link></li>
      </ul>
    </div>
  );
};

export default DifficultyPage;
