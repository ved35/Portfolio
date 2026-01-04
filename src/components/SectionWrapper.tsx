import React from 'react';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
}) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 relative overflow-hidden ${className || ''}`}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
