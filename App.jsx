import React, { useState, useEffect, useRef } from 'react';

// Icons as simple SVG components
const Icons = {
  Dashboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Tasks: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  MyVAs: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Attendance: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Messaging: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  FileHub: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Training: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  LeaveRequests: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>,
  RequestVA: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
  Announcements: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Invoices: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Support: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Sun: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Send: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  ChevronRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  TrendUp: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  TrendDown: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Lock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Download: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Dollar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  AlertCircle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Filter: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Grid: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  List: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Edit: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Heart: () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  User: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Star: () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

// Mock Data - Rich data for client portal demo
const mockVAs = [
  { id: 1, name: 'Maria Santos', role: 'Executive Assistant', status: 'online', initials: 'MS', hoursThisWeek: 38, email: 'maria@outsourceteams.com', startDate: 'Aug 2024', skills: ['Calendar Management', 'Email', 'Travel'], rating: 4.9, tasksCompleted: 156, responseTime: '< 1 hour' },
  { id: 2, name: 'James Chen', role: 'Marketing Specialist', status: 'online', initials: 'JC', hoursThisWeek: 40, email: 'james@outsourceteams.com', startDate: 'Sep 2024', skills: ['Social Media', 'Content', 'SEO'], rating: 4.8, tasksCompleted: 89, responseTime: '< 2 hours' },
  { id: 3, name: 'Sofia Rodriguez', role: 'Customer Support Lead', status: 'online', initials: 'SR', hoursThisWeek: 35, email: 'sofia@outsourceteams.com', startDate: 'Jul 2024', skills: ['Zendesk', 'Live Chat', 'CRM'], rating: 5.0, tasksCompleted: 234, responseTime: '< 30 min' },
];

const mockTasks = {
  todo: [
    { id: 1, title: 'Create social media content calendar', assignee: 'Maria Santos', initials: 'MS', subtasks: '0/3', dueDate: 'Jan 20', priority: 'high', comments: 2 },
    { id: 2, title: 'Prepare quarterly report draft', assignee: 'James Chen', initials: 'JC', subtasks: '1/4', dueDate: 'Jan 22', priority: 'medium', comments: 0 },
  ],
  inProgress: [
    { id: 3, title: 'Update company website copy', assignee: 'Sofia Rodriguez', initials: 'SR', subtasks: '2/5', dueDate: 'Jan 18', priority: 'high', comments: 4 },
    { id: 4, title: 'Process customer refund requests', assignee: 'Maria Santos', initials: 'MS', subtasks: '3/6', dueDate: 'Jan 17', priority: 'medium', comments: 1 },
    { id: 5, title: 'Design email newsletter template', assignee: 'James Chen', initials: 'JC', subtasks: '1/3', dueDate: 'Jan 19', priority: 'low', comments: 3 },
  ],
  review: [
    { id: 6, title: 'Review LinkedIn ad campaign results', assignee: 'James Chen', initials: 'JC', subtasks: '4/4', dueDate: 'Jan 16', priority: 'high', comments: 5 },
    { id: 7, title: 'Finalize vendor contracts', assignee: 'Maria Santos', initials: 'MS', subtasks: '2/2', dueDate: 'Jan 17', priority: 'medium', comments: 2 },
  ],
  completed: [
    { id: 8, title: 'Set up CRM automation workflows', assignee: 'Sofia Rodriguez', initials: 'SR', subtasks: '5/5', dueDate: 'Jan 14', priority: 'high', comments: 6 },
    { id: 9, title: 'Create onboarding documentation', assignee: 'Maria Santos', initials: 'MS', subtasks: '3/3', dueDate: 'Jan 12', priority: 'medium', comments: 4 },
    { id: 10, title: 'Schedule Q1 planning meetings', assignee: 'James Chen', initials: 'JC', subtasks: '4/4', dueDate: 'Jan 10', priority: 'low', comments: 1 },
  ],
};

const mockTimesheets = [
  { id: 1, employee: 'Maria Santos', initials: 'MS', period: 'Jan 13 - Jan 19, 2026', billableHours: 38.5, overtime: 2.5, status: 'pending' },
  { id: 2, employee: 'James Chen', initials: 'JC', period: 'Jan 13 - Jan 19, 2026', billableHours: 40.0, overtime: 0, status: 'pending' },
  { id: 3, employee: 'Sofia Rodriguez', initials: 'SR', period: 'Jan 13 - Jan 19, 2026', billableHours: 35.0, overtime: 0, status: 'approved' },
  { id: 4, employee: 'Maria Santos', initials: 'MS', period: 'Jan 6 - Jan 12, 2026', billableHours: 37.5, overtime: 1.5, status: 'approved' },
  { id: 5, employee: 'James Chen', initials: 'JC', period: 'Jan 6 - Jan 12, 2026', billableHours: 40.0, overtime: 3.0, status: 'approved' },
  { id: 6, employee: 'Sofia Rodriguez', initials: 'SR', period: 'Jan 6 - Jan 12, 2026', billableHours: 36.0, overtime: 1.0, status: 'approved' },
  { id: 7, employee: 'Maria Santos', initials: 'MS', period: 'Dec 30 - Jan 5, 2026', billableHours: 32.0, overtime: 0, status: 'approved' },
  { id: 8, employee: 'James Chen', initials: 'JC', period: 'Dec 30 - Jan 5, 2026', billableHours: 38.5, overtime: 2.0, status: 'approved' },
];

const mockConversations = [
  { id: 1, name: 'Maria Santos', preview: "I'll have the draft ready by 3 PM...", time: '9:51 AM', badge: 'va', status: 'online', unread: 0 },
  { id: 2, name: 'James Chen', preview: 'The social media report is complete', time: '2h ago', badge: 'va', status: 'online', unread: 2 },
  { id: 3, name: 'Sofia Rodriguez', preview: 'All support tickets resolved!', time: '1d ago', badge: 'va', status: 'online', unread: 0 },
];

const mockFiles = [
  { id: 1, name: 'Q4 Financial Report.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: 'Maria Santos', date: 'Jan 15, 2026', category: 'Reports' },
  { id: 2, name: 'Marketing Strategy 2026.pptx', type: 'pptx', size: '8.1 MB', uploadedBy: 'James Chen', date: 'Jan 14, 2026', category: 'Presentations' },
  { id: 3, name: 'Customer Database.xlsx', type: 'xlsx', size: '1.2 MB', uploadedBy: 'Sofia Rodriguez', date: 'Jan 13, 2026', category: 'Data' },
  { id: 4, name: 'Brand Guidelines.pdf', type: 'pdf', size: '5.7 MB', uploadedBy: 'Maria Santos', date: 'Jan 10, 2026', category: 'Brand' },
  { id: 5, name: 'Meeting Notes - Jan 12.docx', type: 'docx', size: '156 KB', uploadedBy: 'James Chen', date: 'Jan 12, 2026', category: 'Documents' },
  { id: 6, name: 'Social Media Calendar.xlsx', type: 'xlsx', size: '890 KB', uploadedBy: 'James Chen', date: 'Jan 9, 2026', category: 'Marketing' },
  { id: 7, name: 'Client Contracts Archive.pdf', type: 'pdf', size: '12.3 MB', uploadedBy: 'Maria Santos', date: 'Jan 8, 2026', category: 'Contracts' },
  { id: 8, name: 'Team Performance Review.docx', type: 'docx', size: '245 KB', uploadedBy: 'Sofia Rodriguez', date: 'Jan 7, 2026', category: 'HR' },
];

const mockTrainingModules = [
  { id: 1, title: 'Company Onboarding', description: 'Introduction to company policies, tools, and processes', modules: 5, completion: 100, vas: ['Maria Santos', 'James Chen', 'Sofia Rodriguez'] },
  { id: 2, title: 'CRM System Training', description: 'How to use our CRM for customer management', modules: 8, completion: 85, vas: ['Maria Santos', 'Sofia Rodriguez'] },
  { id: 3, title: 'Email Marketing Best Practices', description: 'Guidelines for effective email campaigns', modules: 4, completion: 60, vas: ['James Chen'] },
  { id: 4, title: 'Customer Support Procedures', description: 'Standard procedures for handling customer inquiries', modules: 6, completion: 100, vas: ['Sofia Rodriguez'] },
  { id: 5, title: 'Social Media Management', description: 'Brand voice and content guidelines for social platforms', modules: 3, completion: 75, vas: ['James Chen', 'Maria Santos'] },
  { id: 6, title: 'Project Management Tools', description: 'Using Asana, Trello, and other PM software effectively', modules: 4, completion: 50, vas: ['Maria Santos', 'James Chen'] },
  { id: 7, title: 'Data Entry Standards', description: 'Accuracy and efficiency guidelines for data management', modules: 3, completion: 90, vas: ['Sofia Rodriguez', 'Maria Santos'] },
];

const mockLeaveRequests = [
  { id: 1, employee: 'Maria Santos', initials: 'MS', dates: 'Feb 10 - Feb 14, 2026', days: 5, reason: 'Annual Leave - Family vacation', status: 'pending', notes: '', type: 'Annual' },
  { id: 2, employee: 'James Chen', initials: 'JC', dates: 'Feb 20 - Feb 21, 2026', days: 2, reason: 'Personal Leave - Moving house', status: 'pending', notes: '', type: 'Personal' },
  { id: 3, employee: 'Sofia Rodriguez', initials: 'SR', dates: 'Jan 8 - Jan 9, 2026', days: 2, reason: 'Sick Leave', status: 'approved', notes: 'Approved - Feel better!', type: 'Sick' },
  { id: 4, employee: 'James Chen', initials: 'JC', dates: 'Jan 3, 2026', days: 1, reason: 'Personal Leave - Medical appointment', status: 'approved', notes: 'Approved', type: 'Personal' },
  { id: 5, employee: 'Maria Santos', initials: 'MS', dates: 'Dec 23 - Dec 27, 2025', days: 3, reason: 'Annual Leave - Christmas break', status: 'approved', notes: 'Enjoy the holidays!', type: 'Annual' },
];

const mockVARequests = [
  { id: 1, role: 'Content Writer', skills: 'Blog writing, SEO, WordPress', hours: '20h/wk', startDate: 'ASAP', status: 'submitted', submitted: 'Jan 15, 2026', budget: '$15-20/hr', description: 'Looking for an experienced content writer to help with blog posts and website content.' },
  { id: 2, role: 'Graphic Designer', skills: 'Adobe Creative Suite, Canva, Brand design', hours: '30h/wk', startDate: 'Feb 1, 2026', status: 'in-review', submitted: 'Jan 10, 2026', budget: '$20-30/hr', description: 'Need a designer for social media graphics and marketing materials.' },
  { id: 3, role: 'Bookkeeper', skills: 'QuickBooks, Excel, Financial reporting', hours: '15h/wk', startDate: 'Feb 15, 2026', status: 'matched', submitted: 'Jan 5, 2026', budget: '$18-25/hr', description: 'Looking for bookkeeper to manage monthly financial records.' },
  { id: 4, role: 'Social Media Manager', skills: 'Instagram, LinkedIn, Content scheduling, Analytics', hours: '25h/wk', startDate: 'Mar 1, 2026', status: 'submitted', submitted: 'Jan 14, 2026', budget: '$15-22/hr', description: 'Need someone to manage our social media presence across platforms.' },
];

const mockAnnouncements = [
  { id: 1, title: 'New Client Portal Features Released!', category: 'Update', date: 'Jan 16, 2026', readTime: '2 min', pinned: true, content: "We're excited to announce new task management features and an improved messaging system. Check out the updates!", reactions: { heart: 12, celebrate: 8 }, image: true },
  { id: 2, title: 'Holiday Schedule 2026', category: 'Info', date: 'Jan 10, 2026', readTime: '1 min', pinned: false, content: 'Please review the upcoming holiday schedule. VAs will have limited availability during these dates.', reactions: { heart: 5 }, image: false },
  { id: 3, title: 'Tips for Effective Task Delegation', category: 'Guide', date: 'Jan 5, 2026', readTime: '5 min', pinned: false, content: 'Learn how to get the most out of your virtual assistants with these delegation best practices.', reactions: { heart: 23, celebrate: 15 }, image: false },
  { id: 4, title: 'New Training Resources Available', category: 'Update', date: 'Jan 3, 2026', readTime: '3 min', pinned: false, content: 'We have added new training modules for CRM systems and project management tools. Assign them to your VAs today!', reactions: { heart: 18 }, image: false },
  { id: 5, title: 'Security Best Practices Reminder', category: 'Info', date: 'Dec 28, 2025', readTime: '2 min', pinned: false, content: 'A reminder to review password policies and enable two-factor authentication for all team accounts.', reactions: { heart: 8, celebrate: 3 }, image: false },
];

const mockInvoices = [
  { id: 'INV-2026-003', date: 'Jan 15, 2026', dueDate: 'Jan 30, 2026', amount: 4850.00, status: 'pending', items: [
    { description: 'Maria Santos - Executive Assistant (38h)', amount: 1900.00 },
    { description: 'James Chen - Marketing Specialist (40h)', amount: 1800.00 },
    { description: 'Sofia Rodriguez - Customer Support (35h)', amount: 1150.00 },
  ]},
  { id: 'INV-2026-002', date: 'Jan 1, 2026', dueDate: 'Jan 15, 2026', amount: 4650.00, status: 'paid', items: [] },
  { id: 'INV-2025-012', date: 'Dec 15, 2025', dueDate: 'Dec 30, 2025', amount: 4200.00, status: 'paid', items: [] },
  { id: 'INV-2025-011', date: 'Dec 1, 2025', dueDate: 'Dec 15, 2025', amount: 4200.00, status: 'paid', items: [] },
  { id: 'INV-2025-010', date: 'Nov 15, 2025', dueDate: 'Nov 30, 2025', amount: 3950.00, status: 'paid', items: [] },
  { id: 'INV-2025-009', date: 'Nov 1, 2025', dueDate: 'Nov 15, 2025', amount: 3800.00, status: 'paid', items: [] },
];

const mockTickets = [
  { id: 'TKT-2026-001', title: 'Question about timesheet approval process', description: "I'm not sure how to approve timesheets in bulk. Is there a way to do this?", category: 'How-to', priority: 'low', status: 'resolved', created: 'Jan 14, 2026', responses: 2 },
  { id: 'TKT-2026-002', title: 'Need to update VA schedule', description: 'Can we adjust the working hours for one of my VAs? They need to shift their schedule by 2 hours.', category: 'Request', priority: 'medium', status: 'open', created: 'Jan 16, 2026', responses: 1 },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
  { id: 'tasks', label: 'Tasks', icon: Icons.Tasks },
  { id: 'my-vas', label: 'My VAs', icon: Icons.MyVAs },
  { id: 'attendance', label: 'Attendance', icon: Icons.Attendance },
  { id: 'messaging', label: 'Messaging', icon: Icons.Messaging },
  { id: 'file-hub', label: 'File Hub', icon: Icons.FileHub },
  { id: 'training', label: 'Training Manager', icon: Icons.Training },
  { id: 'leave-requests', label: 'VA Leave Requests', icon: Icons.LeaveRequests },
  { id: 'request-va', label: 'Request VA', icon: Icons.RequestVA },
  { id: 'announcements', label: 'Announcements', icon: Icons.Announcements },
  { id: 'invoices', label: 'Invoices', icon: Icons.Invoices },
  { id: 'support', label: 'Support', icon: Icons.Support },
];

// Page Components
const DashboardPage = ({ darkMode }) => (
  <div className="content-area">
    <div className="welcome-section">
      <p className="welcome-greeting">Good morning,</p>
      <h2 className="welcome-name">Brad</h2>
      <p className="welcome-subtitle">Here's what's happening with your virtual assistants</p>
    </div>

    <div className="stats-grid">
      {[
        { label: 'Active Tasks', value: '18', change: '+5.2% vs last month', positive: true, icon: 'tasks' },
        { label: 'My VAs', value: '3', change: '— vs last month', positive: null, icon: 'vas' },
        { label: 'Outstanding Invoices', value: '1', change: '-2.1% vs last month', positive: true, icon: 'invoices' },
        { label: 'This Month', value: '156h', change: '+12% vs last month', positive: true, icon: 'hours' },
      ].map((stat, i) => (
        <div key={i} className="stat-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="stat-card-header">
            <span className="stat-label">{stat.label}</span>
            <div className={`stat-icon ${stat.icon}`}>
              {stat.icon === 'tasks' && <Icons.Tasks />}
              {stat.icon === 'vas' && <Icons.MyVAs />}
              {stat.icon === 'invoices' && <Icons.Dollar />}
              {stat.icon === 'hours' && <Icons.Clock />}
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.positive === true ? 'positive' : stat.positive === false ? 'negative' : 'neutral'}`}>
            {stat.positive !== null && (stat.positive ? <Icons.TrendUp /> : <Icons.TrendDown />)}
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="charts-grid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Icons.TrendUp /> Task Progress</h3>
          <select className="select"><option>7 days</option></select>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <svg viewBox="0 0 400 140" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#35797b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#35797b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 110 Q 60 100 120 85 T 240 60 T 360 40 L 400 35 L 400 140 L 0 140 Z" fill="url(#gradient)" />
              <path d="M 0 110 Q 60 100 120 85 T 240 60 T 360 40 L 400 35" fill="none" stroke="#35797b" strokeWidth="3" />
              <circle cx="120" cy="85" r="4" fill="#35797b" />
              <circle cx="240" cy="60" r="4" fill="#35797b" />
              <circle cx="360" cy="40" r="4" fill="#35797b" />
            </svg>
          </div>
          <div className="chart-labels">
            <span>Jan 12</span><span>Jan 13</span><span>Jan 14</span><span>Jan 15</span><span>Jan 16</span><span>Jan 17</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Icons.Dollar /> Invoice Status</h3>
        </div>
        <div className="card-body">
          <div className="donut-container">
            <svg viewBox="0 0 100 100" className="donut-chart">
              <circle cx="50" cy="50" r="35" fill="none" stroke={darkMode ? '#374151' : '#e5e7eb'} strokeWidth="12" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="176 220" strokeDashoffset="0" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="44 220" strokeDashoffset="-176" transform="rotate(-90 50 50)" />
            </svg>
            <div className="donut-legend">
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#10b981'}}></span> Paid <strong>$13,050</strong></div>
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#f59e0b'}}></span> Pending <strong>$4,850</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Icons.Clock /> VA Hours</h3>
        </div>
        <div className="card-body">
          <div className="va-hours-list">
            {mockVAs.map((va, i) => (
              <div key={va.id} className="va-hours-item">
                <div className="avatar gradient" style={{ width: 36, height: 36, fontSize: 12 }}>{va.initials}</div>
                <div className="va-hours-info">
                  <span className="va-hours-name">{va.name}</span>
                  <div className="va-hours-bar">
                    <div className="va-hours-fill" style={{ width: `${(va.hoursThisWeek / 40) * 100}%` }}></div>
                  </div>
                </div>
                <span className="va-hours-value">{va.hoursThisWeek}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="dashboard-bottom">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Upcoming Deadlines</h3>
          <button className="btn-link">View all <Icons.ChevronRight /></button>
        </div>
        <div className="card-body">
          {mockTasks.inProgress.slice(0, 3).map((task, i) => (
            <div key={task.id} className="deadline-item">
              <div className={`deadline-indicator ${task.priority}`}></div>
              <div className="deadline-info">
                <span className="deadline-title">{task.title}</span>
                <span className="deadline-assignee">{task.assignee}</span>
              </div>
              <span className={`deadline-date ${task.priority === 'high' ? 'urgent' : ''}`}>{task.dueDate}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Your VAs</h3>
          <button className="btn-link">View all <Icons.ChevronRight /></button>
        </div>
        <div className="card-body">
          {mockVAs.map((va) => (
            <div key={va.id} className="va-mini-card">
              <div className="avatar-container">
                <div className="avatar gradient">{va.initials}</div>
                <div className="online-indicator"></div>
              </div>
              <div className="va-mini-info">
                <span className="va-mini-name">{va.name}</span>
                <span className="va-mini-role">{va.role}</span>
              </div>
              <span className="va-mini-status">Online</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TasksPage = () => {
  const columns = [
    { id: 'todo', title: 'To Do', color: '#6b7280', tasks: mockTasks.todo },
    { id: 'inProgress', title: 'In Progress', color: '#35797b', tasks: mockTasks.inProgress },
    { id: 'review', title: 'Review', color: '#f59e0b', tasks: mockTasks.review },
    { id: 'completed', title: 'Completed', color: '#10b981', tasks: mockTasks.completed },
  ];

  return (
    <div className="content-area tasks-page">
      <div className="page-header">
        <div>
          <h2 className="page-heading">My Tasks</h2>
          <p className="page-subtitle">{Object.values(mockTasks).flat().length} tasks found</p>
        </div>
        <button className="btn btn-primary"><Icons.Plus /> Create Task</button>
      </div>

      <div className="task-filters">
        <button className="filter-chip"><Icons.Filter /> Filters</button>
        <button className="filter-chip active">My Tasks</button>
        <button className="filter-chip">Recently Updated</button>
        <button className="filter-chip">High Priority</button>
        <button className="filter-chip">Overdue</button>
        <button className="filter-chip">Blocked</button>
      </div>

      <div className="kanban-board">
        {columns.map((column) => (
          <div key={column.id} className="kanban-column">
            <div className="kanban-column-header">
              <span className="kanban-dot" style={{ background: column.color }}></span>
              <h3>{column.title}</h3>
              <span className="kanban-count">{column.tasks.length}</span>
            </div>
            <div className="kanban-tasks">
              {column.tasks.map((task) => (
                <div key={task.id} className={`kanban-card priority-${task.priority}`}>
                  <h4>{task.title}</h4>
                  <div className="kanban-card-meta">
                    <span className="kanban-subtasks"><Icons.Check /> {task.subtasks}</span>
                    <span className="kanban-comments"><Icons.Messaging /> {task.comments}</span>
                  </div>
                  <div className="kanban-card-footer">
                    <div className="avatar gradient" style={{ width: 24, height: 24, fontSize: 10 }}>{task.initials}</div>
                    <span className="kanban-assignee">{task.assignee.split(' ')[0]}</span>
                    <span className={`kanban-due ${task.priority === 'high' ? 'urgent' : ''}`}><Icons.Calendar /> {task.dueDate}</span>
                  </div>
                </div>
              ))}
              {column.tasks.length === 0 && (
                <div className="kanban-empty">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MyVAsPage = () => (
  <div className="content-area page-content">
    <div className="page-header">
      <div>
        <h2 className="page-heading">My Virtual Assistants</h2>
        <p className="page-subtitle">{mockVAs.length} team members</p>
      </div>
      <button className="btn btn-primary"><Icons.Plus /> Request New VA</button>
    </div>

    <div className="stats-grid" style={{ marginBottom: 24 }}>
      {[
        { label: 'Total VAs', value: '3', change: 'Active team members', positive: null, icon: 'vas' },
        { label: 'Total Hours', value: '113h', change: 'This week', positive: true, icon: 'hours' },
        { label: 'Avg Rating', value: '4.9', change: 'Team performance', positive: true, icon: 'star' },
        { label: 'Tasks Done', value: '479', change: 'All time', positive: true, icon: 'tasks' },
      ].map((stat, i) => (
        <div key={i} className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">{stat.label}</span>
            <div className={`stat-icon ${stat.icon === 'star' ? 'warning' : 'primary'}`}>
              {stat.icon === 'vas' && <Icons.MyVAs />}
              {stat.icon === 'hours' && <Icons.Clock />}
              {stat.icon === 'star' && <Icons.Star />}
              {stat.icon === 'tasks' && <Icons.Check />}
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.positive === true ? 'positive' : stat.positive === false ? 'negative' : 'neutral'}`}>
            {stat.positive === true && <Icons.TrendUp />}
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="va-grid">
      {mockVAs.map((va, i) => (
        <div key={va.id} className="va-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="va-header">
            <div className="avatar-container">
              <div className="avatar gradient large">{va.initials}</div>
              <div className="online-indicator large"></div>
            </div>
            <div className="va-info">
              <h4>{va.name}</h4>
              <p>{va.role}</p>
              <span className="va-status-badge online">Online</span>
            </div>
          </div>
          <div className="va-skills">
            {va.skills.map((skill, idx) => (
              <span key={idx} className="skill-tag">{skill}</span>
            ))}
          </div>
          <div className="va-stats-row">
            <div className="va-stat-item">
              <span className="va-stat-value">{va.tasksCompleted}</span>
              <span className="va-stat-label">Tasks</span>
            </div>
            <div className="va-stat-item">
              <span className="va-stat-value">{va.rating}</span>
              <span className="va-stat-label">Rating</span>
            </div>
            <div className="va-stat-item">
              <span className="va-stat-value">{va.hoursThisWeek}h</span>
              <span className="va-stat-label">This Week</span>
            </div>
          </div>
          <div className="va-details">
            <div className="va-detail-row">
              <span className="va-detail-label">Response Time</span>
              <span className="va-detail-value">{va.responseTime}</span>
            </div>
            <div className="va-detail-row">
              <span className="va-detail-label">Start Date</span>
              <span className="va-detail-value">{va.startDate}</span>
            </div>
          </div>
          <button className="btn btn-secondary full-width"><Icons.Messaging /> Send Message</button>
        </div>
      ))}
    </div>
  </div>
);

const AttendancePage = () => (
  <div className="content-area page-content">
    <div className="page-header">
      <div>
        <h2 className="page-heading">Attendance</h2>
        <p className="page-subtitle">Review and approve team timesheets</p>
      </div>
      <button className="btn btn-primary"><Icons.Download /> Export Report</button>
    </div>

    <div className="stats-grid" style={{ marginBottom: 24 }}>
      {[
        { label: 'Team', value: '3', change: 'Active', positive: true, icon: 'vas' },
        { label: 'Pending', value: '2', change: 'Needs review', positive: null, icon: 'clock' },
        { label: 'Billable', value: '113.5h', change: 'This period', positive: true, icon: 'hours' },
        { label: 'Overtime', value: '2.5h', change: 'Extra hours', positive: false, icon: 'alert' },
      ].map((stat, i) => (
        <div key={i} className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">{stat.label}</span>
            <div className={`stat-icon ${stat.icon === 'alert' ? 'danger' : stat.icon === 'clock' ? 'warning' : 'primary'}`}>
              {stat.icon === 'vas' && <Icons.MyVAs />}
              {stat.icon === 'clock' && <Icons.Clock />}
              {stat.icon === 'hours' && <Icons.TrendUp />}
              {stat.icon === 'alert' && <Icons.AlertCircle />}
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.positive === true ? 'positive' : stat.positive === false ? 'negative' : 'neutral'}`}>
            {stat.positive === true && <Icons.TrendUp />}
            {stat.positive === false && <Icons.AlertCircle />}
            {stat.positive === null && <Icons.Clock />}
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="card">
      <div className="card-header">
        <h3 className="card-title">All Timesheets</h3>
        <div className="header-actions">
          <div className="search-bar small">
            <Icons.Search />
            <input type="text" placeholder="Search by name..." />
          </div>
          <select className="select"><option>All Status</option></select>
        </div>
      </div>
      <div className="card-body" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Team Member</th>
              <th>Period</th>
              <th>Billable Hours</th>
              <th>Overtime</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockTimesheets.map(ts => (
              <tr key={ts.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="avatar gradient" style={{ width: 36, height: 36, fontSize: 12 }}>{ts.initials}</div>
                    <span style={{ fontWeight: 600 }}>{ts.employee}</span>
                  </div>
                </td>
                <td>{ts.period}</td>
                <td>
                  <div className="hours-with-bar">
                    <div className="hours-bar"><div className="hours-fill" style={{ width: `${(ts.billableHours / 40) * 100}%` }}></div></div>
                    <span>{ts.billableHours}h</span>
                  </div>
                </td>
                <td>{ts.overtime > 0 ? `${ts.overtime}h` : '-'}</td>
                <td><span className={`status-badge ${ts.status}`}><span className="status-dot"></span>{ts.status}</span></td>
                <td>
                  <button className="btn btn-secondary small"><Icons.Eye /> View</button>
                  {ts.status === 'pending' && <button className="btn btn-primary small" style={{ marginLeft: 8 }}>Approve</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const MessagingPage = ({ darkMode }) => {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Good morning! I've completed the quarterly report and sent it to the team. Is there anything else you need?", sent: false, time: '9:32 AM' },
    { id: 2, text: 'Thanks Maria! Could you also prepare the client presentation for tomorrow?', sent: true, time: '9:45 AM' },
    { id: 3, text: "Of course! I'll have the draft ready by 3 PM for your review. Should I include the latest sales figures?", sent: false, time: '9:47 AM' },
    { id: 4, text: 'Yes please, and add the customer testimonials from last month.', sent: true, time: '9:50 AM' },
    { id: 5, text: "Perfect, I'll include those. I'll send you a notification when it's ready!", sent: false, time: '9:51 AM' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "Got it! I'll get started on that right away.",
        "Absolutely, I'll have that ready for you shortly!",
        "No problem! Is there anything specific you'd like me to focus on?",
        "Sure thing! I'll send you an update once it's done.",
        "Perfect, I'll prioritize this. Expect an update within the hour!"
      ];
      const reply = {
        id: messages.length + 2,
        text: replies[Math.floor(Math.random() * replies.length)],
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="content-area messaging-page">
      <div className="messaging-container">
        <div className="conversations-list">
          <div className="conversations-header">
            <h2>Messages</h2>
            <button className="new-chat-btn"><Icons.Plus /></button>
          </div>
          <input type="text" className="search-input" placeholder="Search conversations..." />
          <div className="filter-tabs">
            <button className="filter-tab active">All <span className="filter-count">{mockConversations.length}</span></button>
            <button className="filter-tab">VAs <span className="filter-count">{mockConversations.length}</span></button>
          </div>
          <div className="conversations-scroll">
            {mockConversations.map(conv => (
              <div
                key={conv.id}
                className={`conversation-item ${activeConversation.id === conv.id ? 'active' : ''}`}
                onClick={() => setActiveConversation(conv)}
              >
                <div className="avatar-container">
                  <div className="avatar gradient">{conv.name.split(' ').map(n => n[0]).join('')}</div>
                  {conv.status === 'online' && <div className="online-indicator"></div>}
                </div>
                <div className="conversation-info">
                  <div className="conversation-name">{conv.name}</div>
                  <div className="conversation-preview">{conv.preview}</div>
                </div>
                <div className="conversation-meta">
                  <div className="conversation-time">{conv.time}</div>
                  {conv.unread > 0 && <span className="unread-badge">{conv.unread}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-area">
          <div className="chat-header">
            <div className="avatar-container">
              <div className="avatar gradient">{activeConversation.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="online-indicator"></div>
            </div>
            <div className="chat-user-info">
              <h3>{activeConversation.name}</h3>
              <p>Online</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sent ? 'sent' : 'received'}`}>
                {!msg.sent && <div className="avatar gradient" style={{ width: 32, height: 32, fontSize: 12 }}>{activeConversation.name.split(' ').map(n => n[0]).join('')}</div>}
                <div>
                  <div className="message-content">{msg.text}</div>
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message received">
                <div className="avatar gradient" style={{ width: 32, height: 32, fontSize: 12 }}>{activeConversation.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
            </div>
            <button className="send-btn" onClick={handleSend} disabled={!inputValue.trim()}>
              <Icons.Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileHubPage = () => (
  <div className="content-area page-content">
    <div className="page-header">
      <div>
        <h2 className="page-heading">File Hub</h2>
        <p className="page-subtitle">{mockFiles.length} files</p>
      </div>
      <button className="btn btn-primary"><Icons.Plus /> Upload</button>
    </div>

    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Total Files</span>
          <div className="stat-icon primary"><Icons.FileHub /></div>
        </div>
        <div className="stat-value">{mockFiles.length}</div>
        <div className="stat-change neutral"><span>All files</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Storage Used</span>
          <div className="stat-icon warning"><Icons.TrendUp /></div>
        </div>
        <div className="stat-value">30.9 MB</div>
        <div className="stat-change neutral"><span>of 1 GB</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Shared Files</span>
          <div className="stat-icon success"><Icons.MyVAs /></div>
        </div>
        <div className="stat-value">5</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>With team</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">This Week</span>
          <div className="stat-icon primary"><Icons.Clock /></div>
        </div>
        <div className="stat-value">3</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>New uploads</span></div>
      </div>
    </div>

    <div className="file-hub-layout">
      <div className="file-categories">
        <h4>Categories</h4>
        {['All Files', 'Reports', 'Presentations', 'Data', 'Documents', 'Marketing', 'Contracts', 'HR'].map((cat, i) => (
          <div key={cat} className={`file-category-item ${i === 0 ? 'active' : ''}`}>
            <Icons.FileHub />
            <span>{cat}</span>
            <span className="category-count">{i === 0 ? mockFiles.length : Math.floor(Math.random() * 3) + 1}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ flex: 1 }}>
        <div className="card-header">
          <h3 className="card-title">Recent Files</h3>
          <div className="search-bar small">
            <Icons.Search />
            <input type="text" placeholder="Search files..." />
          </div>
        </div>
        <div className="card-body">
          {mockFiles.map((file, i) => (
            <div key={file.id} className="list-item animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`file-icon ${file.type}`}>{file.type}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{file.name}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{file.size} • {file.uploadedBy}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>{file.date}</div>
              <button className="btn btn-secondary" style={{ padding: '8px 12px' }}><Icons.Download /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TrainingPage = () => (
  <div className="content-area page-content">
    <div className="page-header">
      <div>
        <h2 className="page-heading">Training Manager</h2>
        <p className="page-subtitle">{mockTrainingModules.length} training materials</p>
      </div>
      <button className="btn btn-primary"><Icons.Plus /> New Training</button>
    </div>

    <div className="training-tabs">
      <button className="training-tab active">Materials <span className="tab-count">{mockTrainingModules.length}</span></button>
      <button className="training-tab">Templates <span className="tab-count">3</span></button>
      <button className="training-tab">Collections <span className="tab-count">2</span></button>
    </div>

    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Materials</span>
          <div className="stat-icon primary"><Icons.Training /></div>
        </div>
        <div className="stat-value">{mockTrainingModules.length}</div>
        <div className="stat-change neutral"><span>Total courses</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Active VAs</span>
          <div className="stat-icon primary"><Icons.MyVAs /></div>
        </div>
        <div className="stat-value">{mockVAs.length}</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>All enrolled</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Avg Completion</span>
          <div className="stat-icon success"><Icons.Check /></div>
        </div>
        <div className="stat-value">80%</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>+5% this month</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Hours Trained</span>
          <div className="stat-icon warning"><Icons.Clock /></div>
        </div>
        <div className="stat-value">48h</div>
        <div className="stat-change neutral"><span>This month</span></div>
      </div>
    </div>

    <div className="training-grid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Training Materials</h3>
        </div>
        <div className="card-body">
          {mockTrainingModules.map((module, i) => (
            <div key={module.id} className="training-item animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="training-icon"><Icons.Training /></div>
              <div className="training-info">
                <h4>{module.title}</h4>
                <p>{module.description}</p>
                <div className="training-meta">
                  <span>{module.modules} modules</span>
                  <span>•</span>
                  <span>{module.vas.length} VAs assigned</span>
                </div>
              </div>
              <div className="training-progress">
                <div className="progress-circle" style={{ '--progress': module.completion }}>
                  <span>{module.completion}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="training-sidebar">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">VA Progress</h3>
          </div>
          <div className="card-body">
            {mockVAs.map((va) => (
              <div key={va.id} className="va-progress-item">
                <div className="avatar gradient" style={{ width: 40, height: 40, fontSize: 14 }}>{va.initials}</div>
                <div className="va-progress-info">
                  <span className="va-progress-name">{va.name}</span>
                  <span className="va-progress-completed">4 of 5 completed</span>
                </div>
                <span className="va-progress-percent">80%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
          </div>
          <div className="card-body">
            {[
              { va: 'Maria Santos', action: 'completed', course: 'CRM Training', time: '2 hours ago' },
              { va: 'James Chen', action: 'started', course: 'Email Marketing', time: '1 day ago' },
              { va: 'Sofia Rodriguez', action: 'completed', course: 'Support Procedures', time: '2 days ago' },
            ].map((activity, i) => (
              <div key={i} className="activity-item">
                <div className={`activity-dot ${activity.action === 'completed' ? 'success' : 'primary'}`}></div>
                <div className="activity-content">
                  <span className="activity-text"><strong>{activity.va}</strong> {activity.action} <strong>{activity.course}</strong></span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LeaveRequestsPage = () => (
  <div className="content-area page-content">
    <div className="page-header">
      <div>
        <h2 className="page-heading">VA Leave Requests</h2>
        <p className="page-subtitle">{mockLeaveRequests.length} total requests</p>
      </div>
      <div className="view-toggle">
        <button className="view-btn active"><Icons.List /> List</button>
        <button className="view-btn"><Icons.Calendar /> Calendar</button>
      </div>
    </div>

    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Pending</span>
          <div className="stat-icon warning"><Icons.Clock /></div>
        </div>
        <div className="stat-value">{mockLeaveRequests.filter(r => r.status === 'pending').length}</div>
        <div className="stat-change neutral"><span>Needs review</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Approved</span>
          <div className="stat-icon success"><Icons.Check /></div>
        </div>
        <div className="stat-value">{mockLeaveRequests.filter(r => r.status === 'approved').length}</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>This month</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Days Scheduled</span>
          <div className="stat-icon primary"><Icons.Calendar /></div>
        </div>
        <div className="stat-value">{mockLeaveRequests.reduce((sum, r) => sum + r.days, 0)}</div>
        <div className="stat-change neutral"><span>Total</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Upcoming</span>
          <div className="stat-icon primary"><Icons.Attendance /></div>
        </div>
        <div className="stat-value">2</div>
        <div className="stat-change neutral"><span>Next 30 days</span></div>
      </div>
    </div>

    <div className="leave-requests-grid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Icons.Clock /> Pending Review <span className="count-badge">{mockLeaveRequests.filter(r => r.status === 'pending').length}</span></h3>
        </div>
        <div className="card-body">
          {mockLeaveRequests.filter(r => r.status === 'pending').map((request, i) => (
            <div key={request.id} className="leave-request-card pending">
              <div className="leave-request-header">
                <div className="avatar gradient" style={{ width: 44, height: 44, fontSize: 15 }}>{request.initials}</div>
                <div className="leave-request-info">
                  <h4>{request.employee}</h4>
                  <p>{request.dates} ({request.days} days)</p>
                  <p className="leave-reason">{request.reason}</p>
                </div>
                <div className="leave-type-badge">{request.type}</div>
              </div>
              <div className="leave-actions">
                <button className="btn btn-primary">Approve</button>
                <button className="btn btn-secondary">Decline</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Icons.Check /> Approved <span className="count-badge">{mockLeaveRequests.filter(r => r.status === 'approved').length}</span></h3>
        </div>
        <div className="card-body">
          {mockLeaveRequests.filter(r => r.status === 'approved').map((request, i) => (
            <div key={request.id} className="leave-request-card">
              <div className="leave-request-header">
                <div className="avatar gradient" style={{ width: 44, height: 44, fontSize: 15 }}>{request.initials}</div>
                <div className="leave-request-info">
                  <h4>{request.employee}</h4>
                  <p>{request.dates} ({request.days} days)</p>
                  <p className="leave-reason">{request.reason}</p>
                </div>
                <div className="leave-type-badge approved">{request.type}</div>
              </div>
              {request.notes && <div className="leave-notes">Note: {request.notes}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const RequestVAPage = () => (
  <div className="content-area page-content">
    <div className="page-header">
      <div>
        <h2 className="page-heading">Request Additional VAs</h2>
        <p className="page-subtitle">Submit requests for additional virtual assistants</p>
      </div>
      <button className="btn btn-primary"><Icons.Plus /> New Request</button>
    </div>

    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Active Requests</span>
          <div className="stat-icon primary"><Icons.RequestVA /></div>
        </div>
        <div className="stat-value">{mockVARequests.length}</div>
        <div className="stat-change neutral"><span>Total submitted</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">In Review</span>
          <div className="stat-icon warning"><Icons.Clock /></div>
        </div>
        <div className="stat-value">{mockVARequests.filter(r => r.status === 'in-review').length}</div>
        <div className="stat-change neutral"><span>Being processed</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Matched</span>
          <div className="stat-icon success"><Icons.Check /></div>
        </div>
        <div className="stat-value">{mockVARequests.filter(r => r.status === 'matched').length}</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>Ready to start</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Avg Match Time</span>
          <div className="stat-icon primary"><Icons.Calendar /></div>
        </div>
        <div className="stat-value">5 days</div>
        <div className="stat-change positive"><Icons.TrendDown /><span>Faster</span></div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Your Requests</h3>
        <div className="header-actions">
          <select className="select"><option>All Status</option></select>
        </div>
      </div>
      <div className="card-body">
        <div className="va-requests-grid">
          {mockVARequests.map((request, i) => (
            <div key={request.id} className="va-request-card-large animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="va-request-header">
                <div className="va-request-icon"><Icons.User /></div>
                <div>
                  <h4>{request.role}</h4>
                  <span className={`status-badge ${request.status}`}>{request.status.replace('-', ' ')}</span>
                </div>
              </div>
              <p className="va-request-description">{request.description}</p>
              <div className="va-request-details">
                <div className="va-request-detail">
                  <span className="detail-label">Skills Required</span>
                  <span className="detail-value">{request.skills}</span>
                </div>
                <div className="va-request-detail">
                  <span className="detail-label">Hours</span>
                  <span className="detail-value">{request.hours}</span>
                </div>
                <div className="va-request-detail">
                  <span className="detail-label">Budget</span>
                  <span className="detail-value">{request.budget}</span>
                </div>
                <div className="va-request-detail">
                  <span className="detail-label">Start Date</span>
                  <span className="detail-value">{request.startDate}</span>
                </div>
              </div>
              <div className="va-request-footer">
                <span className="submitted-date">Submitted {request.submitted}</span>
                <button className="btn btn-secondary"><Icons.Eye /> View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AnnouncementsPage = () => (
  <div className="content-area page-content">
    <div className="page-header">
      <div>
        <h2 className="page-heading">Announcements</h2>
        <p className="page-subtitle">Stay updated with the latest news and tips</p>
      </div>
    </div>

    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Total</span>
          <div className="stat-icon primary"><Icons.Announcements /></div>
        </div>
        <div className="stat-value">{mockAnnouncements.length}</div>
        <div className="stat-change neutral"><span>Announcements</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Pinned</span>
          <div className="stat-icon warning"><Icons.Lock /></div>
        </div>
        <div className="stat-value">{mockAnnouncements.filter(a => a.pinned).length}</div>
        <div className="stat-change neutral"><span>Important</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">This Week</span>
          <div className="stat-icon success"><Icons.TrendUp /></div>
        </div>
        <div className="stat-value">2</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>New posts</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Engagement</span>
          <div className="stat-icon primary"><Icons.Heart /></div>
        </div>
        <div className="stat-value">89</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>Reactions</span></div>
      </div>
    </div>

    <div className="announcements-filters">
      <div className="search-bar">
        <Icons.Search />
        <input type="text" placeholder="Search announcements..." />
      </div>
      <select className="select"><option>All Categories</option></select>
      <select className="select"><option>Newest First</option></select>
    </div>

    <div className="announcements-list">
      {mockAnnouncements.filter(a => a.pinned).length > 0 && (
        <div className="announcements-section">
          <h3 className="section-title"><Icons.Lock /> Pinned</h3>
          {mockAnnouncements.filter(a => a.pinned).map((ann, i) => (
            <div key={ann.id} className="announcement-card pinned animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
              {ann.image && <div className="announcement-image"></div>}
              <div className="announcement-content">
                <div className="announcement-header">
                  <h4>{ann.title}</h4>
                  <span className={`category-badge ${ann.category.toLowerCase()}`}>{ann.category}</span>
                </div>
                <div className="announcement-meta">
                  <span>{ann.date}</span>
                  <span>•</span>
                  <span><Icons.Clock /> {ann.readTime} read</span>
                </div>
                <p>{ann.content}</p>
                <div className="announcement-reactions">
                  {ann.reactions.heart && <span className="reaction"><Icons.Heart /> {ann.reactions.heart}</span>}
                  {ann.reactions.celebrate && <span className="reaction">🎉 {ann.reactions.celebrate}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="announcements-section">
        <h3 className="section-title">All Announcements</h3>
        {mockAnnouncements.filter(a => !a.pinned).map((ann, i) => (
          <div key={ann.id} className="announcement-card animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="announcement-icon"><Icons.Announcements /></div>
            <div className="announcement-content">
              <div className="announcement-header">
                <h4>{ann.title}</h4>
                <span className={`category-badge ${ann.category.toLowerCase()}`}>{ann.category}</span>
              </div>
              <div className="announcement-meta">
                <span>{ann.date}</span>
                <span>•</span>
                <span><Icons.Clock /> {ann.readTime} read</span>
              </div>
              <p>{ann.content}</p>
              {ann.reactions && (
                <div className="announcement-reactions">
                  {ann.reactions.heart && <span className="reaction"><Icons.Heart /> {ann.reactions.heart}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InvoicesPage = () => {
  const totalOutstanding = mockInvoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="content-area page-content">
      <div className="page-header">
        <div>
          <h2 className="page-heading">Invoices</h2>
          <p className="page-subtitle">View and manage your billing information</p>
        </div>
        <button className="btn btn-secondary"><Icons.Download /> Download All</button>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Outstanding</span>
            <div className="stat-icon warning"><Icons.Dollar /></div>
          </div>
          <div className="stat-value">${totalOutstanding.toLocaleString()}</div>
          <div className="stat-change neutral"><span>Due soon</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Paid (YTD)</span>
            <div className="stat-icon success"><Icons.Check /></div>
          </div>
          <div className="stat-value">${totalPaid.toLocaleString()}</div>
          <div className="stat-change positive"><Icons.TrendUp /><span>This year</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">This Month</span>
            <div className="stat-icon primary"><Icons.Calendar /></div>
          </div>
          <div className="stat-value">${mockInvoices[0]?.amount.toLocaleString()}</div>
          <div className="stat-change neutral"><span>Current period</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Next Due</span>
            <div className="stat-icon primary"><Icons.Clock /></div>
          </div>
          <div className="stat-value">Jan 30</div>
          <div className="stat-change neutral"><span>14 days</span></div>
        </div>
      </div>

      {mockInvoices.filter(i => i.status === 'pending').length > 0 && (
        <div className="current-invoice-card">
          <div className="current-invoice-header">
            <div>
              <h3>Current Invoice</h3>
              <span className="invoice-id">{mockInvoices[0].id}</span>
            </div>
            <span className="status-badge pending"><span className="status-dot"></span>Pending</span>
          </div>
          <div className="current-invoice-amount">
            <span className="amount-label">Amount Due</span>
            <span className="amount-value">${mockInvoices[0].amount.toLocaleString()}</span>
          </div>
          <div className="current-invoice-details">
            {mockInvoices[0].items.map((item, i) => (
              <div key={i} className="invoice-line-item">
                <span>{item.description}</span>
                <span>${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="current-invoice-footer">
            <span>Due: {mockInvoices[0].dueDate}</span>
            <button className="btn btn-primary">Pay Now</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Invoice History</h3>
          <select className="select"><option>All Status</option></select>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.slice(1).map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600 }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td style={{ fontWeight: 600 }}>${inv.amount.toLocaleString()}</td>
                  <td>{inv.dueDate}</td>
                  <td><span className={`status-badge ${inv.status}`}><span className="status-dot"></span>{inv.status}</span></td>
                  <td>
                    <button className="btn btn-secondary small"><Icons.Eye /> View</button>
                    <button className="btn btn-secondary small" style={{ marginLeft: 8 }}><Icons.Download /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SupportPage = () => (
  <div className="content-area page-content">
    <div className="page-header">
      <div>
        <h2 className="page-heading">Support</h2>
        <p className="page-subtitle">Get help from our support team</p>
      </div>
      <button className="btn btn-primary"><Icons.Plus /> New Ticket</button>
    </div>

    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Open Tickets</span>
          <div className="stat-icon primary"><Icons.Support /></div>
        </div>
        <div className="stat-value">1</div>
        <div className="stat-change neutral"><span>Awaiting response</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Resolved</span>
          <div className="stat-icon success"><Icons.Check /></div>
        </div>
        <div className="stat-value">1</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>This month</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Avg Response</span>
          <div className="stat-icon warning"><Icons.Clock /></div>
        </div>
        <div className="stat-value">2h</div>
        <div className="stat-change positive"><Icons.TrendUp /><span>Fast support</span></div>
      </div>
    </div>

    <div className="dashboard-bottom">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Your Tickets</h3>
          <span className="count-badge">{mockTickets.length} tickets</span>
        </div>
        <div className="card-body">
          {mockTickets.map((ticket, i) => (
            <div key={ticket.id} className="ticket-card animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="ticket-icon"><Icons.Support /></div>
              <div className="ticket-content">
                <div className="ticket-header">
                  <span className="ticket-id">{ticket.id}</span>
                  <span className={`status-badge ${ticket.status}`}>{ticket.status}</span>
                  <span className={`priority-badge ${ticket.priority}`}>{ticket.priority}</span>
                </div>
                <h4>{ticket.title}</h4>
                <p>{ticket.description}</p>
                <div className="ticket-meta">
                  <span className="ticket-category">{ticket.category}</span>
                  <span>•</span>
                  <span>Created {ticket.created}</span>
                  <span>•</span>
                  <span>{ticket.responses} responses</span>
                </div>
              </div>
              <button className="btn btn-secondary"><Icons.ChevronRight /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Help</h3>
        </div>
        <div className="card-body">
          {[
            { title: 'How do I approve timesheets?', category: 'Attendance' },
            { title: 'Managing VA schedules', category: 'VAs' },
            { title: 'Understanding invoices', category: 'Billing' },
            { title: 'Task assignment tips', category: 'Tasks' },
          ].map((faq, i) => (
            <div key={i} className="deadline-item" style={{ cursor: 'pointer' }}>
              <div className="deadline-indicator medium"></div>
              <div className="deadline-info">
                <span className="deadline-title">{faq.title}</span>
                <span className="deadline-assignee">{faq.category}</span>
              </div>
              <span style={{ width: 16, height: 16, color: 'var(--gray-400)' }}><Icons.ChevronRight /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Main App
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage darkMode={darkMode} />;
      case 'tasks': return <TasksPage />;
      case 'my-vas': return <MyVAsPage />;
      case 'attendance': return <AttendancePage />;
      case 'messaging': return <MessagingPage darkMode={darkMode} />;
      case 'file-hub': return <FileHubPage />;
      case 'training': return <TrainingPage />;
      case 'leave-requests': return <LeaveRequestsPage />;
      case 'request-va': return <RequestVAPage />;
      case 'announcements': return <AnnouncementsPage />;
      case 'invoices': return <InvoicesPage />;
      case 'support': return <SupportPage />;
      default: return <DashboardPage darkMode={darkMode} />;
    }
  };

  const getPageTitle = () => {
    const item = navItems.find(n => n.id === activePage);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className={`browser-frame ${darkMode ? 'dark' : ''}`}>
      {/* Browser Chrome */}
      <div className="browser-header">
        <div className="browser-controls">
          <div className="browser-dot red"></div>
          <div className="browser-dot yellow"></div>
          <div className="browser-dot green"></div>
        </div>
        <div className="address-bar">
          <span className="lock-icon"><Icons.Lock /></span>
          <span>dashboard.outsourceteams.com</span>
        </div>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} title={darkMode ? 'Light mode' : 'Dark mode'}>
          {darkMode ? <Icons.Sun /> : <Icons.Moon />}
        </button>
      </div>

      {/* Dashboard */}
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon">OT</div>
              <div className="logo-text">
                outsource
                <span>teams</span>
              </div>
            </div>
          </div>
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                <item.icon />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main */}
        <div className="main-content">
          <header className="content-header">
            <div className="header-left">
              {activePage !== 'dashboard' && <h1 className="page-title">{getPageTitle()}</h1>}
            </div>
            <div className="header-right">
              <button className="notification-btn">
                <Icons.Bell />
                <span className="notification-badge">3</span>
              </button>
              <div className="user-menu">
                <div className="user-avatar">B</div>
                <span className="user-name">Brad</span>
                <Icons.ChevronRight />
              </div>
            </div>
          </header>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
