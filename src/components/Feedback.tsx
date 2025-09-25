import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  MessageSquare, 
  CheckCircle,
  Clock,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { toast } from 'sonner@2.0.3';

const resolvedIssues = [
  {
    id: 1,
    title: "Pothole repair on MG Road",
    resolvedDate: "2024-01-20",
    category: "road",
    beforeImage: "/api/placeholder/150/100",
    afterImage: "/api/placeholder/150/100",
    feedback: null,
    description: "Large pothole causing traffic issues has been completely filled and road surface restored."
  },
  {
    id: 2,
    title: "Street light installation",
    resolvedDate: "2024-01-18",
    category: "utilities",
    beforeImage: "/api/placeholder/150/100",
    afterImage: "/api/placeholder/150/100",
    feedback: { rating: 5, satisfied: true, comment: "Excellent work! The area is much safer now." },
    description: "New LED street light installed to improve visibility and safety."
  },
  {
    id: 3,
    title: "Garbage bin replacement",
    resolvedDate: "2024-01-15",
    category: "sanitation",
    beforeImage: "/api/placeholder/150/100",
    afterImage: "/api/placeholder/150/100",
    feedback: { rating: 4, satisfied: true, comment: "Good replacement, but could be larger capacity." },
    description: "Damaged garbage bin replaced with new weatherproof model."
  }
];

export function Feedback() {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [rating, setRating] = useState([5]);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = (issueId: number, satisfied: boolean) => {
    if (!feedbackText.trim()) {
      toast.error('Please provide your feedback comment');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you for your feedback! 🎉');
      
      // Update the issue with feedback
      const updatedIssue = resolvedIssues.find(issue => issue.id === issueId);
      if (updatedIssue) {
        updatedIssue.feedback = {
          rating: rating[0],
          satisfied,
          comment: feedbackText
        };
      }
      
      setSelectedIssue(null);
      setFeedbackText('');
      setRating([5]);
    }, 2000);
  };

  const handleQuickFeedback = (issueId: number, satisfied: boolean) => {
    const issue = resolvedIssues.find(i => i.id === issueId);
    if (issue) {
      issue.feedback = {
        rating: satisfied ? 5 : 2,
        satisfied,
        comment: satisfied ? 'Quick positive feedback' : 'Quick negative feedback'
      };
      toast.success(satisfied ? 'Thanks for the positive feedback!' : 'Thanks for your feedback. We\'ll improve next time.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">💬 Feedback Center</h1>
        <p className="text-indigo-100">Help us improve by sharing your experience with resolved issues.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Issues Resolved', value: 18, color: 'green' },
          { label: 'Feedback Given', value: 12, color: 'blue' },
          { label: 'Pending Feedback', value: 6, color: 'orange' }
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

      {/* Resolved Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resolved Issues Awaiting Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resolvedIssues.filter(issue => !issue.feedback).map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium">{issue.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Resolved
                        </Badge>
                        <span className="text-xs text-gray-500">{issue.resolvedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Before/After Images */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Before</p>
                      <div className="w-full h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">After</p>
                      <div className="w-full h-20 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Feedback Buttons */}
                  <div className="flex flex-col gap-2 feedback-btn-row-responsive">
                    <div className="flex gap-6 justify-center feedback-btn-row-main">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          onClick={() => handleQuickFeedback(issue.id, true)}
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>Satisfied</span>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickFeedback(issue.id, false)}
                          className="border-orange-300 text-orange-700 hover:bg-orange-50 flex items-center space-x-2"
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>Not Satisfied</span>
                        </Button>
                      </motion.div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedIssue(issue)}
                      className="text-blue-600 hover:bg-blue-50 feedback-btn-detailed"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Detailed Feedback
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Feedback History */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Previous Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resolvedIssues.filter(issue => issue.feedback).map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{issue.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < (issue.feedback?.rating || 0)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <Badge 
                          variant="secondary"
                          className={issue.feedback?.satisfied ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                        >
                          {issue.feedback?.satisfied ? 'Satisfied' : 'Needs Improvement'}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{issue.resolvedDate}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 italic">"{issue.feedback?.comment}"</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Feedback Modal */}
      {selectedIssue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedIssue(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Provide Detailed Feedback</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">{selectedIssue.title}</h3>
                <p className="text-sm text-gray-600">{selectedIssue.description}</p>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Overall Satisfaction ({rating[0]}/5)
                </label>
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < rating[0]
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium mb-2">Comments</label>
                <Textarea
                  placeholder="Share your experience with the resolution quality, timeline, communication, etc."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={() => handleFeedbackSubmit(selectedIssue.id, rating[0] >= 4)}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </motion.div>
                
                <Button
                  variant="outline"
                  onClick={() => setSelectedIssue(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}