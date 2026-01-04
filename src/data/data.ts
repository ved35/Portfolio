import type { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  // Personal Information
  name: 'Ved Patel',
  role: 'App/Web Developer',
  email: 'vedpatel6101@gmail.com',
  phone: '+91 7203883017',
  location: 'Surat, Gujarat',
  resumeLink: '/assets/resume.pdf',

  // Social Links
  social: {
    github: 'https://github.com/ved35',
    linkedin: 'https://www.linkedin.com/in/patel-ved',
    // twitter: 'https://twitter.com',
    // instagram: 'https://instagram.com',
  },

  // About Me
  about: {
    headline: 'Building amazing digital experiences with modern technologies',
    description:
      'I am a passionate App/Web developer with expertise in creating scalable web applications. I love combining design with functionality to create intuitive user experiences. With 2+ years of experience, I have worked on various projects ranging from startups to enterprise solutions.',
    image: '/assets/profile.jpg',
  },

  // Skills
  skills: [
    {
      category: 'Frontend',
      items: ['React-Native', 'React.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'MongoDB', 'SQL', 'REST APIs'],
    },
    {
      category: 'Tools',
      items: ['Git', 'Firebase', 'AI Tools', 'Figma'],
    },
    {
      category: 'Platforms',
      items: ['VS code', 'Android Studio', 'Xcode', 'Postman'],
    },
  ],

  // Experience
  experience: [
    {
      id: 1,
      title: 'Mobile App Developer',
      company: 'Vasundhara infotech',
      period: 'May 2025 - Present',
      description:
        'Development of customer-facing mobile applications using React-Native and Node.js. Improved performance by 40% through optimization.',
      achievements: [
        'Built scalable microservices architecture',
        'Mentored junior developers',
        'Reduced deployment time by 40%',
      ],
    },
    {
      id: 2,
      title: 'Web/App Developer',
      company: 'Palm Infotech',
      period: 'June 2023 - Nov 2024',
      description:
        'Developed responsive web & mobile applications for various clients. Implemented real-time features using WebSockets.',
      achievements: [
        'Delivered 5+ client projects on time',
        'Improved code quality with testing',
        'Deployed app on Google Play Store & App Store',
      ],
    },
    {
      id: 3,
      title: 'Junior Developer - Intern',
      company: 'Toshal Infotech',
      period: 'Jan 2022 - April 2023',
      description:
        'Started career building responsive websites using HTML, CSS, JavaScript, React.',
      achievements: [
        'Learned modern development practices',
        'Improved JavaScript skills',
        'Hand on experience on industrial projects',
      ],
    },
  ],

  // Education
  education: [
    {
      id: 1,
      degree: 'Full Stack Development training',
      school: 'Tops institute',
      year: 'June 2022 - May 2023',
      gpa: '90%',
      description:
        'Proficient in Web Fundamentals with practical experience in building applications using React.js, Node.js, and SQL databases',
    },
    {
      id: 2,
      degree: 'Information Technology',
      school: 'Vishwakarma Government Engineering College',
      year: 'June 2018 - May 2022',
      gpa: '7.63 CGPA',
      description:
        'Specialized in Web-App Development and Software Engineering',
    },
    {
      id: 3,
      degree: 'HSC',
      school: 'AB School',
      year: 'June 2017 - March 2018',
      gpa: '85%',
      description:
        'Completed Higher Secondary Certificate (12th Grade) in Science stream.',
    },
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description:
        'A full-featured e-commerce platform with real-time inventory management, payment integration, and analytics dashboard.',
      longDescription:
        'Built a scalable e-commerce platform that supports 10,000+ concurrent users. Features include real-time inventory sync, Stripe payment integration, order tracking, and an admin dashboard with analytics.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Redis'],
      image: '/assets/projects/ecommerce.jpg',
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
      featured: true,
    },
    {
      id: 2,
      title: 'Social Media Dashboard',
      description:
        'Analytics dashboard for managing multiple social media accounts with real-time metrics and scheduling.',
      longDescription:
        'Created a comprehensive social media management tool that integrates with Instagram, Twitter, and Facebook. Features real-time analytics, post scheduling, and performance tracking.',
      technologies: ['React', 'Express', 'PostgreSQL', 'Chart.js', 'OAuth2'],
      image: '/assets/projects/dashboard.jpg',
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
      featured: true,
    },
    {
      id: 3,
      title: 'AI Chat Application',
      description:
        'Real-time chat application with AI-powered suggestions and smart notifications.',
      longDescription:
        'Developed a chat app with WebSocket support for real-time messaging, AI-powered reply suggestions, and intelligent notification system.',
      technologies: ['React', 'Socket.io', 'Node.js', 'OpenAI API', 'Firebase'],
      image: '/assets/projects/chat.jpg',
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
      featured: false,
    },
    {
      id: 4,
      title: 'Task Management App',
      description:
        'Collaborative task management tool with real-time updates and team features.',
      longDescription:
        'A Trello-like task management application with drag-and-drop functionality, real-time collaboration, and team workspaces.',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'Drag-and-drop'],
      image: '/assets/projects/tasks.jpg',
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
      featured: false,
    },
  ],

  // Contact Information
  contact: {
    formEmail: 'vedpatel6101@gmail.com',
    message:
      "I'm always interested in hearing about new projects and opportunities. Feel free to reach out!",
  },
};
