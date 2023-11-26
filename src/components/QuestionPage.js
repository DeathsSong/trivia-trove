// QuestionPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuestionPage = () => {
  const { categoryId, difficulty } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Clear selected answer for the next question
      setSelectedAnswer(null);
    } else {
      // Navigate to a completion page or handle as needed
      navigate(`/questions/${categoryId}/${difficulty}/complete`);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 10,
            category: categoryId,
            difficulty: difficulty,
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

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>Trivia Question</h2>

      {currentQuestion && (
        <div>
          <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

          <ul>
            {currentQuestion.incorrect_answers.map((answer, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={selectedAnswer !== null}
                >
                  {answer}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleAnswerSelect(currentQuestion.correct_answer)}
                disabled={selectedAnswer !== null}
              >
                {currentQuestion.correct_answer}
              </button>
            </li>
          </ul>

          <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
            Next Question
          </button>
        </div>
      )}

      {/* Display a message when all questions are answered */}
      {currentQuestionIndex >= questions.length - 1 && (
        <p>Congratulations! You've completed all questions.</p>
      )}
    </div>
  );
};

export default QuestionPage;
