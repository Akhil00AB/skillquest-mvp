// Mock data for development purposes

// Mock Student Profiles
export const mockStudents = [
  {
    id: 'student1',
    name: 'Alex Johnson',
    grade: '7',
    section: 'A',
    email: 'alex.j@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    joinedDate: '2024-09-01'
  },
  {
    id: 'student2',
    name: 'Jamie Smith',
    grade: '8',
    section: 'B',
    email: 'jamie.s@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    joinedDate: '2024-09-01'
  },
  {
    id: 'student3',
    name: 'Taylor Wilson',
    grade: '9',
    section: 'A',
    email: 'taylor.w@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    joinedDate: '2024-09-01'
  }
];

// Mock Academic Scores
export const mockAcademicScores = {
  'student1': [
    { id: 'score1', topic: 'Algebraic Expressions', score: 85, date: '2024-09-15' },
    { id: 'score2', topic: 'Linear Equations', score: 92, date: '2024-09-22' },
    { id: 'score3', topic: 'Inequalities', score: 78, date: '2024-09-29' }
  ],
  'student2': [
    { id: 'score4', topic: 'Algebraic Expressions', score: 90, date: '2024-09-15' },
    { id: 'score5', topic: 'Linear Equations', score: 88, date: '2024-09-22' },
    { id: 'score6', topic: 'Inequalities', score: 95, date: '2024-09-29' }
  ],
  'student3': [
    { id: 'score7', topic: 'Algebraic Expressions', score: 75, date: '2024-09-15' },
    { id: 'score8', topic: 'Linear Equations', score: 82, date: '2024-09-22' },
    { id: 'score9', topic: 'Inequalities', score: 88, date: '2024-09-29' }
  ]
};

// Mock Physical Activities
export const mockPhysicalActivities = {
  'student1': [
    { id: 'activity1', type: 'Basketball', duration: 60, date: '2024-09-14' },
    { id: 'activity2', type: 'Swimming', duration: 45, date: '2024-09-21' },
    { id: 'activity3', type: 'Running', duration: 30, date: '2024-09-28' }
  ],
  'student2': [
    { id: 'activity4', type: 'Soccer', duration: 90, date: '2024-09-14' },
    { id: 'activity5', type: 'Tennis', duration: 60, date: '2024-09-21' },
    { id: 'activity6', type: 'Cycling', duration: 45, date: '2024-09-28' }
  ],
  'student3': [
    { id: 'activity7', type: 'Volleyball', duration: 75, date: '2024-09-14' },
    { id: 'activity8', type: 'Yoga', duration: 60, date: '2024-09-21' },
    { id: 'activity9', type: 'Swimming', duration: 45, date: '2024-09-28' }
  ]
};

// Mock Quizzes
export const mockQuizzes = [
  {
    id: 'quiz1',
    title: 'Algebraic Expressions',
    subject: 'Algebra',
    gradeLevel: '7',
    description: 'Test your knowledge of algebraic expressions and operations',
    timeLimit: 20, // in minutes
    questions: [
      {
        id: 'q1',
        text: 'Simplify the expression: 3(x + 2) - 2(x - 1)',
        options: [
          { id: 'a', text: 'x + 8' },
          { id: 'b', text: 'x + 4' },
          { id: 'c', text: '5x + 4' },
          { id: 'd', text: '5x + 8' }
        ],
        correctOptionId: 'a'
      },
      {
        id: 'q2',
        text: 'If x = 3, what is the value of 2x² - 5x + 1?',
        options: [
          { id: 'a', text: '4' },
          { id: 'b', text: '10' },
          { id: 'c', text: '7' },
          { id: 'd', text: '13' }
        ],
        correctOptionId: 'a'
      },
      {
        id: 'q3',
        text: 'Factor the expression: x² - 9',
        options: [
          { id: 'a', text: '(x - 3)(x - 3)' },
          { id: 'b', text: '(x - 3)(x + 3)' },
          { id: 'c', text: '(x + 9)(x - 1)' },
          { id: 'd', text: '(x - 9)(x + 1)' }
        ],
        correctOptionId: 'b'
      }
    ]
  },
  {
    id: 'quiz2',
    title: 'Linear Equations',
    subject: 'Algebra',
    gradeLevel: '8',
    description: 'Test your understanding of linear equations and their applications',
    timeLimit: 25, // in minutes
    questions: [
      {
        id: 'q1',
        text: 'Solve for x: 2x + 5 = 13',
        options: [
          { id: 'a', text: 'x = 3' },
          { id: 'b', text: 'x = 4' },
          { id: 'c', text: 'x = 5' },
          { id: 'd', text: 'x = 6' }
        ],
        correctOptionId: 'b'
      },
      {
        id: 'q2',
        text: 'A train travels at a speed of 60 mph. How long will it take to travel 240 miles?',
        options: [
          { id: 'a', text: '3 hours' },
          { id: 'b', text: '4 hours' },
          { id: 'c', text: '5 hours' },
          { id: 'd', text: '6 hours' }
        ],
        correctOptionId: 'b'
      },
      {
        id: 'q3',
        text: 'What is the slope of the line passing through the points (2, 3) and (4, 7)?',
        options: [
          { id: 'a', text: '1' },
          { id: 'b', text: '2' },
          { id: 'c', text: '3' },
          { id: 'd', text: '4' }
        ],
        correctOptionId: 'b'
      }
    ]
  }
];

// Mock Skill Indices
export const mockSkillIndices = {
  'student1': [
    { skillType: 'problem-solving', score: 82 },
    { skillType: 'critical-thinking', score: 78 },
    { skillType: 'creativity', score: 90 },
    { skillType: 'endurance', score: 85 }
  ],
  'student2': [
    { skillType: 'problem-solving', score: 88 },
    { skillType: 'critical-thinking', score: 92 },
    { skillType: 'creativity', score: 75 },
    { skillType: 'endurance', score: 94 }
  ],
  'student3': [
    { skillType: 'problem-solving', score: 76 },
    { skillType: 'critical-thinking', score: 85 },
    { skillType: 'creativity', score: 95 },
    { skillType: 'endurance', score: 80 }
  ]
};

// Mock Leaderboards
export const mockLeaderboards = {
  'problem-solving': [
    { rank: 1, studentId: 'student2', name: 'Jamie Smith', score: 88 },
    { rank: 2, studentId: 'student1', name: 'Alex Johnson', score: 82 },
    { rank: 3, studentId: 'student3', name: 'Taylor Wilson', score: 76 }
  ],
  'critical-thinking': [
    { rank: 1, studentId: 'student2', name: 'Jamie Smith', score: 92 },
    { rank: 2, studentId: 'student3', name: 'Taylor Wilson', score: 85 },
    { rank: 3, studentId: 'student1', name: 'Alex Johnson', score: 78 }
  ],
  'creativity': [
    { rank: 1, studentId: 'student3', name: 'Taylor Wilson', score: 95 },
    { rank: 2, studentId: 'student1', name: 'Alex Johnson', score: 90 },
    { rank: 3, studentId: 'student2', name: 'Jamie Smith', score: 75 }
  ],
  'endurance': [
    { rank: 1, studentId: 'student2', name: 'Jamie Smith', score: 94 },
    { rank: 2, studentId: 'student1', name: 'Alex Johnson', score: 85 },
    { rank: 3, studentId: 'student3', name: 'Taylor Wilson', score: 80 }
  ]
};

// Mock Badges
export const mockBadges = {
  'student1': [
    { id: 'badge1', name: 'Math Whiz', description: 'Scored 90+ in Algebra', earnedDate: '2024-09-22' },
    { id: 'badge2', name: 'Team Player', description: 'Participated in 5 team activities', earnedDate: '2024-09-28' }
  ],
  'student2': [
    { id: 'badge3', name: 'Quiz Master', description: 'Completed 10 quizzes with 85%+ score', earnedDate: '2024-09-25' },
    { id: 'badge4', name: 'Endurance Champion', description: 'Maintained high activity levels for 3 weeks', earnedDate: '2024-09-30' }
  ],
  'student3': [
    { id: 'badge5', name: 'Creative Genius', description: 'Top creativity score in class', earnedDate: '2024-09-20' },
    { id: 'badge6', name: 'Quick Learner', description: 'Improved scores by 20% in 2 weeks', earnedDate: '2024-09-27' }
  ]
};
