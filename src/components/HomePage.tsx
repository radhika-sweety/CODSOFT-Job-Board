import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Search, MapPin, Clock, Star, TrendingUp, Users, Building, Upload, FileText, CheckCircle } from 'lucide-react';
import { useApp } from '../App';
import { SearchBar } from './SearchBar';
import { JobCard } from './JobCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HomePage() {
  const { setCurrentPage, jobs } = useApp();
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const featuredJobs = jobs.filter(job => job.featured).slice(0, 3);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };
  const stats = [
    { label: 'Active Job Listings', value: '2,500+', icon: Building, gradient: 'from-blue-400 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Companies Hiring', value: '850+', icon: TrendingUp, gradient: 'from-green-400 to-green-600', bg: 'bg-green-50' },
    { label: 'Successful Placements', value: '15,000+', icon: Users, gradient: 'from-purple-400 to-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Your
                <span className="block text-yellow-300">Dream Job</span>
                Today
              </h1>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Connect with top employers and discover opportunities that match your skills and ambitions. 
                Your career journey begins here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 px-8 py-4 font-semibold"
                  onClick={() => setCurrentPage('jobs')}
                >
                  Explore Jobs
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4"
                  onClick={() => setCurrentPage('auth')}
                >
                  For Employers
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1683770997177-0603bd44d070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc1OTAxMDg3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional workplace"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-orange-400 to-pink-500 p-6 rounded-xl shadow-lg text-white">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-100">Upload Resume</p>
                      <p className="text-lg font-bold">Quick Apply</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      </section>

      {/* Resume Upload Section */}
      <section className="py-16 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Resume</h2>
            <p className="text-gray-600 mb-6">
              Get matched with relevant job opportunities instantly by uploading your resume
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span className="font-medium">Choose Resume File</span>
                </div>
              </label>
              {resumeFile && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">{resumeFile.name}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className={`text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${stat.bg} hover:scale-105`}>
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-r ${stat.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover hand-picked job opportunities from top companies actively hiring talented professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured />
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => setCurrentPage('jobs')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 shadow-lg text-white font-semibold"
            >
              View All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to find your next opportunity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Search & Discover</h3>
              <p className="text-gray-600">
                Use our advanced search filters to find jobs that match your skills, experience, and preferences.
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-green-400 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Apply with Confidence</h3>
              <p className="text-gray-600">
                Submit your application with our streamlined process and track your progress in real-time.
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-400 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Get Hired</h3>
              <p className="text-gray-600">
                Connect with employers, attend interviews, and land your dream job with our support system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals who have found their dream jobs through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 px-8 font-semibold"
              onClick={() => setCurrentPage('auth')}
            >
              Create Account
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8"
              onClick={() => setCurrentPage('jobs')}
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}