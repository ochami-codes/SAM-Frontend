import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

interface CardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-sam-border bg-sam-surface shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`space-y-2 px-4 pt-5 sm:px-6 sm:pt-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  ...props
}: CardTitleProps) {
  return (
    <h3
      className={`text-lg font-semibold leading-snug text-sam-deep-blue sm:text-xl ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={`text-sm leading-6 text-sam-muted ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`px-4 py-5 sm:px-6 sm:py-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 border-t border-sam-border px-4 py-4 sm:px-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
