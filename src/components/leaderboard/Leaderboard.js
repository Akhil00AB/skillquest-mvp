import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchLeaderboardBySkill } from '../../services/api/mockApi';
import { useAuth } from '../../contexts/AuthContext';

const Leaderboard = () => {
  const { userProfile } = useAuth();
  const [activeSkill, setActiveSkill] = useState('problem-solving');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const skillOptions = [
    { id: 'problem-solving', label: 'Problem Solving' },
    { id: 'critical-thinking', label: 'Critical Thinking' },
    { id: 'creativity', label: 'Creativity' },
    { id: 'endurance', label: 'Endurance' }
  ];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await fetchLeaderboardBySkill(activeSkill);
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeSkill]);

  // Check if the current user is on the leaderboard
  const userRank = leaderboardData.findIndex(entry => entry.studentId === userProfile?.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-display font-bold text-primary-700 mb-6">Skill Leaderboards</h2>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {skillOptions.map(skill => (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeSkill === skill.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {skill.label}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="bg-primary-50 p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold text-primary-700">
              {skillOptions.find(skill => skill.id === activeSkill)?.label} Leaderboard
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((entry, index) => (
                  <motion.tr 
                    key={entry.studentId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={entry.studentId === userProfile?.id ? 'bg-primary-50' : ''}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          entry.rank === 3 ? 'bg-amber-100 text-amber-800' :
                          'bg-white text-gray-500'
                        }`}>
                          {entry.rank}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                          {/* This would be a student avatar in a real app */}
                          <div className="h-full w-full flex items-center justify-center text-gray-500">
                            {entry.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {entry.name}
                            {entry.studentId === userProfile?.id && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{entry.score}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${entry.score}%` }}></div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {userRank === -1 && userProfile && (
            <div className="bg-gray-50 p-4 rounded-b-lg text-center">
              <p className="text-gray-600">
                You're not on this leaderboard yet. Complete more quizzes and activities to earn your rank!
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Leaderboard;
