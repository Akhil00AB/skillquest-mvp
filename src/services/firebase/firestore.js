import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Student Profile Operations
export const createStudentProfile = async (userId, profileData) => {
  try {
    await setDoc(doc(db, 'students', userId), {
      ...profileData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const getStudentProfile = async (userId) => {
  try {
    const docRef = doc(db, 'students', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const updateStudentProfile = async (userId, profileData) => {
  try {
    const docRef = doc(db, 'students', userId);
    await updateDoc(docRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    throw error;
  }
};

// Academic Scores Operations
export const addAcademicScore = async (userId, scoreData) => {
  try {
    const scoresCollectionRef = collection(db, 'students', userId, 'academicScores');
    await addDoc(scoresCollectionRef, {
      ...scoreData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const getAcademicScores = async (userId) => {
  try {
    const scoresCollectionRef = collection(db, 'students', userId, 'academicScores');
    const querySnapshot = await getDocs(scoresCollectionRef);
    
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });
    
    return scores;
  } catch (error) {
    throw error;
  }
};

// Physical Activities Operations
export const addPhysicalActivity = async (userId, activityData) => {
  try {
    const activitiesCollectionRef = collection(db, 'students', userId, 'physicalActivities');
    await addDoc(activitiesCollectionRef, {
      ...activityData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const getPhysicalActivities = async (userId) => {
  try {
    const activitiesCollectionRef = collection(db, 'students', userId, 'physicalActivities');
    const querySnapshot = await getDocs(activitiesCollectionRef);
    
    const activities = [];
    querySnapshot.forEach((doc) => {
      activities.push({ id: doc.id, ...doc.data() });
    });
    
    return activities;
  } catch (error) {
    throw error;
  }
};

// Quiz Operations
export const getQuizzes = async (gradeLevel, subject) => {
  try {
    const quizzesRef = collection(db, 'quizzes');
    const q = query(
      quizzesRef, 
      where('gradeLevel', '==', gradeLevel),
      where('subject', '==', subject)
    );
    
    const querySnapshot = await getDocs(q);
    
    const quizzes = [];
    querySnapshot.forEach((doc) => {
      quizzes.push({ id: doc.id, ...doc.data() });
    });
    
    return quizzes;
  } catch (error) {
    throw error;
  }
};

export const getQuizById = async (quizId) => {
  try {
    const docRef = doc(db, 'quizzes', quizId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const submitQuizResults = async (userId, quizId, resultsData) => {
  try {
    const resultsCollectionRef = collection(db, 'quizResults');
    await addDoc(resultsCollectionRef, {
      userId,
      quizId,
      ...resultsData,
      submittedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    throw error;
  }
};

// Leaderboard Operations
export const getLeaderboardBySkill = async (skillType, limit = 10) => {
  try {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(
      leaderboardRef,
      where('skillType', '==', skillType),
      orderBy('score', 'desc'),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(q);
    
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push({ id: doc.id, ...doc.data() });
    });
    
    return leaderboard;
  } catch (error) {
    throw error;
  }
};
