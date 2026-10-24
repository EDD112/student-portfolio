// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to personalise your portfolio.
//  Every value wrapped in [BRACKETS] is a placeholder.
//  Leave a link as '' (empty string) to hide that button.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Edwin L. Argallon Jr.',
  wordmark: 'Edwin',
  title: 'IT Student',
  school: 'Cebu Eastern College, Inc.',
  location: 'Cebu City, Philippines',
  headline: 'Turning ideas into working software',
  intro:
    'I’m an IT student at Cebu Eastern College who enjoys building web and mobile apps. I like learning new tools, working through problems step by step, and finishing projects that people can actually use.',
  email: 'argallonjr153@gmail.com',
  github: 'https://github.com/EDD112',
  linkedin: '',
  resume: '',
  photo: '/images/profile.png',
}

export const about = {
  title: 'Growing as a developer, one project at a time.',
  paragraphs: [
    'I’m studying Information Technology with a focus on software development. What draws me in is watching a rough idea turn into something that runs, then making it better after every round of testing and feedback.',
    'So far I’ve worked with Python, Django, PHP, and Flutter on web and mobile projects, with databases and networking basics behind them. I’m still early in my journey, so each project is a chance to learn something new and close a gap in what I know.',
    'Right now I’m learning how optical character recognition (OCR) works for our thesis project, EduAssist AI, while also working with my teammates on planning and designing it. Working in a group has taught me that good software depends as much on clear communication as it does on code.',
  ],
  interests: ['Web applications', 'Networking', 'Database', 'Mobile Application', 'Frameworks', 'Software Development'],
  goals: [
    'Grow into a confident full-stack and mobile software developer',
    'Finish and deliver our OCR-based thesis system, EduAssist AI',
    'Go deeper into databases, networking, and secure coding',
    'Earn an IT certification and land an entry-level developer role',
  ],
}

// Only include skills you actually have. Icons are chosen by `icon` key
// (one of: 'code', 'layout', 'wrench', 'sparkles').
export const skills = [
  {
    category: 'Programming',
    icon: 'code',
    items: ['Python', 'JavaScript', 'PHP', 'C#'],
  },
  {
    category: 'Frontend',
    icon: 'layout',
    items: ['Bootstrap'],
  },
  {
    category: 'Backend & Databases',
    icon: 'code',
    items: ['Django', 'Firebase', 'SQLite', 'PostgreSQL'],
  },
  {
    category: 'Mobile Development',
    icon: 'sparkles',
    items: ['Flutter', 'Android SDK'],
  },
  {
    category: 'Tools',
    icon: 'wrench',
    items: ['Git & GitHub', 'VS Code', 'Vercel'],
  },
]

// Add, remove, or reorder projects. Leave `live`, `source`, or `image` as ''
// when you do not have them yet — the card will adapt automatically.
// status: 'completed' | 'in-progress' (be honest — do not mark unfinished work complete)
export const projects = [
    {
    title: 'EduAssist AI: Essay Evaluation System',
    description:
       'A mobile app idea for college instructors at Cebu Eastern College that helps check student essays. The instructor enters the essay question and rubric, then captures or uploads photos of the essays. The app uses OCR to read the text and AI to suggest a score and draft feedback based on the instructor’s own criteria. The instructor always reviews and confirms the final result, which is saved as a record that can be downloaded as an image. This is our thesis project.',
    contribution:
       'My team of five and I are still in the planning and design stage. So far we have worked on the research paper: defining the problem, objectives and scope, studying related research and similar software like Gradescope and Turnitin, and planning the features and how the system should work. We have not started full development yet.',
    note: 'Planning stage only. There is no working version to demo yet.',
    status: 'in-progress',
    tech: ['OCR', 'AI-assisted grading', 'Mobile app', 'Django', 'Flutter', 'Android SDK'],
    image: [
    '/images/eduassistai.png',
    '/images/eduassistai1.png',
    '/images/eduassistai2.png',
    '/images/eduassistai3.png',
    ],
    imageAlt: 'The EduAssistAi',
    live: '',
    source: ''},
  {
    title: 'StockManager: Inventory System',
    description:
      'A web-based inventory system for tracking products, categories and stock batches, with expiry tracking and alerts for low stock, out-of-stock and expiring items. Built for small stores and food businesses that need to know what is running out or about to expire.',
    contribution:
      'I built most of the system myself, including the Django backend, the inventory logic and the alerts. My teammates helped with the UI and went to the store to propose the system and gather information.',
    note: 'Demo login for the dashboard: username "manager", password "manager@123".',
    tech: ['Python', 'Django', 'PostgreSQL', 'Bootstrap', 'Chart.js'],
    status: 'completed',
    image: [
      '/images/stoock-manager-login.png',
      '/images/stoock-manager-dashboard.png',
    ],
    imageAlt: 'The StockManager dashboard',
    live: 'https://stock-manager-git-main-edd-112.vercel.app/', 
    source: 'https://github.com/EDD112/stock-manager',
  },
  {
    title: 'CEC Anomaly: Horror Survival Game',
    description: 'A first-person horror survival game concept set inside Cebu Eastern College, where players must complete tasks, explore different floors, and free trapped spirits while avoiding a powerful demon. The game is planned to feature survival mechanics, hiding spots, interactive objects, and tools to stun enemies. The project is currently in progress, with me and my team still working on the game design, planning its mechanics, and organizing its core gameplay features before moving into full development.',
    contribution: 'I am working with my team during the design and planning process, contributing ideas for the game mechanics, gameplay flow, and overall player experience. We are still refining the concept and organizing the features that will be implemented in the next stages of development.',
    note: 'Planning stage only. There is no working version to demo yet.',
    tech: ['Godot', 'GDScript'],
    status: 'in-progress',
    image: [
    '/images/cec-anomaly.jpg',
    '/images/cec-anomaly1.png',
    '/images/cec-anomaly2.png',
    ],
    imageAlt: 'The CEC Anomaly Game',
    live: '',
    source: '',
  },
]

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
