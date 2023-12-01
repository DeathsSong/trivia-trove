// CompletionPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const IncorrectQuestionsModal = ({ questionResults, onClose }) => (
  <div className="incorrect-questions-modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <p className="modal-heading">
        Questions you got wrong:
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
  </div>
);

const CompletionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score || 0;
  const questionResults = location.state?.questionResults || [];
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  

  return (
    <div className="completion-page">
  <div className="content-container">
    <div className="information-container">
      <p className="completion-text">Congratulations!</p>
      <p className="score-summary">Your final score is: {score}/10</p>
      {score === 10 ? (
        <p className="incorrect-questions-heading">You got all the questions right!</p>
      ) : null}

      {score !== 10 && (
        <button className="show-modal-button" onClick={handleModalToggle}>
          Show Incorrect Questions
        </button>
      )}
    </div>
  </div>

      <button className="play-again-button" onClick={() => navigate('/')}>
        Play Again
      </button>

      {showModal && (
        <IncorrectQuestionsModal
          questionResults={questionResults}
          onClose={handleModalToggle}
        />
      )}
    </div>
  );
};

export default CompletionPage;
