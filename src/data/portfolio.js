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
  headline: 'Building web and mobile apps with Python, Django, and Flutter.',
  intro:
    'I’m an IT student at Cebu Eastern College, Inc. Right now I’m studying how optical character recognition (OCR) works for our upcoming system project, while building my skills in Python, Django, PHP, and mobile development.',
  email: 'argallonjr153@gmail.com',
  github: 'https://github.com/EDD112',
  linkedin: '',
  resume: '',
  photo: '/images/profile.png',
}

export const about = {
  paragraphs: [
    'I’m an IT student at Cebu Eastern College, Inc. in Cebu City, Philippines.',
    'I work with Python, Django, and PHP, and I build mobile apps using Flutter and the Android SDK.',
    'Right now I’m studying how optical character recognition (OCR) works, which is the technology that lets software read text from images, for our upcoming system project.',
  ],
  interests: ['Learning programming'],
  goals: ['Build a stable income through a career in IT',
  'Finish my OCR system project'],
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
    title: 'Pinoy Games: Luksong Baka',
    description:
      'A browser version of the traditional Filipino "jump over the cow" game, with a username entry, instructions, a pause menu, a score and a leaderboard. Be warned: it has a lot of bugs, and it works best on desktop because the mobile layout is not responsive yet. We were still beginners when we made it.',
    contribution:
       'I built the game functions and logic, such as the controls, jumping, scoring and game flow. My teammates built the UI and the rest of the game.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    status: 'completed',
    image: '/images/luksong-baka.jpg',
    imageAlt: 'The Luksong Baka game',
    live: 'https://edd112.github.io/PINOY-GAMES-LUKSONG-BAKA/',
    source: 'https://github.com/EDD112/PINOY-GAMES-LUKSONG-BAKA'},
  {
    title: 'StockManager: Inventory System',
    description:
      'A web-based inventory system for tracking products, categories and stock batches, with expiry tracking and alerts for low stock, out-of-stock and expiring items. Built for small stores and food businesses that need to know what is running out or about to expire. Demo login for the dashboard: username "manager", password "manager@123".',
    contribution:
      'I built most of the system myself, including the Django backend, the inventory logic and the alerts. My teammates helped with the UI and went to the store to propose the system and gather information.',
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
