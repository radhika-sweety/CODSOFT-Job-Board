import React from 'react';
import { Button } from './ui/button';
import { Bell, User, Briefcase, Search, Menu } from 'lucide-react';
import { useApp } from '../App';
import { Badge } from './ui/badge';

export function Header() {
  const { 
    currentPage, 
    setCurrentPage, 
    currentUser,
    setCurrentUser,
    notifications
  } = useApp();

  const isAuthenticated = !!currentUser;

  const handleLogin = () => {
    setCurrentPage('auth');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg mr-3 shadow-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">JobBoard Pro</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('home')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'home' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('jobs')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'jobs' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Find Jobs
            </button>
            {isAuthenticated && currentUser?.role === 'employer' && (
              <button
                onClick={() => handleNavigation('employer-dashboard')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === 'employer-dashboard' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Employer Dashboard
              </button>
            )}
            {isAuthenticated && currentUser?.role === 'candidate' && (
              <button
                onClick={() => handleNavigation('candidate-dashboard')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === 'candidate-dashboard' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                My Dashboard
              </button>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button
                  onClick={() => handleNavigation('notifications')}
                  className="relative p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                    >
                      {notifications.filter(n => !n.read).length}
                    </Badge>
                  )}
                </button>

                {/* Profile Menu */}
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm text-gray-900">
                      {currentUser?.name || 'User'}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{currentUser?.role}</span>
                  </div>
                  <div className="h-8 w-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-white">
        <nav className="px-4 py-2 space-y-1">
          <button
            onClick={() => handleNavigation('home')}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              currentPage === 'home' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation('jobs')}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              currentPage === 'jobs' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            Find Jobs
          </button>
          {isAuthenticated && (
            <>
              {currentUser?.role === 'employer' && (
                <button
                  onClick={() => handleNavigation('employer-dashboard')}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    currentPage === 'employer-dashboard' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Employer Dashboard
                </button>
              )}
              {currentUser?.role === 'candidate' && (
                <button
                  onClick={() => handleNavigation('candidate-dashboard')}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    currentPage === 'candidate-dashboard' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  My Dashboard
                </button>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}