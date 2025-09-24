import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Plus, 
  FileText, 
  Trophy, 
  Gift, 
  AlertTriangle, 
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-600' },
  { id: 'report-issue', label: 'Report Issue', icon: Plus, color: 'text-green-600' },
  { id: 'my-reports', label: 'My Reports', icon: FileText, color: 'text-purple-600' },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, color: 'text-yellow-600' },
  { id: 'rewards', label: 'Rewards & Events', icon: Gift, color: 'text-pink-600' },
  { id: 'sos', label: 'SOS Emergency', icon: AlertTriangle, color: 'text-red-600', highlight: true },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare, color: 'text-indigo-600' },
];

export function Sidebar({ currentPage, setCurrentPage, collapsed, setCollapsed }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay - Only show on screens <576px */}
      {!collapsed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 sm-custom:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={cn(
          "fixed left-0 top-16 bottom-0 z-50 bg-white border-r border-blue-100 shadow-lg transition-all duration-300",
<<<<<<< HEAD
          collapsed ? "w-12 sm-custom:w-16" : "w-48 sm-custom:w-64"
        )}
      >
        {/* Toggle Button */}
        <div className="p-2 sm-custom:p-4 border-b border-blue-100">
=======
          collapsed ? "w-12 xs:w-16" : "w-48 xs:w-64"
        )}
      >
        {/* Toggle Button */}
        <div className="p-2 xs:p-4 border-b border-blue-100">
>>>>>>> 7b6c8fa0ccc505a76dae1d998621c51dffa9671f
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center"
          >
<<<<<<< HEAD
            {collapsed ? <Menu className="w-4 h-4 sm-custom:w-5 sm-custom:h-5" /> : <X className="w-4 h-4 sm-custom:w-5 sm-custom:h-5" />}
=======
            {collapsed ? <Menu className="w-4 h-4 xs:w-5 xs:h-5" /> : <X className="w-4 h-4 xs:w-5 xs:h-5" />}
>>>>>>> 7b6c8fa0ccc505a76dae1d998621c51dffa9671f
          </Button>
        </div>

        {/* Navigation Menu */}
<<<<<<< HEAD
        <nav className="p-2 sm-custom:p-4 space-y-1 sm-custom:space-y-2">
=======
        <nav className="p-2 xs:p-4 space-y-1 xs:space-y-2">
>>>>>>> 7b6c8fa0ccc505a76dae1d998621c51dffa9671f
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isHighlight = item.highlight;

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
<<<<<<< HEAD
                    "w-full justify-start relative overflow-hidden text-sm sm-custom:text-base",
                    collapsed ? "px-1 sm-custom:px-2" : "px-2 sm-custom:px-4",
=======
                    "w-full justify-start relative overflow-hidden text-sm xs:text-base",
                    collapsed ? "px-1 xs:px-2" : "px-2 xs:px-4",
>>>>>>> 7b6c8fa0ccc505a76dae1d998621c51dffa9671f
                    isActive && "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg",
                    isHighlight && !isActive && "bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 hover:from-red-100 hover:to-orange-100",
                    !isActive && !isHighlight && "hover:bg-blue-50"
                  )}
                  onClick={() => setCurrentPage(item.id)}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r"
                    />
                  )}

                  {/* SOS Pulse Effect */}
                  {isHighlight && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded"
                    />
                  )}

                  <Icon className={cn(
<<<<<<< HEAD
                    "w-4 h-4 sm-custom:w-5 sm-custom:h-5 mr-2 sm-custom:mr-3",
=======
                    "w-4 h-4 xs:w-5 xs:h-5 mr-2 xs:mr-3",
>>>>>>> 7b6c8fa0ccc505a76dae1d998621c51dffa9671f
                    collapsed && "mr-0",
                    isActive ? "text-white" : item.color
                  )} />
                  
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Stats */}
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
<<<<<<< HEAD
            className="absolute bottom-2 sm-custom:bottom-4 left-2 sm-custom:left-4 right-2 sm-custom:right-4 p-2 sm-custom:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
          >
            <div className="text-center">
              <p className="text-xs sm-custom:text-sm text-blue-600 font-medium">Your Impact</p>
              <p className="text-lg sm-custom:text-2xl font-bold text-blue-800">23</p>
=======
            className="absolute bottom-2 xs:bottom-4 left-2 xs:left-4 right-2 xs:right-4 p-2 xs:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
          >
            <div className="text-center">
              <p className="text-xs xs:text-sm text-blue-600 font-medium">Your Impact</p>
              <p className="text-lg xs:text-2xl font-bold text-blue-800">23</p>
>>>>>>> 7b6c8fa0ccc505a76dae1d998621c51dffa9671f
              <p className="text-xs text-blue-500">Issues Reported</p>
            </div>
          </motion.div>
        )}
      </motion.aside>
    </>
  );
}