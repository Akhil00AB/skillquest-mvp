// For the MVP, we'll use mock Firebase services instead of connecting to a real Firebase project
// This avoids the need for actual Firebase credentials

// Mock Firebase app
const app = {
  name: "SkillQuest-MVP",
  options: {
    apiKey: "mock-api-key",
    authDomain: "mock-auth-domain",
    projectId: "skillquest-mvp",
  }
};

// Mock Firestore database
const db = {
  collection: (collectionPath) => ({
    doc: (docId) => ({
      get: async () => ({
        exists: () => true,
        data: () => ({}),
        id: docId
      }),
      set: async () => true,
      update: async () => true
    }),
    add: async () => ({ id: `mock-doc-${Date.now()}` }),
    where: () => ({
      orderBy: () => ({
        limit: () => ({
          get: async () => ({
            docs: [],
            forEach: (callback) => {}
          })
        })
      })
    })
  })
};

// Mock Auth service
const auth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    // Simulate a signed-in user after a short delay
    setTimeout(() => {
      const mockUser = {
        uid: 'student1',
        email: 'alex.j@example.com',
        displayName: 'Alex Johnson'
      };
      callback(mockUser);
    }, 1000);
    
    // Return an unsubscribe function
    return () => {};
  }
};

export { app, db, auth };
