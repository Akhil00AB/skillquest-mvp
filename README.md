# SkillQuest MVP

A gamified EdTech platform that transforms students' day-to-day routines into an exciting, game-inspired journey of discovery.

## Project Overview

SkillQuest helps middle school students (grades 7-9) discover their hidden strengths and talents through:
- Personalized student profiles
- Application-based quizzes aligned to syllabus
- Skill discovery and ranking
- Interactive dashboards with progress visualization
- Gamified rewards and notifications

## Tech Stack

- **Frontend**: React with Vibe components, Tailwind CSS
- **Backend**: Node.js/Express REST APIs
- **Database**: Firebase Firestore
- **Authentication**: JWT-based login
- **Animations**: Framer Motion

## Key Features (MVP)

1. **User Profiles & Data Store**
   - Student information management
   - Academic score tracking
   - Physical activity logging

2. **Adaptive Quiz Engine**
   - Syllabus-aligned questions
   - Auto-grading and proficiency scoring

3. **Skill Discovery & Ranking**
   - Composite skill indices
   - Leaderboards by skill domain

4. **Interactive Dashboard**
   - Progress visualization
   - Gamified badges for achievements

5. **Admin Panel**
   - Quiz template management
   - Performance report generation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Project Structure

```
skillquest-mvp/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── leaderboard/
│   │   ├── profile/
│   │   ├── quiz/
│   │   └── admin/
│   ├── contexts/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   │   ├── api/
│   │   └── firebase/
│   ├── store/
│   ├── styles/
│   └── utils/
```

## Development Milestones

- **M1**: Data & Quiz Core
- **M2**: Scoring & Ranking
- **M3**: Dashboard UI
- **M4**: Admin Panel & Export
- **M5**: QA & Deployment
