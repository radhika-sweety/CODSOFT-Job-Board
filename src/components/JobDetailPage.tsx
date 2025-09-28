import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  Calendar, 
  Share2, 
  Heart,
  ArrowLeft,
  CheckCircle,
  Star
} from 'lucide-react';
import { useApp } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function JobDetailPage() {
  const { selectedJobId, setCurrentPage, setSelectedJobId, jobs } = useApp();
  
  const job = jobs.find(j => j.id === selectedJobId);

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

  const handleApply = () => {
    setCurrentPage('apply');
  };

  const handleBack = () => {
    setCurrentPage('jobs');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={job.logo}
                        alt={job.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                      <div className="flex items-center space-x-4 text-gray-600">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {job.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Job Meta */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Job Type</p>
                      <p className="font-medium">{job.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Salary</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Posted</p>
                      <p className="font-medium">{job.posted}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Applicants</p>
                      <p className="font-medium">24 applied</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800">{job.type}</Badge>
                  {job.location.toLowerCase().includes('remote') && (
                    <Badge className="bg-green-100 text-green-800">Remote</Badge>
                  )}
                  {job.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline">Full Benefits</Badge>
                  <Badge variant="outline">Stock Options</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {job.description}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Do</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Develop and maintain high-quality frontend applications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Collaborate with design and backend teams</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Participate in code reviews and technical discussions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Mentor junior developers and contribute to team growth</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits & Perks</h3>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Culture */}
            <Card>
              <CardHeader>
                <CardTitle>Company Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Work Environment</h4>
                    <p className="text-gray-600 text-sm">
                      Collaborative, fast-paced environment with a focus on innovation and continuous learning.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Team Size</h4>
                    <p className="text-gray-600 text-sm">
                      Join a team of 15 talented engineers working on cutting-edge products.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Growth Opportunities</h4>
                    <p className="text-gray-600 text-sm">
                      Clear career progression paths with mentorship and professional development support.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Work-Life Balance</h4>
                    <p className="text-gray-600 text-sm">
                      Flexible hours, remote work options, and unlimited PTO policy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <Button 
                  onClick={handleApply}
                  className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
                  size="lg"
                >
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full mb-4">
                  Save Job
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Application deadline: <span className="font-medium">Jan 15, 2025</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={job.logo}
                      alt={job.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{job.company}</h4>
                    <p className="text-sm text-gray-600">Technology • 500-1000 employees</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  Leading technology company focused on creating innovative solutions that make a difference in people's lives.
                </p>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Industry</span>
                    <span className="text-sm font-medium">Technology</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Company Size</span>
                    <span className="text-sm font-medium">500-1000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Founded</span>
                    <span className="text-sm font-medium">2015</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Headquarters</span>
                    <span className="text-sm font-medium">San Francisco, CA</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View Company Profile
                </Button>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobs.filter(j => j.id !== job.id).slice(0, 3).map((similarJob) => (
                  <div 
                    key={similarJob.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedJobId(similarJob.id);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{similarJob.title}</h4>
                    <p className="text-xs text-gray-600">{similarJob.company}</p>
                    <p className="text-xs text-gray-500">{similarJob.location}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Similar Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}