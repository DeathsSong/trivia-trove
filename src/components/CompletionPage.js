// CompletionPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CompletionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score || 0;

  const questionResults = location.state?.questionResults || [];

  return (
    <div className="completion-page">
      <p className="completion-text">Congratulations!</p>
      <p className="score-summary">Your final score is: {score}/10</p>

      {questionResults.length > 0 && (
        <div>
          <p className="incorrect-questions-heading">
            {score === 10 ? "You got all the questions right!" : "Questions you got wrong:"}
          </p>
          <ul className="incorrect-questions-list">
            {questionResults
              .filter((result) => !result.isCorrect)
              .map((result, index) => (
                <li key={index} className="incorrect-question">
                  <p>
                    <strong>Question:</strong>{' '}
                    <span dangerouslySetInnerHTML={{ __html: result.question }} />
                  </p>
                  <p>
                    <strong>Your Answer:</strong>{' '}
                    <span dangerouslySetInnerHTML={{ __html: result.selectedAnswer }} />
                  </p>
                  <p>
                    <strong>Correct Answer:</strong>{' '}
                    <span dangerouslySetInnerHTML={{ __html: result.correctAnswer }} />
                  </p>
                </li>
              ))}
          </ul>
        </div>
      )}

      <button className="play-again-button" onClick={() => navigate('/')}>
        Play Again
      </button>
    </div>
  );
};

export default CompletionPage;

