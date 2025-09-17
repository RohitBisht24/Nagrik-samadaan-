import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Award, Star, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const leaderboardData = [
  { 
    id: 1, 
    rank: 1, 
    name: 'Rajesh Kumar', 
    points: 2850, 
    reports: 45, 
    resolved: 42, 
    avatar: null,
    badge: 'Community Champion',
    streak: 15
  },
  { 
    id: 2, 
    rank: 2, 
    name: 'Anita Sharma', 
    points: 2640, 
    reports: 38, 
    resolved: 36, 
    avatar: null,
    badge: 'Street Guardian',
    streak: 12
  },
  { 
    id: 3, 
    rank: 3, 
    name: 'Mohammad Ali', 
    points: 2420, 
    reports: 35, 
    resolved: 33, 
    avatar: null,
    badge: 'City Helper',
    streak: 8
  },
  { 
    id: 4, 
    rank: 42, 
    name: 'Priya Sharma (You)', 
    points: 1250, 
    reports: 23, 
    resolved: 18, 
    avatar: null,
    badge: 'Rising Star',
    streak: 5,
    isCurrentUser: true
  }
];

const weeklyData = [
  { id: 1, rank: 1, name: 'Sunita Patel', points: 340, reports: 8, resolved: 7, avatar: null },
  { id: 2, rank: 2, name: 'Vikram Singh', points: 280, reports: 6, resolved: 5, avatar: null },
  { id: 3, rank: 3, name: 'Kavya Reddy', points: 260, reports: 5, resolved: 5, avatar: null },
  { id: 4, rank: 15, name: 'Priya Sharma (You)', points: 120, reports: 3, resolved: 2, avatar: null, isCurrentUser: true }
];

const achievements = [
  { title: 'First Report', description: 'Submit your first issue report', icon: '🎯', earned: true },
  { title: 'Problem Solver', description: 'Get 5 reports resolved', icon: '🛠️', earned: true },
  { title: 'Community Hero', description: 'Reach 1000 points', icon: '🦸', earned: true },
  { title: 'Eagle Eye', description: 'Report 50 issues', icon: '👁️', earned: false },
  { title: 'Streak Master', description: 'Report issues for 30 consecutive days', icon: '🔥', earned: false },
  { title: 'Top Contributor', description: 'Reach top 10 in leaderboard', icon: '⭐', earned: false }
];

export function Leaderboard() {
  const [selectedTab, setSelectedTab] = useState('monthly');

  // Handle URL routing for tabs
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const period = urlParams.get('period');
    if (period === 'weekly') {
      setSelectedTab('weekly');
      window.history.replaceState({}, '', '/community-leaderboard?period=weekly');
    } else {
      setSelectedTab('monthly');
      window.history.replaceState({}, '', '/community-leaderboard?period=monthly');
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    const url = tab === 'weekly' ? '/community-leaderboard?period=weekly' : '/community-leaderboard?period=monthly';
    window.history.pushState({}, '', url);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>;
    }
  };

  const currentData = selectedTab === 'monthly' ? leaderboardData : weeklyData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">🏆 Leaderboard</h1>
        <p className="text-yellow-100">See how you rank among community champions making a difference!</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-yellow-600" />
                  <span>Community Leaders</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">This Month</TabsTrigger>
                  <TabsTrigger value="weekly">This Week</TabsTrigger>
                </TabsList>
                
                <TabsContent value={selectedTab} className="space-y-4 mt-6">
                  {/* Top 3 Podium */}
                  <div className="flex justify-center items-end space-x-4 mb-8">
                    {currentData.slice(0, 3).map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className={`text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
                      >
                        <div className={`relative ${index === 0 ? 'scale-110' : ''}`}>
                          <Avatar className={`mx-auto mb-2 ${index === 0 ? 'w-20 h-20' : 'w-16 h-16'}`}>
                            <AvatarImage src={user.avatar || undefined} />
                            <AvatarFallback className={`${
                              index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                              index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                              'bg-gradient-to-br from-amber-400 to-amber-600'
                            } text-white`}>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-2 -right-2">
                            {getRankIcon(user.rank)}
                          </div>
                        </div>
                        <h3 className="font-medium text-sm">{user.name.replace(' (You)', '')}</h3>
                        <p className="text-lg font-bold text-blue-600">{user.points.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{user.reports} reports</p>
                        <div className={`h-16 w-12 mx-auto rounded-t-lg mt-2 ${
                          index === 0 ? 'bg-gradient-to-t from-yellow-400 to-yellow-600 h-20' :
                          index === 1 ? 'bg-gradient-to-t from-gray-300 to-gray-500 h-16' :
                          'bg-gradient-to-t from-amber-400 to-amber-600 h-12'
                        }`} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Full Rankings */}
                  <div className="space-y-3">
                    {currentData.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center space-x-4 p-4 rounded-lg border transition-all ${
                          user.isCurrentUser 
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-center w-10">
                          {getRankIcon(user.rank)}
                        </div>

                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{user.name}</h3>
                            {user.isCurrentUser && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">You</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{user.reports} reports</span>
                            <span>{user.resolved} resolved</span>
                            {user.streak && (
                              <span className="flex items-center space-x-1">
                                <span>🔥</span>
                                <span>{user.streak} day streak</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-blue-600">{user.points.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Your Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">42</p>
                  <p className="text-sm text-gray-600">Current Rank</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">1,250</p>
                    <p className="text-xs text-green-700">Total Points</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-lg font-bold text-purple-600">5</p>
                    <p className="text-xs text-purple-700">Day Streak</p>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-1">Next Rank in</p>
                  <p className="text-lg font-bold text-blue-600">180 points</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className={`text-xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-green-100 text-green-800">✓</Badge>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}