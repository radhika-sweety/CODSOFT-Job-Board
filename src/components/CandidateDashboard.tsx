import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  FileText, 
  Search, 
  Bell, 
  Settings, 
  Edit3,
  Download,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  BookmarkPlus,
  MessageSquare,
  Building,
  Star
} from 'lucide-react';
import { useApp } from '../App';
import { JobCard } from './JobCard';

export function CandidateDashboard() {
  const { currentUser, applications, jobs, setCurrentPage } = useApp();
  
  const appliedJobs = applications.map(app => 
    jobs.find(job => job.id === app.jobId)
  ).filter(Boolean);

  const savedJobs = jobs.filter(job => job.featured).slice(0, 3); // Mock saved jobs
  const recommendedJobs = jobs.slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'interview': return <Calendar className="h-4 w-4" />;
      case 'reviewing': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {currentUser?.name?.split(' ')[0] || 'Candidate'}!
              </h1>
              <p className="text-gray-600 mt-2">Track your applications and discover new opportunities</p>
            </div>
            <Button onClick={() => setCurrentPage('jobs')} className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Browse Jobs
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => app.status === 'interview').length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">127</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Saved Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{savedJobs.length}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <BookmarkPlus className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="applications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="applications">My Applications</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
              </TabsList>

              <TabsContent value="applications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Applications</span>
                      <Badge variant="secondary">{applications.length} total</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {applications.length > 0 ? (
                      <div className="space-y-4">
                        {applications.slice(0, 5).map((application) => {
                          const job = jobs.find(j => j.id === application.jobId);
                          if (!job) return null;
                          
                          return (
                            <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <Building className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                                  <p className="text-sm text-gray-600">{job.company}</p>
                                  <p className="text-xs text-gray-500">Applied {application.appliedDate}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Badge className={getStatusColor(application.status)}>
                                  {getStatusIcon(application.status)}
                                  <span className="ml-1 capitalize">{application.status}</span>
                                </Badge>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-600 mb-4">Start applying to jobs to track your progress here.</p>
                        <Button onClick={() => setCurrentPage('jobs')} className="bg-blue-600 hover:bg-blue-700">
                          Browse Jobs
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommended" className="space-y-4">
                <div className="grid gap-6">
                  {recommendedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-4">
                <div className="grid gap-6">
                  {savedJobs.map((job) => (
                    <JobCard key={job.id} job={job} featured />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Profile completeness</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="w-full" />
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Basic information added</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Skills listed</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>Add work experience</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>Upload profile photo</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
              </CardContent>
            </Card>

            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>
                      {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{currentUser?.name || 'User'}</h3>
                    <p className="text-sm text-gray-600">{currentUser?.title || 'Job Seeker'}</p>
                    <p className="text-xs text-gray-500">{currentUser?.experience || 'Looking for opportunities'}</p>
                  </div>
                </div>
                
                {currentUser?.skills && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {currentUser.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {currentUser.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{currentUser.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}