// QuestionPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuestionPage = () => {
  const { categoryId, difficulty } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  const shuffleAnswers = (answers) => {
    const shuffledAnswers = [...answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    return shuffledAnswers;
  };

  const handleAnswerSelect = (answerText) => {
    setSelectedAnswer(answerText);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
      console.log('Score updated:', score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      console.log('Navigating to CompletionPage with score:', score + 1);
      navigate(`/questions/${categoryId}/${difficulty}/complete`, { state: { score: score + 1 } });
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchQuestions = async () => {
    try {
      // Make the first API call for true/false questions
      const trueFalseResponse = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: 5,
          category: categoryId,
          difficulty: difficulty,
          type: 'boolean',
        },
      });
  
      // Wait for a delay (e.g., 5 seconds)
      await delay(5000);
  
      // Make the second API call for multiple-choice questions
      const multipleChoiceResponse = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: 5,
          category: categoryId,
          difficulty: difficulty,
          type: 'multiple',
        },
      });
  
      // Combine the results into a single array
      const combinedQuestions = [
        ...trueFalseResponse.data.results,
        ...multipleChoiceResponse.data.results,
      ];
  
      // Shuffle the combined array
      const shuffledQuestions = shuffleAnswers(combinedQuestions);
  
      // Shuffle the answers for each question
      const questionsWithShuffledAnswers = shuffledQuestions.map((question) => ({
        ...question,
        answers: shuffleAnswers([...question.incorrect_answers, question.correct_answer]),
      }));
  
      setQuestions(questionsWithShuffledAnswers);
      setLoading(false); // Set loading to false once questions are fetched
    } catch (error) {
      // console.error('Error fetching questions:', error);
    }
  };
  

  useEffect(() => {
    fetchQuestions();
  }, [categoryId, difficulty]);

  const currentQuestion = questions[currentQuestionIndex];

  console.log('Current Score:', score);

  return (
    <div className="question-page">
      {loading && (
  <p className="loading-dots"></p>
)}

      {!loading && currentQuestion && (
        <div>
          <p className="question-text" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

          {currentQuestion.type === 'multiple' && (
            <div className="answers-grid">
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  className="answer-button"
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={selectedAnswer !== null}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              ))}
            </div>
          )}

{currentQuestion.type === 'boolean' && (
  <div className="boolean-answers">
    {currentQuestion.answers.map((answer, index) => (
      <button
        key={index}
        className="boolean-answer-button"
        onClick={() => handleAnswerSelect(answer)}
        disabled={selectedAnswer !== null}
      >
        {answer}
      </button>
    ))}
  </div>
)}

<p className="score">Score: {score}/10</p>
<div className="button-container">
  <button className="next-button" onClick={handleNextQuestion} disabled={selectedAnswer === null}>
    Next Question
  </button>
</div>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;