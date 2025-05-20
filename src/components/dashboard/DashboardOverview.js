import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  fetchAcademicScores, 
  fetchPhysicalActivities, 
  fetchStudentSkillIndices,
  fetchStudentBadges
} from '../../services/api/mockApi';
import { useAuth } from '../../contexts/AuthContext';

const DashboardOverview = () => {
  const { userProfile } = useAuth();
  const [academicScores, setAcademicScores] = useState([]);
  const [physicalActivities, setPhysicalActivities] = useState([]);
  const [skillIndices, setSkillIndices] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('progress');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userProfile?.id) return;
      
      setLoading(true);
      try {
        const [scores, activities, skills, badgeData] = await Promise.all([
          fetchAcademicScores(userProfile.id),
          fetchPhysicalActivities(userProfile.id),
          fetchStudentSkillIndices(userProfile.id),
          fetchStudentBadges(userProfile.id)
        ]);
        
        setAcademicScores(scores);
        setPhysicalActivities(activities);
        setSkillIndices(skills);
        setBadges(badgeData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [userProfile]);

  // Prepare data for academic vs. activity progress chart
  const prepareProgressData = () => {
    // Get all unique dates from both datasets
    const allDates = new Set([
      ...academicScores.map(score => score.date),
      ...physicalActivities.map(activity => activity.date)
    ]);
    
    // Sort dates chronologically
    const sortedDates = Array.from(allDates).sort();
    
    // Create data points for each date
    return sortedDates.map(date => {
      // Find academic scores for this date
      const scoreOnDate = academicScores.find(score => score.date === date);
      
      // Find physical activities for this date
      const activityOnDate = physicalActivities.find(activity => activity.date === date);
      
      return {
        date,
        academicScore: scoreOnDate ? scoreOnDate.score : null,
        activityDuration: activityOnDate ? activityOnDate.duration : null,
        topic: scoreOnDate ? scoreOnDate.topic : '',
        activityType: activityOnDate ? activityOnDate.type : ''
      };
    });
  };

  // Format skill indices for radar chart
  const formatSkillData = () => {
    return skillIndices.map(skill => ({
      subject: skill.skillType.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      score: skill.score,
      fullMark: 100
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-bold text-primary-700">Dashboard Overview</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'progress'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Progress
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'skills'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'badges'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Badges
          </button>
        </div>
      </div>
      
      {activeTab === 'progress' && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Academic vs. Activity Progress</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={prepareProgressData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name, props) => {
                    if (name === 'academicScore') {
                      return [`${value}%`, 'Academic Score'];
                    }
                    if (name === 'activityDuration') {
                      return [`${value} min`, 'Activity Duration'];
                    }
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="academicScore" 
                  name="Academic Score" 
                  stroke="#0ea5e9" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="activityDuration" 
                  name="Activity Duration" 
                  stroke="#8b5cf6" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-md font-semibold mb-3">Recent Academic Scores</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={academicScores.slice(-5)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" name="Score" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-3">Recent Physical Activities</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={physicalActivities.slice(-5)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" name="Duration (min)" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'skills' && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Skill Indices</h3>
          <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart outerRadius={150} data={formatSkillData()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar 
                  name="Skills" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.6} 
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-3">Skill Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillIndices.map((skill, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      {skill.skillType.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                    <span className="text-primary-700 font-bold">{skill.score}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600"
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'badges' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Earned Badges</h3>
          
          {badges.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-500 mb-2">No Badges Yet</h4>
              <p className="text-gray-500">
                Complete quizzes and activities to earn badges and showcase your achievements!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-primary-700 mb-2">{badge.name}</h4>
                  <p className="text-gray-600 mb-4">{badge.description}</p>
                  <span className="text-sm text-gray-500">Earned on {new Date(badge.earnedDate).toLocaleDateString()}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default DashboardOverview;
