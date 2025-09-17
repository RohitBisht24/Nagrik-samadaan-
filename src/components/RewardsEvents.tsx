import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Gift, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Star,
  Award,
  Zap,
  ShoppingBag,
  Coffee,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AnimatedCounter } from './AnimatedCounter';

const rewards = [
  {
    id: 1,
    title: 'City Cleanup Volunteer Badge',
    points: 500,
    category: 'badge',
    description: 'Special recognition badge for active community participation',
    icon: '🏆',
    available: true,
    claimed: false
  },
  {
    id: 2,
    title: 'Local Cafe Voucher',
    points: 200,
    category: 'voucher',
    description: 'Free coffee at participating local cafes',
    icon: '☕',
    available: true,
    claimed: false
  },
  {
    id: 3,
    title: 'Municipal Recognition Certificate',
    points: 1000,
    category: 'certificate',
    description: 'Official certificate from city municipality',
    icon: '📜',
    available: true,
    claimed: false
  },
  {
    id: 4,
    title: 'Eco-Friendly Kit',
    points: 750,
    category: 'merchandise',
    description: 'Reusable water bottle, bags, and eco-friendly items',
    icon: '🌱',
    available: false,
    claimed: false
  }
];

const events = [
  {
    id: 1,
    title: 'Community Cleanup Drive',
    date: '2024-02-15',
    time: '9:00 AM - 12:00 PM',
    location: 'Cubbon Park, Bangalore',
    participants: 45,
    maxParticipants: 100,
    points: 100,
    description: 'Join us for a community-wide cleanup initiative to make our parks cleaner and greener.',
    status: 'upcoming',
    registered: false
  },
  {
    id: 2,
    title: 'Road Safety Awareness Campaign',
    date: '2024-02-20',
    time: '10:00 AM - 2:00 PM',
    location: 'MG Road Metro Station',
    participants: 28,
    maxParticipants: 50,
    points: 75,
    description: 'Help spread awareness about road safety and traffic rules.',
    status: 'upcoming',
    registered: true
  },
  {
    id: 3,
    title: 'Tree Plantation Drive',
    date: '2024-01-28',
    time: '8:00 AM - 11:00 AM',
    location: 'Lal Bagh Botanical Garden',
    participants: 75,
    maxParticipants: 75,
    points: 120,
    description: 'Completed tree plantation drive with full participation.',
    status: 'completed',
    registered: true
  }
];

const userPoints = 1250;

export function RewardsEvents() {
  const [selectedTab, setSelectedTab] = useState('rewards');

  // Handle URL routing for tabs
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section === 'events') {
      setSelectedTab('events');
      window.history.replaceState({}, '', '/rewards-and-events?section=events');
    } else {
      setSelectedTab('rewards');
      window.history.replaceState({}, '', '/rewards-and-events?section=rewards');
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    const url = tab === 'events' ? '/rewards-and-events?section=events' : '/rewards-and-events?section=rewards';
    window.history.pushState({}, '', url);
  };

  const canClaim = (points: number) => userPoints >= points;

  const getEventIcon = (title: string) => {
    if (title.includes('Cleanup')) return '🧹';
    if (title.includes('Safety')) return '🚦';
    if (title.includes('Tree')) return '🌳';
    return '📅';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">🎁 Rewards & Events</h1>
        <p className="text-pink-100">Earn rewards for your contributions and join community events!</p>
      </motion.div>

      {/* Points Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-1">Your Reward Points</h2>
                <p className="text-green-600">Keep contributing to earn more rewards!</p>
              </div>
              <div className="text-right">
                <AnimatedCounter 
                  value={userPoints} 
                  className="text-4xl font-bold text-green-600"
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-green-700">+50 points last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rewards" className="flex items-center space-x-2">
            <Gift className="w-4 h-4" />
            <span>Rewards</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Events</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${
                  reward.available && canClaim(reward.points) 
                    ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50' 
                    : reward.available 
                    ? 'border-gray-200' 
                    : 'border-gray-200 opacity-60'
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{reward.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{reward.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="secondary" 
                              className={`${
                                canClaim(reward.points) && reward.available 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {reward.points} points
                            </Badge>
                            <Badge variant="outline">{reward.category}</Badge>
                          </div>
                        </div>
                      </div>
                      {!reward.available && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    
                    <div className="space-y-3">
                      {!canClaim(reward.points) && reward.available && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {userPoints}/{reward.points} points
                            </span>
                          </div>
                          <Progress 
                            value={(userPoints / reward.points) * 100} 
                            className="h-2"
                          />
                          <p className="text-xs text-gray-500">
                            Need {reward.points - userPoints} more points
                          </p>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full"
                        disabled={!canClaim(reward.points) || !reward.available}
                        variant={canClaim(reward.points) && reward.available ? "default" : "secondary"}
                      >
                        {!reward.available ? 'Out of Stock' :
                         !canClaim(reward.points) ? 'Need More Points' : 'Claim Reward'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6 mt-6">
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${
                  event.status === 'upcoming' && event.registered 
                    ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50' 
                    : event.status === 'completed' 
                    ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50'
                    : 'border-gray-200'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{getEventIcon(event.title)}</div>
                        <div>
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={
                            event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                            event.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {event.status}
                        </Badge>
                        {event.registered && (
                          <Badge variant="outline" className="border-green-300 text-green-700">
                            Registered
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="text-sm">
                          {event.participants}/{event.maxParticipants} participants
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">{event.points} points reward</span>
                      </div>
                    </div>

                    {/* Participation Progress */}
                    {event.status === 'upcoming' && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Registration</span>
                          <span className="font-medium">
                            {event.participants}/{event.maxParticipants} spots filled
                          </span>
                        </div>
                        <Progress 
                          value={(event.participants / event.maxParticipants) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {event.status === 'upcoming' && !event.registered && (
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Register Now
                        </Button>
                      )}
                      {event.status === 'upcoming' && event.registered && (
                        <Button variant="outline" className="border-blue-300 text-blue-700">
                          View Details
                        </Button>
                      )}
                      {event.status === 'completed' && event.registered && (
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">
                            ✓ Completed - Earned {event.points} points
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}