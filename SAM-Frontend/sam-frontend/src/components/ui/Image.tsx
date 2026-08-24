import NextImage, {
  type ImageProps as NextImageProps,
} from "next/image";

interface ImageProps extends Omit<NextImageProps, "alt"> {
  alt: string;
  className?: string;
}

export default function Image({
  alt,
  className = "",
  ...props
}: ImageProps) {
  return (
    <NextImage
      alt={alt}
      className={`object-cover ${className}`}
      {...props}
    />
  );
}