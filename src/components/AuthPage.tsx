import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Briefcase, User, Mail, Lock, Eye, EyeOff, Github, Chrome } from 'lucide-react';
import { useApp } from '../App';

export function AuthPage() {
  const { setCurrentUser, setCurrentPage } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [accountType, setAccountType] = useState<'candidate' | 'employer'>('candidate');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mock user
    const mockUser = {
      id: `user_${Date.now()}`,
      email: formData.email || 'demo@example.com',
      name: authMode === 'signup' 
        ? `${formData.firstName} ${formData.lastName}` 
        : 'Demo User',
      role: accountType,
      ...(accountType === 'employer' ? { company: formData.company || 'Demo Company' } : {
        title: 'Frontend Developer',
        skills: ['React', 'JavaScript', 'TypeScript'],
        experience: '3 years'
      })
    };

    setCurrentUser(mockUser);
    setCurrentPage(accountType === 'employer' ? 'employer-dashboard' : 'candidate-dashboard');
  };

  const handleSocialAuth = (provider: string) => {
    // Mock social authentication
    const mockUser = {
      id: `user_social_${Date.now()}`,
      email: 'demo@example.com',
      name: 'Demo User',
      role: accountType,
      ...(accountType === 'employer' ? { company: 'Demo Company' } : {
        title: 'Frontend Developer',
        skills: ['React', 'JavaScript', 'TypeScript'],
        experience: '3 years'
      })
    };

    setCurrentUser(mockUser);
    setCurrentPage(accountType === 'employer' ? 'employer-dashboard' : 'candidate-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="bg-blue-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to JobBoard Pro</h1>
          <p className="text-gray-600">
            {authMode === 'signin' ? 'Sign in to your account' : 'Create your account to get started'}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'signin' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Account Type Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">I am a:</Label>
              <RadioGroup value={accountType} onValueChange={(value) => setAccountType(value as 'candidate' | 'employer')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="candidate" id="candidate" />
                  <Label htmlFor="candidate" className="flex items-center cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Job Seeker
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employer" id="employer" />
                  <Label htmlFor="employer" className="flex items-center cursor-pointer">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Employer
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Social Authentication */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialAuth('google')}
              >
                <Chrome className="h-4 w-4 mr-2" />
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialAuth('github')}
              >
                <Github className="h-4 w-4 mr-2" />
                Continue with GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  {accountType === 'employer' && (
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Acme Inc."
                        required
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {authMode === 'signup' && (
                <>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                      required
                    />
                    <Label htmlFor="agreeTerms" className="text-sm text-gray-600">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                      <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </Label>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            {authMode === 'signin' && (
              <div className="text-center">
                <Button variant="link" className="text-sm text-blue-600 hover:underline">
                  Forgot your password?
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              className="text-blue-600 hover:underline font-medium"
            >
              {authMode === 'signin' ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}