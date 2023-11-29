// CompletionPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CompletionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the score from the location state or default to 0
  const score = location.state?.score || 0;

  return (
    <div>
      <h2>Congratulations!</h2>
      <p>You've completed all questions.</p>
      <p>Your Total Score: {score}/10</p>
      {/* You can add more content or customization as needed */}
      {/* Add a button to restart the game or navigate to home */}
      <button onClick={() => navigate('/')}>Restart</button>
    </div>
  );
};

export default CompletionPage;
