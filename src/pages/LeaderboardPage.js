import React from 'react';
import Leaderboard from '../components/leaderboard/Leaderboard';

const LeaderboardPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900">Leaderboards</h1>
        <p className="mt-1 text-sm text-gray-500">
          See how you rank against your peers in different skill domains.
        </p>
      </div>
      
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
