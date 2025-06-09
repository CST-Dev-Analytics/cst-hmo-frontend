import React from 'react';

type ButtonProps = {
  title?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
};

export default function Button({
  title,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
  children,
}: ButtonProps) {
  const base = `px-4 py-2 rounded-lg border-2 transition-all duration-300 ease-in-out transform cursor-pointer 
                hover:scale-105 active:scale-110 hover:shadow-md focus:outline-none`;

  const variants = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]',
    secondary: 'bg-[#14B8A6] text-white hover:bg-[#0D9488]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children ?? title}
    </button>
  );
}
