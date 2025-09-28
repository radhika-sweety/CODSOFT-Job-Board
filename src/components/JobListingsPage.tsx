import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Filter, Search, MapPin, Briefcase, DollarSign, Clock, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../App';
import { JobCard } from './JobCard';

export function JobListingsPage() {
  const { 
    searchQuery, 
    setSearchQuery, 
    locationFilter, 
    setLocationFilter, 
    typeFilter, 
    setTypeFilter,
    jobs
  } = useApp();

  const [sortBy, setSortBy] = useState('recent');
  const [salaryRange, setSalaryRange] = useState('any');
  const [companySize, setCompanySize] = useState('any');
  const [experienceLevel, setExperienceLevel] = useState('any');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !locationFilter || 
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesType = !typeFilter || typeFilter === 'all' || job.type === typeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    });

    // Sort jobs
    switch (sortBy) {
      case 'recent':
        // Sort by posted field (which is a string like "2 days ago")
        // For demo purposes, we'll keep featured jobs first, then reverse order
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
      case 'salary-high':
        filtered.sort((a, b) => {
          const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return salaryB - salaryA;
        });
        break;
      case 'company':
        filtered.sort((a, b) => a.company.localeCompare(b.company));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, locationFilter, typeFilter, sortBy, jobs]);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const locations = ['Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Next Opportunity</h1>
          <p className="text-gray-600">Discover {filteredJobs.length} jobs matching your criteria</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          {/* Main Search */}
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {jobTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-4 gap-4 pt-4 border-t">
              <Select value={salaryRange} onValueChange={setSalaryRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Salary range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Salary</SelectItem>
                  <SelectItem value="0-50k">$0 - $50k</SelectItem>
                  <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                  <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                  <SelectItem value="150k+">$150k+</SelectItem>
                </SelectContent>
              </Select>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger>
                  <SelectValue placeholder="Company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Size</SelectItem>
                  <SelectItem value="startup">Startup (1-50)</SelectItem>
                  <SelectItem value="medium">Medium (51-200)</SelectItem>
                  <SelectItem value="large">Large (201-1000)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (1000+)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Level</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="lead">Lead/Principal</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline"
                onClick={() => {
                  setSalaryRange('any');
                  setCompanySize('any');
                  setExperienceLevel('any');
                  setSearchQuery('');
                  setLocationFilter('');
                  setTypeFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Quick Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                      <SelectItem value="company">Company A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Types */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Job Type</label>
                  <div className="space-y-2">
                    {jobTypes.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={type}
                          checked={typeFilter === type}
                          onCheckedChange={(checked) => setTypeFilter(checked ? type : 'all')}
                        />
                        <label htmlFor={type} className="text-sm text-gray-600">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Locations */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Popular Locations</label>
                  <div className="space-y-2">
                    {locations.map(location => (
                      <button
                        key={location}
                        onClick={() => setLocationFilter(location)}
                        className={`block w-full text-left text-sm px-2 py-1 rounded hover:bg-gray-100 ${
                          locationFilter === location ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Filters */}
                {(searchQuery || locationFilter || typeFilter) && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Active Filters</label>
                    <div className="space-y-2">
                      {searchQuery && (
                        <Badge variant="secondary" className="mr-2 mb-2">
                          Search: {searchQuery}
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {locationFilter && (
                        <Badge variant="secondary" className="mr-2 mb-2">
                          Location: {locationFilter}
                          <button 
                            onClick={() => setLocationFilter('')}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {typeFilter && (
                        <Badge variant="secondary" className="mr-2 mb-2">
                          Type: {typeFilter}
                          <button 
                            onClick={() => setTypeFilter('')}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Job Results */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </p>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Updated 2 hours ago</span>
              </div>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more opportunities.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setLocationFilter('');
                    setTypeFilter('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}