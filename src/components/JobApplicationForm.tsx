import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Star,
  Clock,
  DollarSign,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function JobApplicationForm() {
  const { selectedJobId, setCurrentPage, jobs, currentUser, addApplication } = useApp();
  const [submitted, setSubmitted] = useState(false);
  
  const job = jobs.find(j => j.id === selectedJobId);
  
  const [formData, setFormData] = useState({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: '',
    location: '',
    linkedinUrl: '',
    portfolioUrl: '',
    coverLetter: '',
    experience: currentUser?.experience || '',
    expectedSalary: '',
    availableStartDate: '',
    resumeFile: null as File | null,
    portfolioFile: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: 'resumeFile' | 'portfolioFile', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!job || !currentUser) return;

    // Create application
    const application = {
      jobId: job.id,
      candidateId: currentUser.id,
      status: 'pending' as const,
      coverLetter: formData.coverLetter,
      resume: formData.resumeFile?.name || 'resume.pdf',
      notes: `Expected salary: ${formData.expectedSalary}, Available: ${formData.availableStartDate}`
    };

    addApplication(application);
    setSubmitted(true);
  };

  const handleBack = () => {
    if (job) {
      setCurrentPage('job-detail');
    } else {
      setCurrentPage('jobs');
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h1>
          <Button onClick={() => setCurrentPage('jobs')}>
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for applying to the {job.title} position at {job.company}. 
              We'll review your application and get back to you soon.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => setCurrentPage('candidate-dashboard')}>
                View My Applications
              </Button>
              <Button variant="outline" onClick={() => setCurrentPage('jobs')}>
                Browse More Jobs
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Details
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Apply for {job.title}</CardTitle>
                <p className="text-gray-600">Please fill out the form below to submit your application.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="location">Current Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                        <Input
                          id="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                          placeholder="https://linkedin.com/in/yourname"
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolioUrl">Portfolio/Website</Label>
                        <Input
                          id="portfolioUrl"
                          value={formData.portfolioUrl}
                          onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        placeholder="e.g., 3 years"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="expectedSalary">Expected Salary</Label>
                        <Input
                          id="expectedSalary"
                          value={formData.expectedSalary}
                          onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                          placeholder="e.g., $80,000 - $100,000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="availableStartDate">Available Start Date</Label>
                        <Input
                          id="availableStartDate"
                          type="date"
                          value={formData.availableStartDate}
                          onChange={(e) => handleInputChange('availableStartDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Cover Letter */}
                  <div>
                    <Label htmlFor="coverLetter">Cover Letter *</Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                      placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                      rows={6}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.coverLetter.length}/1000 characters
                    </p>
                  </div>

                  <Separator />

                  {/* File Uploads */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                    
                    <div>
                      <Label htmlFor="resume">Resume/CV *</Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="resume" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>Upload a file</span>
                              <input
                                id="resume"
                                name="resume"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange('resumeFile', e.target.files?.[0] || null)}
                                required
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                          {formData.resumeFile && (
                            <p className="text-sm text-green-600 flex items-center justify-center">
                              <FileText className="h-4 w-4 mr-1" />
                              {formData.resumeFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="portfolio">Portfolio (Optional)</Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="portfolio" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>Upload portfolio</span>
                              <input
                                id="portfolio"
                                name="portfolio"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.zip"
                                onChange={(e) => handleFileChange('portfolioFile', e.target.files?.[0] || null)}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, ZIP up to 20MB</p>
                          {formData.portfolioFile && (
                            <p className="text-sm text-green-600 flex items-center justify-center">
                              <FileText className="h-4 w-4 mr-1" />
                              {formData.portfolioFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Job Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=center`}
                      alt={job.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {job.company}
                    </p>
                  </div>
                </div>

                {job.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 mb-4">
                    <Star className="h-3 w-3 mr-1" />
                    Featured Job
                  </Badge>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.type} • {job.level}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">About this role</h4>
                  <p className="text-sm text-gray-600 line-clamp-4">
                    {job.description}
                  </p>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Requirements</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="text-blue-600 text-sm">
                        +{job.requirements.length - 3} more requirements
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}