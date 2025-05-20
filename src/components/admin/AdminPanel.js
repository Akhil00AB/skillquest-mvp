import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchQuizzes } from '../../services/api/mockApi';
import { mockStudents, mockAcademicScores, mockSkillIndices } from '../../services/api/mockData';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [reportType, setReportType] = useState('academic');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      try {
        const quizData = await fetchQuizzes();
        setQuizzes(quizData);
      } catch (error) {
        console.error('Error loading quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const handleCreateQuiz = () => {
    setSelectedQuiz({
      title: '',
      subject: '',
      gradeLevel: '',
      description: '',
      timeLimit: 20,
      questions: []
    });
    setIsEditingQuiz(true);
  };

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsEditingQuiz(true);
  };

  const handleSaveQuiz = () => {
    // In a real app, this would save to the database
    alert('Quiz saved successfully!');
    setIsEditingQuiz(false);
    setSelectedQuiz(null);
  };

  const handleAddQuestion = () => {
    if (!selectedQuiz) return;

    const newQuestion = {
      id: `q${Date.now()}`,
      text: '',
      options: [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' }
      ],
      correctOptionId: 'a'
    };

    setSelectedQuiz({
      ...selectedQuiz,
      questions: [...selectedQuiz.questions, newQuestion]
    });
  };

  const handleQuestionChange = (questionId, field, value) => {
    if (!selectedQuiz) return;

    const updatedQuestions = selectedQuiz.questions.map(q => {
      if (q.id === questionId) {
        return { ...q, [field]: value };
      }
      return q;
    });

    setSelectedQuiz({
      ...selectedQuiz,
      questions: updatedQuestions
    });
  };

  const handleOptionChange = (questionId, optionId, value) => {
    if (!selectedQuiz) return;

    const updatedQuestions = selectedQuiz.questions.map(q => {
      if (q.id === questionId) {
        const updatedOptions = q.options.map(opt => {
          if (opt.id === optionId) {
            return { ...opt, text: value };
          }
          return opt;
        });
        return { ...q, options: updatedOptions };
      }
      return q;
    });

    setSelectedQuiz({
      ...selectedQuiz,
      questions: updatedQuestions
    });
  };

  const handleCorrectOptionChange = (questionId, optionId) => {
    if (!selectedQuiz) return;

    const updatedQuestions = selectedQuiz.questions.map(q => {
      if (q.id === questionId) {
        return { ...q, correctOptionId: optionId };
      }
      return q;
    });

    setSelectedQuiz({
      ...selectedQuiz,
      questions: updatedQuestions
    });
  };

  const handleExportReport = () => {
    // In a real app, this would generate and download a report
    // For demo purposes, we'll just show an alert
    alert(`Exporting ${reportType} report in ${exportFormat.toUpperCase()} format for Grade ${selectedGrade || 'All'}, Section ${selectedSection || 'All'}`);
  };

  // Filter students based on selected grade and section
  const filteredStudents = mockStudents.filter(student => {
    if (selectedGrade && student.grade !== selectedGrade) return false;
    if (selectedSection && student.section !== selectedSection) return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-display font-bold text-primary-700 mb-6">Admin Panel</h2>
      
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'quizzes'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Quiz Templates
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'reports'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Reports
          </button>
        </div>
      </div>
      
      {activeTab === 'quizzes' && !isEditingQuiz && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Quiz Templates</h3>
            <button
              onClick={handleCreateQuiz}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Create New Quiz
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Questions
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Limit
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quizzes.map((quiz) => (
                    <tr key={quiz.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{quiz.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{quiz.gradeLevel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{quiz.questions.length}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{quiz.timeLimit} min</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditQuiz(quiz)}
                          className="text-primary-600 hover:text-primary-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          className="text-danger-600 hover:text-danger-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'quizzes' && isEditingQuiz && selectedQuiz && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">
              {selectedQuiz.id ? 'Edit Quiz' : 'Create New Quiz'}
            </h3>
            <button
              onClick={() => {
                setIsEditingQuiz(false);
                setSelectedQuiz(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title
              </label>
              <input
                type="text"
                value={selectedQuiz.title}
                onChange={(e) => setSelectedQuiz({ ...selectedQuiz, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter quiz title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={selectedQuiz.subject}
                onChange={(e) => setSelectedQuiz({ ...selectedQuiz, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter subject"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade Level
              </label>
              <select
                value={selectedQuiz.gradeLevel}
                onChange={(e) => setSelectedQuiz({ ...selectedQuiz, gradeLevel: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Grade</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                value={selectedQuiz.timeLimit}
                onChange={(e) => setSelectedQuiz({ ...selectedQuiz, timeLimit: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="1"
                max="120"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={selectedQuiz.description}
                onChange={(e) => setSelectedQuiz({ ...selectedQuiz, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows="3"
                placeholder="Enter quiz description"
              ></textarea>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Questions</h4>
              <button
                onClick={handleAddQuestion}
                className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
              >
                Add Question
              </button>
            </div>
            
            {selectedQuiz.questions.length === 0 ? (
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-500">No questions added yet. Click "Add Question" to get started.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {selectedQuiz.questions.map((question, qIndex) => (
                  <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question {qIndex + 1}
                      </label>
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter question text"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Options
                      </label>
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <div key={option.id} className="flex items-center">
                            <input
                              type="radio"
                              id={`${question.id}-${option.id}`}
                              name={`correct-${question.id}`}
                              checked={question.correctOptionId === option.id}
                              onChange={() => handleCorrectOptionChange(question.id, option.id)}
                              className="mr-2"
                            />
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              placeholder={`Option ${option.id.toUpperCase()}`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Select the radio button next to the correct answer.</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSaveQuiz}
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Save Quiz
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'reports' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Generate Reports</h3>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="academic">Academic Performance</option>
                  <option value="activity">Physical Activity</option>
                  <option value="skills">Skill Indices</option>
                  <option value="comprehensive">Comprehensive Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Export Format
                </label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade (Optional)
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Grades</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section (Optional)
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleExportReport}
                className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
          
          <h4 className="font-medium mb-3">Preview ({filteredStudents.length} students)</h4>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                  {reportType === 'academic' && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg. Score
                    </th>
                  )}
                  {reportType === 'skills' && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Top Skill
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  // Calculate average academic score
                  const scores = mockAcademicScores[student.id] || [];
                  const avgScore = scores.length > 0
                    ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length)
                    : 'N/A';
                  
                  // Get top skill
                  const skills = mockSkillIndices[student.id] || [];
                  const topSkill = skills.length > 0
                    ? skills.reduce((prev, current) => (prev.score > current.score) ? prev : current)
                    : null;
                  
                  return (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.grade}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.section}</div>
                      </td>
                      {reportType === 'academic' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{avgScore !== 'N/A' ? `${avgScore}%` : avgScore}</div>
                        </td>
                      )}
                      {reportType === 'skills' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {topSkill
                              ? `${topSkill.skillType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} (${topSkill.score}%)`
                              : 'N/A'
                            }
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminPanel;
