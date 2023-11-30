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
  const [questionResults, setQuestionResults] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if (selectedAnswer === null && !loading) {
      setSelectedAnswer(answerText);
    }
  };
  
  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
  
    const result = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect,
    };
  
    setQuestionResults((prevResults) => [...prevResults, result]);
  
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      console.log('Score updated:', score + 1);
    }
  
    if (currentQuestionIndex === questions.length - 1) {
      console.log('Navigating to CompletionPage with score:', score + 1);
      console.log('Total Questions:', questions.length);
      navigate(`/questions/${categoryId}/${difficulty}/complete`, {
        state: { score: score + 1, questionResults },
      });
    } else {
      console.log('Moving to the next question...');
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    }
  };
  
  
  
  
  
  // Add the following useEffect to handle navigation
  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1) {
      console.log('Navigating to CompletionPage with score:', score);
      console.log('Total Questions:', questions.length);
      navigate(`/questions/${categoryId}/${difficulty}/complete`, {
        state: { score, questionResults },
      });
    }
  }, [currentQuestionIndex, questions.length, categoryId, difficulty, score, questionResults]);
  
  
  
  

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: 11, // Fetch 11 questions to include the dummy question
          category: categoryId,
          difficulty: difficulty,
        },
      });
  
      const combinedQuestions = response.data.results;
  
      const shuffledQuestions = shuffleAnswers(combinedQuestions);
  
      const questionsWithShuffledAnswers = shuffledQuestions.map((question) => {
        let answers;
  
        if (question.type === 'multiple') {
          answers = shuffleAnswers([...question.incorrect_answers, question.correct_answer]);
        } else if (question.type === 'boolean') {
          answers = shuffleAnswers(['True', 'False']);
        }
  
        return {
          ...question,
          answers: answers,
        };
      });
  
      setQuestions(questionsWithShuffledAnswers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  
  
  

  useEffect(() => {
    fetchQuestions();
  }, [categoryId, difficulty]);

  const currentQuestion = questions[currentQuestionIndex];

  const isCorrectAnswer = (answer) => {
    return answer === currentQuestion.correct_answer;
  };

  return (
    <div className="question-page">
      {loading && <p className="loading-dots"></p>}
  
      {!loading && currentQuestion && (
        <div>
          <p className="question-text" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
  
          {currentQuestion.type === 'multiple' && (
            <div className="answers-grid">
              {currentQuestion.answers && currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`answer-button ${
                    selectedAnswer === answer && !loading
                      ? isCorrectAnswer(answer)
                        ? 'selected-answer'
                        : 'incorrect-answer'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={selectedAnswer !== null || loading}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              ))}
            </div>
          )}
  
          {currentQuestion.type === 'boolean' && (
            <div className="boolean-answers">
              {currentQuestion.answers && currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`boolean-answer-button ${
                    selectedAnswer === answer && !loading
                      ? isCorrectAnswer(answer)
                        ? 'selected-answer'
                        : 'incorrect-answer'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={selectedAnswer !== null || loading}
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
