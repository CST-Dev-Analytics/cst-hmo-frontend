// components/ui/Button.tsx
import React from 'react';

type ButtonProps = {
  title: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export default function Button({
  title,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
}: ButtonProps) {
  const base = 'px-4 py-2 rounded-lg transition-all cursor-pointer ';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 ',
    secondary: 'bg-blue-100 text-black hover:bg-blue-200',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {title}
    </button>
  );
}
