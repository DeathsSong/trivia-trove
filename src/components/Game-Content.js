// GameContent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GameContent = () => {
  const { categoryId, difficulty } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 10,
            category: categoryId,
            difficulty: difficulty, // Use the difficulty parameter from the route
            type: 'multiple',
          },
        });

        setQuestions(response.data.results);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [categoryId, difficulty]);

  return (
    <div>
      <h2>Trivia Questions</h2>

      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameContent;

