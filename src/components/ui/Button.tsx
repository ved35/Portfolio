import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-accent text-black font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover hover:scale-[1.02] hover:shadow-accent/40',
    secondary:
      'bg-slate-800 text-white hover:bg-slate-700 hover:text-accent border border-transparent hover:border-accent/30',
    outline:
      'bg-transparent border border-white/20 text-white hover:text-accent hover:border-accent/50 hover:bg-accent/5',
    ghost:
      'bg-transparent text-slate-300 hover:text-accent hover:bg-slate-800/50',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
