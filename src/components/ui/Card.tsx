import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = true,
}) => {
  return (
    <div
      className={`bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-xl p-6 transition-all duration-300 group ${
        hoverEffect
          ? 'hover:border-white/40 hover:bg-slate-800/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2'
          : ''
      } ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default Card;
