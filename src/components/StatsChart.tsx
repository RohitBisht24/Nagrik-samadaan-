import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'motion/react';

const pieData = [
  { name: 'Potholes', value: 35, color: '#3b82f6' },
  { name: 'Garbage', value: 25, color: '#10b981' },
  { name: 'Street Lights', value: 20, color: '#f59e0b' },
  { name: 'Water Issues', value: 15, color: '#8b5cf6' },
  { name: 'Others', value: 5, color: '#ef4444' }
];

const lineData = [
  { month: 'Jan', reports: 65 },
  { month: 'Feb', reports: 78 },
  { month: 'Mar', reports: 90 },
  { month: 'Apr', reports: 81 },
  { month: 'May', reports: 95 },
  { month: 'Jun', reports: 110 }
];

interface StatsChartProps {
  type: 'pie' | 'line' | 'bar';
}

export function StatsChart({ type }: StatsChartProps) {
  if (type === 'pie') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="31%"
              outerRadius={80}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => [`${value}%`, 'Percentage']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Legend */}
       <div className="grid grid-cols-3 gap-2 mt-4 justify-center ml-16 max-w-sm">
          {pieData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (type === 'line') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="reports" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    );
  }

  return null;
}