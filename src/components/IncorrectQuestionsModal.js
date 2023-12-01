// IncorrectQuestionsModal.js
import React from 'react';

const IncorrectQuestionsModal = ({ questionResults, onClose }) => (
  <div className="incorrect-questions-modal">
    <p className="incorrect-questions-heading">Questions you got wrong:</p>
    <ul className="incorrect-questions-list">
      {questionResults.map((result, index) => (
        <li key={index} className="incorrect-question">
          <p>
            <strong>Question:</strong> <span dangerouslySetInnerHTML={{ __html: result.question }} />
          </p>
          <p>
            <strong>Your Answer:</strong> <span dangerouslySetInnerHTML={{ __html: result.selectedAnswer }} />
          </p>
          <p>
            <strong>Correct Answer:</strong> <span dangerouslySetInnerHTML={{ __html: result.correctAnswer }} />
          </p>
        </li>
      ))}
    </ul>
    <button className="close-modal-button" onClick={onClose}>
      Close
    </button>
  </div>
);

export default IncorrectQuestionsModal;
