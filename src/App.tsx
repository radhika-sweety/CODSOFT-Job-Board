import React, { createContext, useContext, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { JobListingsPage } from './components/JobListingsPage';
import { JobDetailPage } from './components/JobDetailPage';
import { EmployerDashboard } from './components/EmployerDashboard';
import { CandidateDashboard } from './components/CandidateDashboard';
import { JobApplicationForm } from './components/JobApplicationForm';
import { AuthPage } from './components/AuthPage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

// Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  level: 'Entry' | 'Mid' | 'Senior' | 'Executive';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  featured: boolean;
  logo?: string;
  remote: boolean;
  category: string;
  employerId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer';
  avatar?: string;
  company?: string;
  title?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  resume?: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  appliedDate: string;
  coverLetter: string;
  resume: string;
  notes?: string;
}

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'appliedDate'>) => void;
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'posted'>) => void;
  notifications: Array<{id: string, message: string, type: 'success' | 'info' | 'error', read: boolean}>;
  addNotification: (message: string, type: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock Data
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    level: 'Senior',
    salary: '₹12,00,000 - ₹16,00,000',
    description: 'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing and maintaining our web applications using modern frameworks and technologies.',
    requirements: [
      '5+ years of experience with React, Vue.js, or Angular',
      'Strong knowledge of JavaScript, HTML5, and CSS3',
      'Experience with TypeScript and modern build tools',
      'Familiarity with testing frameworks',
      'Bachelor\'s degree in Computer Science or related field'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible working hours and remote work options',
      '401(k) with company matching',
      'Professional development budget'
    ],
    posted: '2 days ago',
    featured: true,
    remote: true,
    category: 'Technology',
    employerId: 'emp1'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'Bangalore, Karnataka',
    type: 'Full-time',
    level: 'Mid',
    salary: '₹9,00,000 - ₹13,00,000',
    description: 'Join our product team to drive the development of cutting-edge solutions. You\'ll work closely with engineering, design, and marketing teams to bring innovative products to market.',
    requirements: [
      '3+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with Agile/Scrum methodologies',
      'Excellent communication skills',
      'MBA or equivalent experience preferred'
    ],
    benefits: [
      'Competitive compensation package',
      'Comprehensive health benefits',
      'Stock options',
      'Flexible PTO policy',
      'Learning and development opportunities'
    ],
    posted: '1 day ago',
    featured: true,
    remote: false,
    category: 'Product',
    employerId: 'emp2'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'DesignStudio',
    location: 'Pune, Maharashtra',
    type: 'Full-time',
    level: 'Mid',
    salary: '₹7,00,000 - ₹9,50,000',
    description: 'We\'re seeking a talented UX/UI Designer to create intuitive and beautiful user experiences. You\'ll work on various projects from mobile apps to web platforms.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Sketch, or Adobe Creative Suite',
      'Strong portfolio demonstrating design process',
      'Understanding of user-centered design principles',
      'Experience with design systems'
    ],
    benefits: [
      'Creative and collaborative environment',
      'Health and wellness benefits',
      'Flexible work arrangements',
      'Design tool subscriptions',
      'Conference and workshop budget'
    ],
    posted: '3 days ago',
    featured: true,
    remote: true,
    category: 'Design',
    employerId: 'emp3'
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'DataDriven Inc',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    level: 'Senior',
    salary: '₹13,00,000 - ₹17,00,000',
    description: 'Looking for a Data Scientist to extract insights from large datasets and build machine learning models to drive business decisions.',
    requirements: [
      'PhD or Master\'s in Statistics, Mathematics, or related field',
      'Strong programming skills in Python and R',
      'Experience with machine learning frameworks',
      'Knowledge of SQL and database systems',
      'Strong statistical analysis skills'
    ],
    benefits: [
      'Competitive salary and bonuses',
      'Comprehensive benefits package',
      'Research and development time',
      'Conference attendance',
      'Cutting-edge technology access'
    ],
    posted: '1 week ago',
    featured: false,
    remote: true,
    category: 'Data Science',
    employerId: 'emp4'
  },
  {
    id: '5',
    title: 'Marketing Manager',
    company: 'GrowthCo',
    location: 'Delhi, NCR',
    type: 'Full-time',
    level: 'Mid',
    salary: '₹8,00,000 - ₹11,00,000',
    description: 'Drive our marketing initiatives and help us reach new audiences. You\'ll develop and execute marketing campaigns across multiple channels.',
    requirements: [
      '4+ years of marketing experience',
      'Experience with digital marketing platforms',
      'Strong analytical skills',
      'Excellent written and verbal communication',
      'Bachelor\'s degree in Marketing or related field'
    ],
    benefits: [
      'Performance-based bonuses',
      'Health and dental insurance',
      'Professional development opportunities',
      'Flexible work schedule',
      'Marketing tools and software'
    ],
    posted: '5 days ago',
    featured: false,
    remote: false,
    category: 'Marketing',
    employerId: 'emp5'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    level: 'Senior',
    salary: '₹11,00,000 - ₹15,00,000',
    description: 'Join our infrastructure team to build and maintain scalable, reliable systems. You\'ll work with cutting-edge cloud technologies and automation tools.',
    requirements: [
      '5+ years of DevOps/Infrastructure experience',
      'Strong knowledge of AWS, GCP, or Azure',
      'Experience with containerization (Docker, Kubernetes)',
      'Proficiency in Infrastructure as Code tools',
      'Scripting skills in Python, Bash, or PowerShell'
    ],
    benefits: [
      'Competitive salary',
      'Remote work flexibility',
      'Health and wellness benefits',
      'Professional certifications support',
      'Home office setup budget'
    ],
    posted: '4 days ago',
    featured: false,
    remote: true,
    category: 'Engineering',
    employerId: 'emp6'
  }
];

const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'john.doe@email.com',
    name: 'John Doe',
    role: 'candidate',
    title: 'Frontend Developer',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
    experience: '3 years',
    education: 'Bachelor\'s in Computer Science'
  },
  {
    id: 'emp1',
    email: 'hr@techcorp.com',
    name: 'Sarah Johnson',
    role: 'employer',
    company: 'TechCorp',
    title: 'HR Manager'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'error', read: boolean}>>([]);

  const addApplication = (application: Omit<Application, 'id' | 'appliedDate'>) => {
    const newApplication: Application = {
      ...application,
      id: `app_${Date.now()}`,
      appliedDate: new Date().toISOString()
    };
    setApplications(prev => [...prev, newApplication]);
    
    // Add notification
    addNotification('Application submitted successfully!', 'success');
    toast.success('Application submitted successfully!');
  };

  const addJob = (job: Omit<Job, 'id' | 'posted'>) => {
    const newJob: Job = {
      ...job,
      id: `job_${Date.now()}`,
      posted: 'Just now'
    };
    setJobs(prev => [newJob, ...prev]);
    
    // Add notification
    addNotification('Job posted successfully!', 'success');
    toast.success('Job posted successfully!');
  };

  const addNotification = (message: string, type: 'success' | 'info' | 'error') => {
    const notification = {
      id: `notif_${Date.now()}`,
      message,
      type,
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  // Demo auto-login for showcase
  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(mockUsers[0]);
    }
  }, [currentUser]);

  const contextValue: AppContextType = {
    currentPage,
    setCurrentPage,
    currentUser,
    setCurrentUser,
    selectedJobId,
    setSelectedJobId,
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    typeFilter,
    setTypeFilter,
    applications,
    addApplication,
    jobs,
    addJob,
    notifications,
    addNotification
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'jobs':
        return <JobListingsPage />;
      case 'job-detail':
        return <JobDetailPage />;
      case 'employer-dashboard':
        return <EmployerDashboard />;
      case 'candidate-dashboard':
        return <CandidateDashboard />;
      case 'apply':
        return <JobApplicationForm />;
      case 'auth':
        return <AuthPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          {renderPage()}
        </main>
        <Toaster />
      </div>
    </AppContext.Provider>
  );
}