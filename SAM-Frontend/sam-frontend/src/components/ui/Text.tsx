import type {
  ElementType,
  ReactNode,
} from "react";

type TextElement =
  | "p"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "strong"
  | "em";

interface TextProps {
  as?: TextElement;
  children: ReactNode;
  className?: string;
}

export default function Text({
  as: Component = "p",
  children,
  className = "",
}: TextProps) {
  return (
    <Component className={className}>
      {children}
    </Component>
  );
}