export interface FamilyImage {
  image: string;
  alt: string;
}

export const FAMILY_IMAGES: Record<string, FamilyImage> = {
  "marriage-purpose": {
    image: "/images/family/why_marriage.png",
    alt: "Purpose of Marriage and Family",
  },
  "dating-courting": {
    image: "/images/family/courting.jpg",
    alt: "Dating and Courting",
  },
  relationships: {
    image: "/images/family/relationship.jpg",
    alt: "Common Questions on Relationships",
  },
  immorality: {
    image: "/images/family/purity.jpg",
    alt: "Sexual Purity",
  },
};

export const DEFAULT_FAMILY_IMAGE = "/images/family/why_marriage.png";