import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  TrendingUp, 
  Award, 
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  Construction,
  Car
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { StatsChart } from './StatsChart';
import { IssueMap } from './IssueMap';
import { AnimatedCounter } from './AnimatedCounter';

const recentReports = [
  {
    id: 1,
    title: "Pothole on MG Road",
    status: "in-progress",
    location: "MG Road, Block A",
    time: "2 hours ago",
    category: "road",
    icon: Construction
  },
  {
    id: 2,
    title: "Garbage Overflow",
    status: "resolved",
    location: "Park Street, Zone 3",
    time: "1 day ago",
    category: "garbage",
    icon: Trash2
  },
  {
    id: 3,
    title: "Street Light Issue",
    status: "pending",
    location: "Main Street",
    time: "3 hours ago",
    category: "utilities",
    icon: AlertCircle
  }
];

const stats = [
  { label: "Total Reports", value: 1247, icon: TrendingUp, color: "blue" },
  { label: "Resolved Issues", value: 956, icon: CheckCircle, color: "green" },
  { label: "In Progress", value: 167, icon: Clock, color: "orange" },
  { label: "Your Points", value: 1250, icon: Award, color: "purple" }
];

export function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Rohit! 👋</h1>
        <p className="text-blue-100">Let's make our city better together. You've reported 23 issues this month!</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <AnimatedCounter 
                        value={stat.value} 
                        className="text-2xl font-bold text-gray-900"
                      />
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Community Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentReports.map((report, index) => {
                const Icon = report.icon;
                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-4 rounded-lg border hover:shadow-md transition-all"
                  >
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{report.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{report.location}</p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={report.status === 'resolved' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            report.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {report.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{report.time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Issue Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <StatsChart type="pie" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Monthly Report Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <StatsChart type="line" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Resolution Rate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Resolution Rate</span>
                <span className="text-sm text-gray-600">76.7%</span>
              </div>
              <Progress value={76.7} className="h-3" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">956</p>
                  <p className="text-sm text-gray-600">Resolved</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">167</p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">124</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}