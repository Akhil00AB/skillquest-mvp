import { 
  mockStudents, 
  mockAcademicScores, 
  mockPhysicalActivities, 
  mockQuizzes, 
  mockSkillIndices, 
  mockLeaderboards,
  mockBadges
} from './mockData';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Student Profile API
export const fetchStudentProfile = async (studentId) => {
  await delay(500);
  const student = mockStudents.find(s => s.id === studentId);
  
  if (!student) {
    throw new Error('Student not found');
  }
  
  return student;
};

export const createStudentProfile = async (profileData) => {
  await delay(700);
  const newId = `student${mockStudents.length + 1}`;
  const newStudent = {
    id: newId,
    ...profileData,
    joinedDate: new Date().toISOString().split('T')[0]
  };
  
  // In a real app, we would add this to the database
  // mockStudents.push(newStudent);
  
  return newStudent;
};

export const updateStudentProfile = async (studentId, profileData) => {
  await delay(600);
  const studentIndex = mockStudents.findIndex(s => s.id === studentId);
  
  if (studentIndex === -1) {
    throw new Error('Student not found');
  }
  
  // In a real app, we would update the database
  const updatedStudent = {
    ...mockStudents[studentIndex],
    ...profileData
  };
  
  return updatedStudent;
};

// Academic Scores API
export const fetchAcademicScores = async (studentId) => {
  await delay(500);
  const scores = mockAcademicScores[studentId];
  
  if (!scores) {
    return [];
  }
  
  return scores;
};

export const addAcademicScore = async (studentId, scoreData) => {
  await delay(600);
  const newScore = {
    id: `score${Date.now()}`,
    ...scoreData,
    date: new Date().toISOString().split('T')[0]
  };
  
  // In a real app, we would add this to the database
  
  return newScore;
};

// Physical Activities API
export const fetchPhysicalActivities = async (studentId) => {
  await delay(500);
  const activities = mockPhysicalActivities[studentId];
  
  if (!activities) {
    return [];
  }
  
  return activities;
};

export const addPhysicalActivity = async (studentId, activityData) => {
  await delay(600);
  const newActivity = {
    id: `activity${Date.now()}`,
    ...activityData,
    date: new Date().toISOString().split('T')[0]
  };
  
  // In a real app, we would add this to the database
  
  return newActivity;
};

// Quiz API
export const fetchQuizzes = async (gradeLevel, subject) => {
  await delay(700);
  let filteredQuizzes = [...mockQuizzes];
  
  if (gradeLevel) {
    filteredQuizzes = filteredQuizzes.filter(q => q.gradeLevel === gradeLevel);
  }
  
  if (subject) {
    filteredQuizzes = filteredQuizzes.filter(q => q.subject === subject);
  }
  
  return filteredQuizzes;
};

export const fetchQuizById = async (quizId) => {
  await delay(500);
  const quiz = mockQuizzes.find(q => q.id === quizId);
  
  if (!quiz) {
    throw new Error('Quiz not found');
  }
  
  return quiz;
};

export const submitQuizResults = async (studentId, quizId, answers) => {
  await delay(800);
  const quiz = mockQuizzes.find(q => q.id === quizId);
  
  if (!quiz) {
    throw new Error('Quiz not found');
  }
  
  // Calculate score
  let correctCount = 0;
  
  quiz.questions.forEach(question => {
    const userAnswer = answers.find(a => a.questionId === question.id);
    if (userAnswer && userAnswer.selectedOptionId === question.correctOptionId) {
      correctCount++;
    }
  });
  
  const score = Math.round((correctCount / quiz.questions.length) * 100);
  
  const result = {
    studentId,
    quizId,
    score,
    totalQuestions: quiz.questions.length,
    correctAnswers: correctCount,
    submittedAt: new Date().toISOString()
  };
  
  // In a real app, we would save this to the database
  
  return result;
};

// Skill Indices API
export const fetchStudentSkillIndices = async (studentId) => {
  await delay(600);
  const skillIndices = mockSkillIndices[studentId];
  
  if (!skillIndices) {
    return [];
  }
  
  return skillIndices;
};

// Leaderboard API
export const fetchLeaderboardBySkill = async (skillType) => {
  await delay(700);
  const leaderboard = mockLeaderboards[skillType];
  
  if (!leaderboard) {
    return [];
  }
  
  return leaderboard;
};

// Badges API
export const fetchStudentBadges = async (studentId) => {
  await delay(500);
  const badges = mockBadges[studentId];
  
  if (!badges) {
    return [];
  }
  
  return badges;
};
