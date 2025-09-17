import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  User,
  ThumbsUp,
  Send
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner@2.0.3';

const mockReports = [
  {
    id: 1,
    title: "Large pothole on MG Road",
    category: "pothole",
    location: "MG Road, Block A, Bangalore",
    status: "resolved",
    date: "2024-01-15",
    description: "Deep pothole causing traffic issues",
    progress: 100,
    images: 3,
    resolutionTime: "5 days",
    beforeImage: "/api/placeholder/200/150",
    afterImage: "/api/placeholder/200/150"
  },
  {
    id: 2,
    title: "Garbage overflow near park",
    category: "garbage",
    location: "Park Street, Zone 3, Bangalore",
    status: "in-progress",
    date: "2024-01-20",
    description: "Bins overflowing, attracting stray animals",
    progress: 60,
    images: 2,
    resolutionTime: "2 days elapsed",
    beforeImage: "/api/placeholder/200/150"
  },
  {
    id: 3,
    title: "Broken street light",
    category: "streetlight",
    location: "Main Street, Bangalore",
    status: "pending",
    date: "2024-01-22",
    description: "Street light not working since last week",
    progress: 25,
    images: 1,
    resolutionTime: "Just submitted",
    beforeImage: "/api/placeholder/200/150"
  },
  {
    id: 4,
    title: "Water leakage on sidewalk",
    category: "water",
    location: "Commercial Street, Bangalore",
    status: "rejected",
    date: "2024-01-10",
    description: "Continuous water leak creating puddles",
    progress: 0,
    images: 2,
    resolutionTime: "Reviewed",
    beforeImage: "/api/placeholder/200/150"
  }
];

const mockPublicReports = [
  {
    id: 5,
    title: "Road construction blocking traffic",
    category: "traffic",
    location: "Brigade Road, Bangalore",
    status: "in-progress",
    date: "2024-01-23",
    description: "Ongoing construction causing major traffic jams during peak hours",
    progress: 40,
    images: 4,
    author: "Rajesh Kumar",
    avatar: null,
    likes: 24,
    comments: 8,
    isLiked: false,
    commentsList: [
      { id: 1, author: "Priya Sharma", text: "This is affecting my daily commute too!", time: "2 hours ago" },
      { id: 2, author: "Amit Singh", text: "Contacted local authorities, they said work will be done by next week", time: "4 hours ago" }
    ]
  },
  {
    id: 6,
    title: "Stray dogs near school area",
    category: "safety",
    location: "Koramangala, Bangalore",
    status: "pending",
    date: "2024-01-24",
    description: "Multiple stray dogs creating safety concerns for school children",
    progress: 15,
    images: 2,
    author: "Meera Patel",
    avatar: null,
    likes: 15,
    comments: 12,
    isLiked: true,
    commentsList: [
      { id: 1, author: "Suresh Reddy", text: "I've seen this issue too. Need urgent action.", time: "1 hour ago" },
      { id: 2, author: "Lakshmi Devi", text: "Called animal control but no response yet", time: "3 hours ago" }
    ]
  },
  {
    id: 7,
    title: "Illegal dumping behind market",
    category: "garbage",
    location: "Russell Market, Bangalore",
    status: "resolved",
    date: "2024-01-18",
    description: "Commercial waste being dumped illegally behind the market area",
    progress: 100,
    images: 5,
    author: "Vikram Agarwal",
    avatar: null,
    likes: 32,
    comments: 6,
    isLiked: false,
    commentsList: [
      { id: 1, author: "Ravi Kumar", text: "Great job getting this resolved! 👏", time: "1 day ago" },
      { id: 2, author: "Sunita Rao", text: "Thanks for reporting this, the area is much cleaner now", time: "2 days ago" }
    ]
  }
];

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending Review' },
  'in-progress': { color: 'bg-blue-100 text-blue-800', icon: AlertCircle, label: 'In Progress' },
  resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Resolved' },
  rejected: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Needs Review' }
};

export function MyReports() {
  const [filter, setFilter] = useState('all');
  const [publicFilter, setPublicFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('my-reports');
  const [commentInput, setCommentInput] = useState('');
  const [publicReports, setPublicReports] = useState(mockPublicReports);

  // Handle URL routing for tabs
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab === 'public-reports') {
      setActiveTab('public-reports');
      window.history.replaceState({}, '', '/track-my-reports?tab=public-reports');
    } else {
      setActiveTab('my-reports');
      window.history.replaceState({}, '', '/track-my-reports?tab=my-reports');
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const url = tab === 'public-reports' ? '/track-my-reports?tab=public-reports' : '/track-my-reports?tab=my-reports';
    window.history.pushState({}, '', url);
  };

  const filteredReports = filter === 'all' 
    ? mockReports 
    : mockReports.filter(report => report.status === filter);

  const filteredPublicReports = publicFilter === 'all' 
    ? publicReports 
    : publicReports.filter(report => report.status === publicFilter);

  const handleLike = (reportId: number) => {
    setPublicReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            isLiked: !report.isLiked,
            likes: report.isLiked ? report.likes - 1 : report.likes + 1
          }
        : report
    ));
    toast.success(publicReports.find(r => r.id === reportId)?.isLiked ? 'Like removed' : 'Report liked!');
  };

  const handleComment = (reportId: number) => {
    if (!commentInput.trim()) return;
    
    setPublicReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            comments: report.comments + 1,
            commentsList: [
              { id: Date.now(), author: 'Priya Sharma', text: commentInput, time: 'Just now' },
              ...report.commentsList
            ]
          }
        : report
    ));
    setCommentInput('');
    toast.success('Comment added!');
  };

  const getProgressColor = (progress: number, status: string) => {
    if (status === 'resolved') return 'bg-green-500';
    if (status === 'rejected') return 'bg-red-500';
    if (progress > 70) return 'bg-blue-500';
    if (progress > 40) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Reports & Community</h1>
        <p className="text-purple-100">Track your reports and engage with community issues.</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: 23, color: 'blue' },
          { label: 'Resolved', value: 18, color: 'green' },
          { label: 'In Progress', value: 3, color: 'yellow' },
          { label: 'Pending', value: 2, color: 'gray' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs for My Reports and Public Reports */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-reports" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>My Reports</span>
          </TabsTrigger>
          <TabsTrigger value="public-reports" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Community Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-reports">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* My Reports List */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Reports</CardTitle>
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reports</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="rejected">Needs Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredReports.map((report, index) => {
                    const StatusIcon = statusConfig[report.status as keyof typeof statusConfig].icon;
                    return (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedReport(report)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">{report.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{report.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{report.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ImageIcon className="w-4 h-4" />
                                <span>{report.images} photos</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={statusConfig[report.status as keyof typeof statusConfig].color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[report.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{report.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${report.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              className={`h-2 rounded-full ${getProgressColor(report.progress, report.status)}`}
                            />
                          </div>
                        </div>

                        {/* Timeline Steps */}
                        <div className="flex items-center justify-between mt-3 text-xs">
                          <div className={`flex items-center space-x-1 ${report.progress >= 25 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-2 h-2 rounded-full ${report.progress >= 25 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                            <span>Submitted</span>
                          </div>
                          <div className={`flex items-center space-x-1 ${report.progress >= 50 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-2 h-2 rounded-full ${report.progress >= 50 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                            <span>Under Review</span>
                          </div>
                          <div className={`flex items-center space-x-1 ${report.progress >= 75 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-2 h-2 rounded-full ${report.progress >= 75 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                            <span>In Progress</span>
                          </div>
                          <div className={`flex items-center space-x-1 ${report.progress >= 100 ? 'text-green-600' : 'text-gray-400'}`}>
                            <div className={`w-2 h-2 rounded-full ${report.progress >= 100 ? 'bg-green-600' : 'bg-gray-300'}`} />
                            <span>Resolved</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="public-reports">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Public Reports List */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Community Reports</CardTitle>
                    <Select value={publicFilter} onValueChange={setPublicFilter}>
                      <SelectTrigger className="w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reports</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {filteredPublicReports.map((report, index) => {
                    const StatusIcon = statusConfig[report.status as keyof typeof statusConfig].icon;
                    return (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4 hover:shadow-sm transition-all"
                      >
                        {/* Report Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={report.avatar} />
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {report.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-sm">{report.author}</h4>
                                <Badge className={statusConfig[report.status as keyof typeof statusConfig].color}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusConfig[report.status as keyof typeof statusConfig].label}
                                </Badge>
                              </div>
                              <h3 className="font-medium text-lg mb-2">{report.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{report.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{report.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <ImageIcon className="w-3 h-3" />
                                  <span>{report.images} photos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {report.status !== 'pending' && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{report.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${report.progress}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                                className={`h-2 rounded-full ${getProgressColor(report.progress, report.status)}`}
                              />
                            </div>
                          </div>
                        )}

                        {/* Interaction Buttons */}
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center space-x-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleLike(report.id)}
                              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${report.isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                              <Heart className={`w-4 h-4 ${report.isLiked ? 'fill-current' : ''}`} />
                              <span>{report.likes}</span>
                            </motion.button>
                            
                            <button 
                              onClick={() => setSelectedReport(report)}
                              className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>{report.comments}</span>
                            </button>
                            
                            <button className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>

                        {/* Recent Comments Preview */}
                        {report.commentsList.length > 0 && (
                          <div className="mt-3 pt-3 border-t bg-gray-50 rounded-lg p-3">
                            <div className="space-y-2">
                              {report.commentsList.slice(0, 2).map((comment) => (
                                <div key={comment.id} className="flex items-start space-x-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                      {comment.author.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm font-medium">{comment.author}</span>
                                      <span className="text-xs text-gray-500">{comment.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{comment.text}</p>
                                  </div>
                                </div>
                              ))}
                              {report.commentsList.length > 2 && (
                                <button 
                                  onClick={() => setSelectedReport(report)}
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  View all {report.comments} comments
                                </button>
                              )}
                            </div>
                            
                            {/* Add Comment */}
                            <div className="flex items-center space-x-2 mt-3">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">PS</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex space-x-2">
                                <Input
                                  placeholder="Add a comment..."
                                  value={commentInput}
                                  onChange={(e) => setCommentInput(e.target.value)}
                                  className="text-sm"
                                  onKeyPress={(e) => e.key === 'Enter' && handleComment(report.id)}
                                />
                                <Button 
                                  size="sm" 
                                  onClick={() => handleComment(report.id)}
                                  className="px-3"
                                >
                                  <Send className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Details Sidebar */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed right-4 top-20 w-80 z-50"
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Report Details</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedReport(null)}
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">{selectedReport.title}</h3>
                <p className="text-sm text-gray-600">{selectedReport.description}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <p className="text-sm text-gray-600">{selectedReport.location}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Submitted</label>
                <p className="text-sm text-gray-600">{selectedReport.date}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Resolution Time</label>
                <p className="text-sm text-gray-600">{selectedReport.resolutionTime}</p>
              </div>

              {/* Before/After Images */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Evidence Photos</label>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Before</p>
                    <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  {selectedReport.afterImage && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">After</p>
                      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedReport.status === 'resolved' && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-1">🎉 Issue Resolved!</p>
                  <p className="text-xs text-green-600">Thank you for helping improve your community. You earned 50 points!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}