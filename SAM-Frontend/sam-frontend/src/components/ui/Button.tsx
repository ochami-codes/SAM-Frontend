import {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";
import Link from "next/link";
import type { UrlObject } from "url";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string | UrlObject;

  colorScheme?: "default" | "theme";
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
  colorScheme = "default",
  colorVariable = "--study-accent",
  className = "",
  ...props
}: ButtonProps) {
  const isTheme = colorScheme === "theme";

  const styles = `
    ${baseStyles}
    ${sizes[size]}
    ${className}
  `;

  const themeStyle: CSSProperties | undefined = isTheme
    ? {
        backgroundColor:
          variant === "primary" || variant === "secondary"
            ? `var(${colorVariable})`
            : undefined,

        color:
          variant === "outline" || variant === "ghost"
            ? `var(${colorVariable})`
            : undefined,

        borderColor:
          variant === "outline"
            ? `var(${colorVariable})`
            : undefined,
      }
    : undefined;

  const variantClasses = isTheme
    ? {
        primary: "text-white hover:opacity-90",
        secondary: "text-white hover:opacity-90",
        outline: "border hover:text-white",
        ghost: "",
      }[variant]
    : {
        primary: "bg-sam-blue text-white hover:bg-sam-blue-dark",
        secondary: "bg-sam-green text-white hover:opacity-90",
        outline:
          "border border-sam-blue text-sam-blue hover:bg-sam-blue hover:text-white",
        ghost: "text-sam-blue hover:bg-sam-blue/10",
      }[variant];

  const finalClassName = `
    ${styles}
    ${variantClasses}
  `;

  if (href) {
    return (
      <Link
        href={href}
        className={finalClassName}
        style={themeStyle}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={finalClassName}
      style={themeStyle}
      {...props}
    >
      {children}
    </button>
  );
}
