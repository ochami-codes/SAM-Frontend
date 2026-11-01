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
    image: "/images/health/proteins_carbs_fats.jpg",
    alt: "Scientific research on nutrition",
  },
  "lifestyle-diseases": {
    image: "/images/health/lifestyle_diseases.jpg",
    alt: "Blood glucose testing",
  },
  "junk-foods": {
    image: "/images/health/harmful_foods.jpg",
    alt: "Junk foods",
  },
};

export const DEFAULT_HEALTH_IMAGE = {
  image: "/images/health/health_corner.jpg",
  alt: "Health and wellness",
};
