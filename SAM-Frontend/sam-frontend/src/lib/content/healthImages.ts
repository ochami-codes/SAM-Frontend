export interface HealthImage {
  image: string;
  alt: string;
}

export const HEALTH_IMAGES: Record<string, HealthImage> = {
  "bible-sop": {
    image: "/images/health/bsop.png",
    alt: "Bible and Spirit of Prophecy",
  },
  truth: {
    image: "/images/health/research.png",
    alt: "Scientific research on nutrition",
  },
  "lifestyle-diseases": {
    image: "/images/health/glucometer.jpg",
    alt: "Blood glucose testing",
  },
  "junk-foods": {
    image: "/images/health/junk.jpg",
    alt: "Junk foods",
  },
};

export const DEFAULT_HEALTH_IMAGE = {
  image: "/images/health/eden.png",
  alt: "Health and wellness",
};