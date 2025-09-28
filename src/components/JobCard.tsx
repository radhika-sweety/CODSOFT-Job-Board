import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Clock, IndianRupee, Building, Star } from 'lucide-react';
import { useApp, Job } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export function JobCard({ job, featured = false }: JobCardProps) {
  const { setCurrentPage, setSelectedJobId } = useApp();

  const handleViewJob = () => {
    setSelectedJobId(job.id);
    setCurrentPage('job-detail');
  };

  const handleQuickApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedJobId(job.id);
    setCurrentPage('apply');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <Card 
      className={`hover:shadow-lg transition-all duration-300 cursor-pointer border ${
        featured ? 'ring-2 ring-blue-200 bg-gradient-to-br from-blue-50 to-white' : 'hover:border-blue-200'
      }`}
      onClick={handleViewJob}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=center`}
                alt={job.company}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 flex items-center">
                <Building className="h-4 w-4 mr-1" />
                {job.company}
              </p>
            </div>
          </div>
          {featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        {/* Job Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {job.type} • {job.posted}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <IndianRupee className="h-4 w-4 mr-2 text-green-600" />
            <span className="font-medium text-green-700">{job.salary}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
            {job.type}
          </Badge>
          {job.remote && (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
              Remote
            </Badge>
          )}
          {job.featured && (
            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
              Quick Hire
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
            {job.level}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
            onClick={handleViewJob}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium"
            onClick={handleQuickApply}
          >
            Quick Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}