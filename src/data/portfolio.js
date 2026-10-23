// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to personalise your portfolio.
//  Every value wrapped in [BRACKETS] is a placeholder.
//  Leave a link as '' (empty string) to hide that button.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: '[YOUR FULL NAME]',
  // Short name shown in the navbar wordmark
  wordmark: '[YOUR NAME]',
  title: '[IT STUDENT / ASPIRING WEB DEVELOPER]',
  school: '[YOUR SCHOOL OR COURSE]', // set to '' to hide
  location: '[YOUR LOCATION]', // set to '' to hide
  headline: 'Learning to build thoughtful, accessible things for the web.',
  intro:
    '[WRITE A SHORT INTRODUCTION ABOUT YOURSELF — two or three sentences about what you are studying and what you are curious about right now.]',
  email: 'your.email@example.com',
  github: '', // e.g. 'https://github.com/your-username'
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-profile'
  resume: '', // e.g. '/resume.pdf' — put the file in /public first
  // Optional profile photo, e.g. '/images/profile.jpg'. Leave '' for the placeholder graphic.
  photo: '',
}

export const about = {
  paragraphs: [
    '[PARAGRAPH 1 — Who you are and what you are studying.]',
    '[PARAGRAPH 2 — Your learning journey so far: how you got into IT and web development.]',
    '[PARAGRAPH 3 — What you hope to do next: goals, the kind of work or team you are looking for.]',
  ],
  interests: ['[INTEREST 1]', '[INTEREST 2]', '[INTEREST 3]'],
  goals: ['[GOAL 1]', '[GOAL 2]'],
}

// Only include skills you actually have. Icons are chosen by `icon` key
// (one of: 'code', 'layout', 'wrench', 'sparkles').
export const skills = [
  {
    category: 'Programming',
    icon: 'code',
    items: ['[LANGUAGE 1]', '[LANGUAGE 2]'],
  },
  {
    category: 'Frontend Development',
    icon: 'layout',
    items: ['[SKILL 1]', '[SKILL 2]', '[SKILL 3]'],
  },
  {
    category: 'Tools',
    icon: 'wrench',
    items: ['[TOOL 1]', '[TOOL 2]'],
  },
  {
    category: 'Other',
    icon: 'sparkles',
    items: ['[SKILL 1]', '[SKILL 2]'],
  },
]

// Add, remove, or reorder projects. Leave `live`, `source`, or `image` as ''
// when you do not have them yet — the card will adapt automatically.
// status: 'completed' | 'in-progress' (be honest — do not mark unfinished work complete)
export const projects = [
  {
    title: '[PROJECT TITLE 1]',
    description: '[One or two sentences on what the project does and who it is for.]',
    contribution: '[What you personally built or were responsible for.]',
    tech: ['[TECH 1]', '[TECH 2]'],
    status: 'in-progress',
    image: '', // e.g. '/images/project-1.png' (recommended 1200×750)
    imageAlt: '',
    live: '',
    source: '',
  },
  {
    title: '[PROJECT TITLE 2]',
    description: '[One or two sentences on what the project does and who it is for.]',
    contribution: '[What you personally built or were responsible for.]',
    tech: ['[TECH 1]', '[TECH 2]'],
    status: 'in-progress',
    image: '',
    imageAlt: '',
    live: '',
    source: '',
  },
  {
    title: '[PROJECT TITLE 3]',
    description: '[One or two sentences on what the project does and who it is for.]',
    contribution: '[What you personally built or were responsible for.]',
    tech: ['[TECH 1]', '[TECH 2]'],
    status: 'in-progress',
    image: '',
    imageAlt: '',
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
