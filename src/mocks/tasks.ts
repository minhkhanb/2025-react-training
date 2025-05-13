import { Task } from '@/components/Providers/TaskProvider';

export const taskList: Task[] = [
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Learn TypeScript',
    subtitle: 'Understand the basics of TypeScript',
    isCompleted: false,
  },
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Build a React app',
    subtitle: 'Create a to-do list application using React',
    isCompleted: true,
  },
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Read JavaScript Book',
    subtitle: 'Complete reading the JavaScript book',
    isCompleted: false,
  },
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Write Unit Tests',
    subtitle: 'Write unit tests for the React components',
    isCompleted: true,
  },
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Practice Coding Challenges',
    subtitle: 'Solve daily coding challenges on LeetCode',
    isCompleted: false,
  },
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Learn Tailwind CSS',
    subtitle: 'Master Tailwind CSS for styling',
    isCompleted: true,
  },
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Fix Bugs in App',
    subtitle: 'Resolve bugs in the current React app',
    isCompleted: false,
  },
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Design Landing Page',
    subtitle: 'Create a landing page using Figma',
    isCompleted: true,
  },
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Write Blog Post',
    subtitle: 'Write a blog post about React hooks',
    isCompleted: false,
  },
  {
    id: `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Learn Node.js',
    subtitle: 'Learn the basics of backend with Node.js',
    isCompleted: true,
  },
];
