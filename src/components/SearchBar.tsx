import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { useApp } from '../App';

export function SearchBar() {
  const { 
    searchQuery, 
    setSearchQuery, 
    locationFilter, 
    setLocationFilter, 
    typeFilter, 
    setTypeFilter,
    setCurrentPage 
  } = useApp();

  const handleSearch = () => {
    setCurrentPage('jobs');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">
      <div className="grid md:grid-cols-4 gap-4">
        {/* Job Title/Keywords */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Job title, keywords, or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="City, state, or remote"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Job Type */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="pl-10 h-12 border-gray-200">
              <SelectValue placeholder="Job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button 
          onClick={handleSearch}
          className="h-12 bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Search Jobs
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
        <span className="text-sm text-gray-600 mr-2">Popular searches:</span>
        {['Remote', 'Frontend Developer', 'Product Manager', 'Data Scientist', 'UX Designer'].map((term) => (
          <button
            key={term}
            onClick={() => {
              setSearchQuery(term);
              setCurrentPage('jobs');
            }}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}