import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  Flame, 
  Car, 
  Droplets,
  Users,
  Shield,
  Zap,
  Plus,
  Camera,
  Upload,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

const emergencyCategories = [
  { 
    id: 'fire', 
    label: 'Fire Emergency', 
    icon: Flame, 
    color: 'from-red-500 to-red-700',
    number: '101'
  },
  { 
    id: 'accident', 
    label: 'Traffic Accident', 
    icon: Car, 
    color: 'from-orange-500 to-orange-700',
    number: '102'
  },
  { 
    id: 'flood', 
    label: 'Flood/Water Emergency', 
    icon: Droplets, 
    color: 'from-blue-500 to-blue-700',
    number: '103'
  },
  { 
    id: 'crime', 
    label: 'Crime/Safety Issue', 
    icon: Shield, 
    color: 'from-purple-500 to-purple-700',
    number: '100'
  }
];

const quickContacts = [
  { name: 'Police', number: '100', icon: Shield },
  { name: 'Fire Brigade', number: '101', icon: Flame },
  { name: 'Ambulance', number: '102', icon: Users },
  { name: 'Disaster Management', number: '103', icon: AlertTriangle }
];

export function SOSPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [location, setLocation] = useState('Fetching location...');
  const [activeTab, setActiveTab] = useState('instant');
  
  // Manual reporting states
  const [manualDescription, setManualDescription] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [manualImages, setManualImages] = useState<string[]>([]);
  const [isManualSubmitting, setIsManualSubmitting] = useState(false);

  // Handle URL routing for tabs
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type === 'report') {
      setActiveTab('manual');
      window.history.replaceState({}, '', '/emergency-sos?type=report');
    } else {
      setActiveTab('instant');
      window.history.replaceState({}, '', '/emergency-sos?type=instant');
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const url = tab === 'manual' ? '/emergency-sos?type=report' : '/emergency-sos?type=instant';
    window.history.pushState({}, '', url);
  };

  React.useEffect(() => {
    // Simulate location fetch
    setTimeout(() => {
      setLocation('MG Road, Bangalore, Karnataka 560001');
    }, 2000);
  }, []);

  const handleEmergencyAlert = () => {
    if (!selectedCategory) {
      toast.error('Please select an emergency category first');
      return;
    }

    setIsEmergencyActive(true);
    toast.success('Emergency alert sent! Help is on the way.');
    
    // Simulate emergency response
    setTimeout(() => {
      setIsEmergencyActive(false);
      toast.success('Emergency services have been notified. Stay safe!');
    }, 5000);
  };

  const handleQuickCall = (number: string, name: string) => {
    toast.success(`Calling ${name} (${number})...`);
  };

  const handleManualLocationFetch = () => {
    setManualLocation('Fetching location...');
    setTimeout(() => {
      setManualLocation('MG Road, Bangalore, Karnataka 560001');
      toast.success('Location fetched successfully!');
    }, 2000);
  };

  const handleManualImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setManualImages(prev => [...prev, ...newImages]);
      toast.success(`${files.length} image(s) uploaded successfully!`);
    }
  };

  const handleManualSubmit = () => {
    if (!selectedCategory || !manualLocation || !manualDescription) {
      toast.error('Please fill all required fields for emergency report');
      return;
    }

    setIsManualSubmitting(true);
    setTimeout(() => {
      setIsManualSubmitting(false);
      toast.success('Emergency report submitted! Authorities have been notified. 🚨');
      // Reset form
      setSelectedCategory('');
      setManualDescription('');
      setManualLocation('');
      setManualImages([]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Warning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 text-white relative overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-2 right-2"
        >
          <AlertTriangle className="w-8 h-8 text-red-200" />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-2">🚨 Emergency SOS</h1>
        <p className="text-red-100 mb-2">Use this feature only for genuine emergencies requiring immediate assistance.</p>
        <Badge className="bg-red-900/50 text-red-100 border-red-400">
          Emergency services will be contacted immediately
        </Badge>
      </motion.div>

      {/* Emergency Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="instant" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Instant Alert</span>
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Report Emergency</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="instant">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Emergency Panel */}
            <div className="lg:col-span-2 space-y-6">
          {/* Emergency Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-red-300 bg-gradient-to-br from-red-50 to-orange-50">
              <CardContent className="p-8 text-center">
                <motion.div
                  animate={isEmergencyActive ? { 
                    scale: [1, 1.1, 1], 
                    rotate: [0, 5, -5, 0] 
                  } : {}}
                  transition={{ duration: 0.5, repeat: isEmergencyActive ? Infinity : 0 }}
                  className="relative inline-block"
                >
                  {/* Pulse effect */}
                  {isEmergencyActive && (
                    <>
                      <motion.div
                        animate={{ scale: [1, 2], opacity: [0.7, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-red-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                        className="absolute inset-0 bg-red-400 rounded-full"
                      />
                    </>
                  )}
                  
                  <Button
                    size="lg"
                    disabled={isEmergencyActive}
                    onClick={handleEmergencyAlert}
                    className={`relative w-32 h-32 rounded-full text-xl font-bold shadow-2xl ${
                      isEmergencyActive 
                        ? 'bg-red-700 cursor-not-allowed' 
                        : 'bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 active:scale-95'
                    }`}
                  >
                    {isEmergencyActive ? (
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mb-2"
                        />
                        <span className="text-sm">SENDING</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="w-8 h-8 mb-2" />
                        <span>SOS</span>
                      </div>
                    )}
                  </Button>
                </motion.div>

                <h2 className="text-2xl font-bold text-red-800 mt-6 mb-2">Emergency Alert</h2>
                <p className="text-red-600 mb-4">
                  Press the SOS button to immediately alert emergency services
                </p>
                
                {isEmergencyActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 border border-red-300 rounded-lg p-4 mt-4"
                  >
                    <div className="flex items-center justify-center space-x-2 text-red-800">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                      <span className="font-medium">Connecting to emergency services...</span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Emergency Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Select Emergency Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <button
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full p-4 rounded-lg border-2 transition-all ${
                            selectedCategory === category.id
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-medium text-sm mb-1">{category.label}</h3>
                          <p className="text-xs text-gray-500">Call {category.number}</p>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Your Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {location === 'Fetching location...' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                      />
                      <span className="text-blue-600">{location}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-700 font-medium">Location confirmed: {location}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  This location will be shared with emergency responders
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>Quick Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickContacts.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <motion.div
                      key={contact.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start p-4 h-auto"
                        onClick={() => handleQuickCall(contact.number, contact.name)}
                      >
                        <Icon className="w-5 h-5 mr-3 text-red-600" />
                        <div className="text-left">
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.number}</p>
                        </div>
                        <Phone className="w-4 h-4 ml-auto text-green-600" />
                      </Button>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Safety Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Safety Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Stay calm and move to a safe location</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Provide clear information about the emergency</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Follow instructions from emergency responders</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Do not hang up until told to do so</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Warning */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-orange-800 mb-1">Important Notice</p>
                    <p className="text-xs text-orange-700">
                      False emergency reports are punishable by law. Use this feature responsibly and only for genuine emergencies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="manual">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Manual Emergency Report Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Emergency Category Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-red-300 bg-gradient-to-br from-red-50 to-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span>Emergency Type</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {emergencyCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <motion.div
                            key={category.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <button
                              onClick={() => setSelectedCategory(category.id)}
                              className={`w-full p-4 rounded-lg border-2 transition-all ${
                                selectedCategory === category.id
                                  ? 'border-red-500 bg-red-100'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="font-medium text-sm mb-1">{category.label}</h3>
                              <p className="text-xs text-gray-500">Call {category.number}</p>
                            </button>
                          </motion.div>
                        );
                      })}
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
                      <MapPin className="w-5 h-5 text-red-600" />
                      <span>Emergency Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter emergency location or use GPS"
                        value={manualLocation}
                        onChange={(e) => setManualLocation(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleManualLocationFetch}
                        variant="outline"
                        className="px-6"
                      >
                        <motion.div
                          animate={manualLocation === 'Fetching location...' ? { rotate: 360 } : {}}
                          transition={{ duration: 1, repeat: manualLocation === 'Fetching location...' ? Infinity : 0 }}
                        >
                          <MapPin className="w-4 h-4" />
                        </motion.div>
                      </Button>
                    </div>
                    {manualLocation && manualLocation !== 'Fetching location...' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Emergency location: {manualLocation}</span>
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
                      <Camera className="w-5 h-5 text-red-600" />
                      <span>Emergency Evidence</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors bg-red-50">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleManualImageUpload}
                        className="hidden"
                        id="emergency-image-upload"
                      />
                      <label htmlFor="emergency-image-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-red-400" />
                        <p className="text-lg font-medium text-red-600 mb-2">Upload emergency photos</p>
                        <p className="text-sm text-red-500">Evidence will help emergency responders</p>
                      </label>
                    </div>

                    {manualImages.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-3 gap-2 mt-4"
                      >
                        {manualImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Emergency evidence ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border border-red-200"
                          />
                        ))}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Emergency Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-red-600" />
                      <span>Emergency Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Describe the emergency situation in detail... (injuries, severity, immediate dangers, etc.)"
                      value={manualDescription}
                      onChange={(e) => setManualDescription(e.target.value)}
                      rows={4}
                      className="border-red-200 focus:border-red-500"
                    />
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700">
                        <strong>Important:</strong> Provide as much detail as possible to help emergency responders prepare appropriate assistance.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar for Manual Report */}
            <div className="space-y-6">
              {/* Submit Emergency Report */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-red-300 bg-gradient-to-br from-red-50 to-orange-50">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleManualSubmit}
                        disabled={isManualSubmitting}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 text-lg"
                      >
                        {isManualSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <>
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            Submit Emergency Report
                          </>
                        )}
                      </Button>
                    </motion.div>
                    
                    <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-200">
                      <p className="text-sm text-red-700">
                        {/* 🚨 <strong>Emergency Priority:</strong> This report will be immediately forwarded to relevant emergency services. */}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Emergency Instructions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-700">While You Wait</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-600">Stay calm and move to a safe location if possible</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-600">Keep your phone charged and nearby</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-600">Follow any instructions from emergency responders</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-600">Do not leave the area unless instructed</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Emergency Contacts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span>Emergency Contacts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickContacts.slice(0, 2).map((contact) => {
                      const Icon = contact.icon;
                      return (
                        <Button
                          key={contact.name}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs border-red-200 text-red-700 hover:bg-red-50"
                          onClick={() => handleQuickCall(contact.number, contact.name)}
                        >
                          <Icon className="w-3 h-3 mr-2" />
                          <span>{contact.name}: {contact.number}</span>
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}