import React, { useRef, useEffect } from 'react';
import { Mail, Send, Github, Linkedin, Twitter } from 'lucide-react';
import gsap from 'gsap';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { portfolioData } from '../data/data';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-animate', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission
    alert('Thanks for your message! This is a demo form.');
  };

  return (
    <SectionWrapper id="contact" className="bg-slate-900/30">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <div className="text-center mb-16 contact-animate">
          <h2 className="text-white font-medium mb-2 uppercase tracking-wider">
            Get in Touch
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Contact Me
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 contact-animate">
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">Let's Talk</h4>
              <p className="text-slate-400 leading-relaxed">
                {portfolioData.contact.message}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${portfolioData.contact.formEmail}`}
                className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                {portfolioData.contact.formEmail}
              </a>
            </div>

            <div>
              <h5 className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">
                Follow Me
              </h5>
              <div className="flex gap-4">
                <a
                  href={portfolioData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                {portfolioData.social.twitter && (
                  <a
                    href={portfolioData.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="contact-animate p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors resize-none"
                  placeholder="How can I help you?"
                />
              </div>
              <Button type="submit" fullWidth className="gap-2 group">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
