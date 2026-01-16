import { Github, Linkedin, Heart } from 'lucide-react';
import { portfolioData } from '../data/data';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} {portfolioData.name}. All rights
            reserved.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500"></div>

        <div className="flex items-center gap-6">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
