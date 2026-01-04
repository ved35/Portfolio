import { useState, useEffect } from 'react';
import { Menu, X, Code2, Github, Linkedin, FileText } from 'lucide-react';
import { portfolioData } from '../data/data';
import Button from './ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
      else if (window.scrollY < 100) setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-5 group">
          <div className="p-2 rounded-lg group-hover:scale-110 transition-transform border border-slate-700 group-hover:border-accent/50">
            <Code2 className="w-6 h-6 text-accent" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400 group-hover:text-accent transition-colors">
            {portfolioData.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent relative group ${
                  activeSection === link.href.substring(1)
                    ? 'text-accent'
                    : 'text-slate-400'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                    activeSection === link.href.substring(1) ? 'w-full' : ''
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-6 border-l border-slate-800">
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={portfolioData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <Button
              variant="primary"
              size="sm"
              className="gap-2"
              onClick={() => window.open(portfolioData.resumeLink, '_blank')}
            >
              <FileText className="w-4 h-4" /> Resume
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-40 transition-transform duration-300 flex flex-col items-center justify-center gap-8 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-medium text-slate-300 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
        <div className="flex gap-6 mt-4">
          <a
            href={portfolioData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={portfolioData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="mt-4 gap-2"
          onClick={() => {
            window.open(portfolioData.resumeLink, '_blank');
            setIsOpen(false);
          }}
        >
          <FileText className="w-5 h-5" /> Download Resume
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
