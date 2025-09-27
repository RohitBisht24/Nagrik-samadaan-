import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Upload, 
  MapPin, 
  Camera, 
  Mic, 
  Construction, 
  Trash2, 
  Lightbulb, 
  Droplets,
  Car,
  TreePine,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

const issueCategories = [
  { id: 'pothole', label: 'Potholes', icon: Construction, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'garbage', label: 'Garbage', icon: Trash2, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'streetlight', label: 'Street Light', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'water', label: 'Water Issues', icon: Droplets, color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
  { id: 'traffic', label: 'Traffic', icon: Car, color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'trees', label: 'Trees & Parks', icon: TreePine, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 'other', label: 'Other', icon: AlertTriangle, color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

export function ReportIssue() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleLocationFetch = () => {
    setLocation('Fetching location...');
    setTimeout(() => {
      setLocation('Khandari, Agra, Uttar Pradesh 282002');
      toast.success('Location fetched successfully!');
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages]);
      toast.success(`${files.length} image(s) uploaded successfully!`);
    }
  };

  const handleSubmit = () => {
    if (!selectedCategory || !location || !description) {
      toast.error('Please fill all required fields');
      return;
    }

    if (selectedCategory === 'other' && !customCategory.trim()) {
      toast.error('Please specify the custom category');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Issue reported successfully! 🎉');
      // Reset form
      setSelectedCategory('');
      setCustomCategory('');
      setLocation('');
      setDescription('');
      setUploadedImages([]);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Report New Issue</h1>
        <p className="text-green-100">Help improve your community by reporting issues you encounter.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  <span>Select Issue Category</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {issueCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <motion.div
                          key={category.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <button
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full p-4 rounded-lg border-2 transition-all ${
                              selectedCategory === category.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                            <p className="text-sm font-medium">{category.label}</p>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Custom Category Input */}
                  {selectedCategory === 'other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2"
                    >
                      <Input
                        placeholder="Please specify the issue category..."
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Example: Noise pollution, Construction debris, Stray animals, etc.
                      </p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter location or use GPS"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleLocationFetch}
                    variant="outline"
                    className="px-6"
                  >
                    <motion.div
                      animate={location === 'Fetching location...' ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: location === 'Fetching location...' ? Infinity : 0 }}
                    >
                      <MapPin className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </div>
                {location && location !== 'Fetching location...' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-2 rounded"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Location confirmed: {location}</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Photo Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-blue-600" />
                  <span>Upload Photos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-gray-600 mb-2">Drop images here or click to upload</p>
                    <p className="text-sm text-gray-500">Support: JPG, PNG, GIF (Max 5MB each)</p>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-3 gap-2 mt-4"
                  >
                    {uploadedImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Note
                  </Button>
                  <span className="text-sm text-gray-500">Optional: Add voice description</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardContent className="p-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </motion.div>
                
                <div className="mt-4 p-3 bg-blue-100 rounded-lg border">
                  <p className="text-sm text-blue-800">
                    {/* ✨ <strong>Reward Points:</strong> You'll earn 50 points for submitting this report! */}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reporting Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Take clear photos from multiple angles</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Provide accurate location details</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Describe the severity and impact</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Avoid duplicate reports</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Emergency Notice */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800 mb-1">Emergency?</p>
                    <p className="text-xs text-red-600 mb-2">For urgent issues requiring immediate attention, use the SOS feature instead.</p>
                    <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                      Go to SOS
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}