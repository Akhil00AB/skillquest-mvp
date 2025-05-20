import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchQuizById, submitQuizResults } from '../../services/api/mockApi';
import { useAuth } from '../../contexts/AuthContext';

const QuizEngine = ({ quizId, onComplete }) => {
  const { userProfile } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStatus, setQuizStatus] = useState('loading'); // loading, active, completed
  const [quizResults, setQuizResults] = useState(null);
  const [error, setError] = useState('');

  // Fetch quiz data
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quizData = await fetchQuizById(quizId);
        setQuiz(quizData);
        setTimeRemaining(quizData.timeLimit * 60); // Convert minutes to seconds
        setQuizStatus('active');
      } catch (error) {
        console.error('Error loading quiz:', error);
        setError('Failed to load quiz. Please try again.');
        setQuizStatus('error');
      }
    };

    loadQuiz();
  }, [quizId]);

  // Timer countdown
  useEffect(() => {
    if (quizStatus !== 'active' || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStatus, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!userProfile?.id || !quiz) return;

    try {
      setQuizStatus('submitting');
      
      // Format answers for submission
      const answers = Object.keys(selectedOptions).map(questionId => ({
        questionId,
        selectedOptionId: selectedOptions[questionId]
      }));
      
      const results = await submitQuizResults(userProfile.id, quizId, answers);
      setQuizResults(results);
      setQuizStatus('completed');
      
      if (onComplete) {
        onComplete(results);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz. Please try again.');
      setQuizStatus('error');
    }
  };

  // Calculate progress percentage
  const progressPercentage = quiz 
    ? Math.round((Object.keys(selectedOptions).length / quiz.questions.length) * 100) 
    : 0;

  if (quizStatus === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (quizStatus === 'error') {
    return (
      <div className="bg-danger-50 text-danger-700 p-4 rounded-md">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (quizStatus === 'completed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-display font-bold text-primary-700 mb-4">Quiz Results</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{quiz.title}</h3>
            <span className="text-sm text-gray-500">
              Completed on {new Date().toLocaleDateString()}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-gray-500 text-sm">Score</p>
              <p className="text-3xl font-bold text-primary-600">{quizResults.score}%</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-gray-500 text-sm">Correct Answers</p>
              <p className="text-3xl font-bold text-primary-600">
                {quizResults.correctAnswers} / {quizResults.totalQuestions}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Performance Analysis</h4>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  quizResults.score >= 80 ? 'bg-success-500' : 
                  quizResults.score >= 60 ? 'bg-warning-500' : 'bg-danger-500'
                }`}
                style={{ width: `${quizResults.score}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-sm text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-bold text-primary-700">{quiz.title}</h2>
        <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full font-medium">
          Time: {formatTime(timeRemaining)}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {progressPercentage}% Complete
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <div 
                key={option.id}
                onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedOptions[currentQuestion.id] === option.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    selectedOptions[currentQuestion.id] === option.id
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-400'
                  }`}>
                    {selectedOptions[currentQuestion.id] === option.id && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span>{option.text}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-between">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentQuestionIndex === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={quizStatus === 'submitting'}
            className={`px-6 py-2 text-white rounded-md transition-colors ${
              quizStatus === 'submitting'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-success-500 hover:bg-success-700'
            }`}
          >
            {quizStatus === 'submitting' ? 'Submitting...' : 'Submit Quiz'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizEngine;
