import type { PortfolioData } from '../types';
import vedImage from '../assets/ved.png';
import resumePdf from '../assets/resume.pdf';
import chatImage from '../assets/projects/chat.png';
import bookwormImage from '../assets/projects/bookworm.png';
import blogImage from '../assets/projects/blog.png';

export const portfolioData: PortfolioData = {
  // Personal Information
  name: 'Ved Patel',
  role: 'App/Web Developer',
  email: 'vedpatel6101@gmail.com',
  phone: '+91 7203883017',
  location: 'Surat, Gujarat',
  resumeLink: resumePdf,

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
    image: vedImage,
    totalprojects: 15,
    totalyears: 2,
    subDescription: [
      'I build things for the web. My goal is to always build products that provide pixel-perfect, performant experiences.',
      'I am a continuous learner who stays up-to-date with the latest technologies and industry trends to deliver cutting-edge solutions.',
      'I value clean code, scalability, and collaboration, ensuring that every project is built to last and easy to maintain.',
      'I approach every challenge with a problem-solving mindset, dedicated to finding efficient and innovative solutions for complex requirements.',
      'My passion lies in transforming creative ideas into functional digital realities, paying attention to the smallest details for maximum impact.',
    ],
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
      title: 'Software Developer',
      company: 'Palm Infotech',
      period: 'Jan 2026 - Present',
      description:
        'Development of customer-facing mobile applications using React-Native and Nest.js. Improved performance by 40% through optimization.',
      achievements: [
        'Built scalable microservices architecture',
        'Mentored junior developers',
        'Reduced deployment time by 40%',
      ],
    },
    {
      id: 2,
      title: 'Mobile App Developer',
      company: 'Vasundhara infotech',
      period: 'May 2025 - Nov 2025',
      description:
        'Development of customer-facing mobile applications using React-Native and Node.js. Improved performance by 40% through optimization.',
      achievements: [
        'Built scalable microservices architecture',
        'Mentored junior developers',
        'Reduced deployment time by 50%',
      ],
    },
    {
      id: 3,
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
      id: 4,
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
      title: 'Real-Time Chat Application',
      description:
        'A full-featured real-time chat platform with group messaging, image sharing, and instant notifications using WebSocket technology.',
      longDescription:
        'Built a scalable real-time chat application supporting unlimited concurrent users. Features include one-to-one messaging, group chats, image uploads via Cloudinary, message replies, JWT authentication, role-based access control, and real-time notifications using Socket.io. The platform supports multiple participants with group creation and management capabilities.',
      technologies: [
        'React',
        'TypeScript',
        'Node.js',
        'Express',
        'MongoDB',
        'Socket.io',
        'Tailwind CSS',
        'Cloudinary',
        'JWT',
        'Passport',
      ],
      image: chatImage,
      githubLink: 'https://github.com/ved35/Chat',
      liveLink: '',
      featured: true,
    },
    {
      id: 1,
      title: 'BookWorm – Full-Stack React Native App',
      description:
        'A comprehensive full-stack book review and management application with user authentication, infinite scrolling feed, and image uploads.',
      longDescription:
        'Built a complete full-stack project using React Native and Expo for the mobile app, paired with a Node.js/Express backend. Features include JWT-based authentication, MongoDB for data storage, Cloudinary for image handling, infinite scrolling on the home feed, post creation with ratings and images, user profiles, and cross-platform support for Android, iOS, and web.',
      technologies: [
        'Node.js',
        'Express',
        'MongoDB',
        'JWT',
        'bcryptjs',
        'Cloudinary',
        'React Native',
        'Expo',
        'Axios',
        'Zustand',
      ],
      image: bookwormImage,
      githubLink: 'https://github.com/ved35/Book',
      liveLink: '',
      featured: true,
    },
    {
      id: 1,
      title: 'Blog-app - Full-Stack Blogging Platform',
      description:
        'A modern, feature-rich blogging platform with user authentication, content management, and interactive features built with React, Node.js, and MongoDB.',
      longDescription:
        'Developed a comprehensive blogging platform enabling users to create, manage, and interact with blog posts. Features include email/password and Google OAuth authentication with JWT session management, rich text editor with image upload via Cloudinary, dark/light theme toggle with Tailwind CSS, real-time search functionality, infinite scroll pagination, comment system with likes, user profiles, admin dashboard for content moderation, post categorization, and role-based access control (Admin/User).',
      technologies: [
        'React',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Mongoose',
        'Vite',
        'Redux Toolkit',
        'Tailwind CSS',
        'Firebase Auth',
        'React Quill',
        'Flowbite React',
        'JWT',
        'bcryptjs',
        'Cloudinary',
        'React Router DOM',
      ],
      image: blogImage,
      githubLink: 'https://github.com/ved35/Blog-app',
      liveLink: '',
      featured: true,
    },
  ],

  // Contact Information
  contact: {
    formEmail: 'vedpatel6101@gmail.com',
    message:
      "I'm always interested in hearing about new projects and opportunities. Feel free to reach out!",
  },
};
