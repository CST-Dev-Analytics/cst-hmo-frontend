import React from "react";

type ButtonProps = {
  title?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary"|"outline";
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export default function Button({
  title,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  children,
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const base = `px-4 py-2 rounded-lg border-2 inline-flex items-center gap-2 
                transition-all duration-300 ease-in-out transform cursor-pointer 
                hover:scale-105 active:scale-110 hover:shadow-md focus:outline-none`;

  const variants = {
    primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
    secondary: "bg-[#14B8A6] text-white hover:bg-[#0D9488]",
    outline:
      "bg-transparent text-[#14B8A6]  border border-gray-300 hover:bg-[#0D9488] hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children ?? title}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
}
