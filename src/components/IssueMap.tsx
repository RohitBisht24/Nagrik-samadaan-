import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const mockIssues = [
  { id: 1, type: 'pothole', lat: 12.9716, lng: 77.5946, status: 'pending', title: 'Large pothole on MG Road' },
  { id: 2, type: 'garbage', lat: 12.9750, lng: 77.5980, status: 'in-progress', title: 'Garbage overflow' },
  { id: 3, type: 'streetlight', lat: 12.9690, lng: 77.5900, status: 'resolved', title: 'Broken street light' },
  { id: 4, type: 'water', lat: 12.9800, lng: 77.6000, status: 'pending', title: 'Water leakage' },
];

export function IssueMap() {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const getIssueColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500';
      case 'in-progress': return 'bg-orange-500';
      default: return 'bg-red-500';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'pothole': return '🕳️';
      case 'garbage': return '🗑️';
      case 'streetlight': return '💡';
      case 'water': return '💧';
      default: return '⚠️';
    }
  };

  return (
    <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 opacity-50" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-10 grid-rows-8 h-full">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="border border-gray-300" />
          ))}
        </div>
      </div>

      {/* Location Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-4 right-4 z-10"
      >
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Navigation className="w-4 h-4 mr-2" />
          My Location
        </Button>
      </motion.div>

      {/* Issue Markers */}
      {mockIssues.map((issue, index) => (
        <motion.div
          key={issue.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${20 + (index * 15)}%`,
            top: `${30 + (index * 10)}%`
          }}
          onClick={() => setSelectedIssue(issue)}
        >
          {/* Pulse Animation */}
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 rounded-full ${getIssueColor(issue.status)} opacity-20`}
          />
          
          {/* Marker */}
          <div className={`w-8 h-8 rounded-full ${getIssueColor(issue.status)} flex items-center justify-center text-white shadow-lg border-2 border-white`}>
            <span className="text-xs">{getIssueIcon(issue.type)}</span>
          </div>
        </motion.div>
      ))}

      {/* Issue Details Popup */}
      {selectedIssue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-sm mb-1">{selectedIssue.title}</h4>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary"
                  className={`text-xs ${
                    selectedIssue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    selectedIssue.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedIssue.status}
                </Badge>
                <span className="text-xs text-gray-500">
                  {getIssueIcon(selectedIssue.type)} {selectedIssue.type}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedIssue(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 space-y-2">
        <h4 className="font-medium text-sm mb-2">Issue Status</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-gray-600">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
}