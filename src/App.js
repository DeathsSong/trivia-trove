// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import DifficultyPage from './components/DifficultyPage';
import QuestionPage from './components/QuestionPage';
import CompletionPage from './components/CompletionPage'; // Import the completion page component

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/questions/:categoryId" element={<DifficultyPage />} />
          <Route path="/questions/:categoryId/:difficulty" element={<QuestionPage />} />
          <Route path="/questions/:categoryId/:difficulty/complete" element={<CompletionPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

