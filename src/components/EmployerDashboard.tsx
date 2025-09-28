import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus,
  Users, 
  FileText, 
  Eye,
  Settings, 
  Edit3,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Building,
  Search,
  Filter,
  Star
} from 'lucide-react';
import { useApp } from '../App';

export function EmployerDashboard() {
  const { currentUser, jobs, applications, addJob, setCurrentPage } = useApp();
  const [showJobForm, setShowJobForm] = useState(false);
  
  // Filter jobs posted by current employer
  const myJobs = jobs.filter(job => job.employerId === currentUser?.id);
  const myApplications = applications.filter(app => 
    myJobs.some(job => job.id === app.jobId)
  );

  const [jobForm, setJobForm] = useState({
    title: '',
    company: currentUser?.company || '',
    location: '',
    type: 'Full-time' as const,
    level: 'Mid' as const,
    salary: '',
    description: '',
    requirements: [''],
    benefits: [''],
    remote: false,
    category: 'Technology'
  });

  const handleJobFormChange = (field: string, value: any) => {
    setJobForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayFieldChange = (field: 'requirements' | 'benefits', index: number, value: string) => {
    setJobForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'requirements' | 'benefits') => {
    setJobForm(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field: 'requirements' | 'benefits', index: number) => {
    setJobForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob = {
      ...jobForm,
      employerId: currentUser?.id || 'unknown',
      featured: false,
      requirements: jobForm.requirements.filter(req => req.trim() !== ''),
      benefits: jobForm.benefits.filter(benefit => benefit.trim() !== '')
    };

    addJob(newJob);
    setShowJobForm(false);
    setJobForm({
      title: '',
      company: currentUser?.company || '',
      location: '',
      type: 'Full-time',
      level: 'Mid',
      salary: '',
      description: '',
      requirements: [''],
      benefits: [''],
      remote: false,
      category: 'Technology'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
                {currentUser?.company || 'Company'} Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage your job postings and review applications</p>
            </div>
            <Button 
              onClick={() => setShowJobForm(true)} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{myJobs.length}</p>
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
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{myApplications.length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Interviews Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myApplications.filter(app => app.status === 'interview').length}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hired</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myApplications.filter(app => app.status === 'accepted').length}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">My Job Posts</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Job Postings</span>
                  <Badge variant="secondary">{myJobs.length} jobs</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {myJobs.length > 0 ? (
                  <div className="space-y-4">
                    {myJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-gray-900">{job.title}</h4>
                            {job.featured && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {job.type}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.salary}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Posted {job.posted}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {myApplications.filter(app => app.jobId === job.id).length} applicants
                          </span>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings yet</h3>
                    <p className="text-gray-600 mb-4">Create your first job posting to start receiving applications.</p>
                    <Button onClick={() => setShowJobForm(true)} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your First Job
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {myApplications.length > 0 ? (
                  <div className="space-y-4">
                    {myApplications.slice(0, 10).map((application) => {
                      const job = jobs.find(j => j.id === application.jobId);
                      return (
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div>
                            <h4 className="font-medium text-gray-900">Application for {job?.title}</h4>
                            <p className="text-sm text-gray-600">Candidate ID: {application.candidateId}</p>
                            <p className="text-xs text-gray-500">Applied {application.appliedDate}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={getStatusColor(application.status)}>
                              {application.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600 mb-4">Applications will appear here once candidates start applying to your jobs.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Views</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Applications</span>
                      <span className="font-medium">{myApplications.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Conversion Rate</span>
                      <span className="font-medium">3.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. Time to Hire</span>
                      <span className="font-medium">12 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myJobs.slice(0, 3).map((job, index) => (
                      <div key={job.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{job.title}</p>
                          <p className="text-sm text-gray-600">
                            {myApplications.filter(app => app.jobId === job.id).length} applications
                          </p>
                        </div>
                        <Badge variant="outline">#{index + 1}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Job Posting Form Modal */}
        {showJobForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleJobSubmit} className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setShowJobForm(false)}
                  >
                    ×
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={jobForm.title}
                      onChange={(e) => handleJobFormChange('title', e.target.value)}
                      placeholder="e.g. Senior Frontend Developer"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={jobForm.company}
                      onChange={(e) => handleJobFormChange('company', e.target.value)}
                      placeholder="Company name"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={jobForm.location}
                      onChange={(e) => handleJobFormChange('location', e.target.value)}
                      placeholder="e.g. San Francisco, CA or Remote"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input
                      id="salary"
                      value={jobForm.salary}
                      onChange={(e) => handleJobFormChange('salary', e.target.value)}
                      placeholder="e.g. $80,000 - $120,000"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Job Type</Label>
                    <Select value={jobForm.type} onValueChange={(value) => handleJobFormChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="level">Experience Level</Label>
                    <Select value={jobForm.level} onValueChange={(value) => handleJobFormChange('level', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry">Entry</SelectItem>
                        <SelectItem value="Mid">Mid</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={jobForm.category} onValueChange={(value) => handleJobFormChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={jobForm.description}
                    onChange={(e) => handleJobFormChange('description', e.target.value)}
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label>Requirements</Label>
                  {jobForm.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <Input
                        value={req}
                        onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                        placeholder="Add a requirement..."
                      />
                      {jobForm.requirements.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('requirements', index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => addArrayField('requirements')}
                  >
                    Add Requirement
                  </Button>
                </div>

                <div>
                  <Label>Benefits</Label>
                  {jobForm.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <Input
                        value={benefit}
                        onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
                        placeholder="Add a benefit..."
                      />
                      {jobForm.benefits.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('benefits', index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => addArrayField('benefits')}
                  >
                    Add Benefit
                  </Button>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowJobForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Post Job
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}