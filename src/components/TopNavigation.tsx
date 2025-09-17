import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, ChevronDown, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface TopNavigationProps {
  user: {
    name: string;
    avatar: string | null;
    points: number;
    rank: number;
  };
}

export function TopNavigation({ user }: TopNavigationProps) {
  const [notifications] = useState([
    { id: 1, text: "Your pothole report has been resolved!", type: "success" },
    { id: 2, text: "New reward available: Clean Streets Champion", type: "info" },
    { id: 3, text: "You've climbed to rank #42!", type: "achievement" }
  ]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm"
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <Flag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              CitizenConnect
            </h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Points Badge */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="hidden sm:block"
          >
            <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1">
              {user.points} Points
            </Badge>
          </motion.div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    />
                  )}
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-3">
                  <div className="flex items-start space-x-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'achievement' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <p className="text-sm">{notification.text}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">Rank #{user.rank}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Privacy</DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}