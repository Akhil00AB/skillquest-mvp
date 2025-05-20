import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchQuizzes } from '../services/api/mockApi';
import { useAuth } from '../contexts/AuthContext';

const QuizList = () => {
  const { userProfile } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    subject: '',
    gradeLevel: userProfile?.grade || ''
  });

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      try {
        const quizData = await fetchQuizzes(filter.gradeLevel, filter.subject);
        setQuizzes(quizData);
      } catch (error) {
        console.error('Error loading quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, [filter]);

  const subjectOptions = ['', 'Algebra', 'Geometry', 'Science', 'History'];
  const gradeLevelOptions = ['', '7', '8', '9'];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900">Quizzes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Take subject-specific quizzes to test your knowledge and discover your strengths.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filter Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              value={filter.subject}
              onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Subjects</option>
              {subjectOptions.filter(s => s).map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade Level
            </label>
            <select
              value={filter.gradeLevel}
              onChange={(e) => setFilter({ ...filter, gradeLevel: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Grades</option>
              {gradeLevelOptions.filter(g => g).map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.length === 0 ? (
            <div className="col-span-full bg-gray-50 p-6 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-500 mb-2">No Quizzes Found</h3>
              <p className="text-gray-500">
                Try adjusting your filters to find available quizzes.
              </p>
            </div>
          ) : (
            quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-primary-600 h-2"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      Grade {quiz.gradeLevel}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4">{quiz.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {quiz.subject}
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {quiz.timeLimit} min
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {quiz.questions.length} questions
                    </div>
                  </div>
                  
                  <Link
                    to={`/quizzes/${quiz.id}`}
                    className="block w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md text-center transition-colors"
                  >
                    Start Quiz
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default QuizList;
