import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import type { UrlObject } from "url";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string | UrlObject;
  colorVariable?: string;
  className?: string;
}

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const baseStyles = `
  inline-flex items-center justify-center
  rounded-lg font-medium
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:pointer-events-none disabled:opacity-50
`;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  colorVariable = "--study-accent",
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses: Record<typeof variant, string> = {
    primary: `bg-[var(${colorVariable})] text-white hover:opacity-90`,
    secondary: `bg-sam-blue text-white hover:bg-sam-blue-dark`,
    outline: `
      border border-[var(${colorVariable})]
      text-[var(${colorVariable})]
      hover:bg-[var(${colorVariable})] hover:text-white
    `,
    ghost: `text-[var(${colorVariable})] hover:bg-[var(${colorVariable})]/10`,
  };

  const styles = `
    ${baseStyles}
    ${sizes[size]}
    ${variantClasses[variant]}
    focus:ring-[var(${colorVariable})]
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
