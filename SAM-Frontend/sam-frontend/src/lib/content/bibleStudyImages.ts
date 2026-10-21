export interface BibleStudyImage {
  image: string;
  alt: string;
}

export const BIBLE_STUDY_IMAGES: Record<
  string,
  BibleStudyImage
> = {
  redemption: {
    image: "/images/bible-study/redemption~2.jpg",
    alt: "The Story of Redemption",
  },
  "the-law": {
    image: "/images/bible-study/law.jpg",
    alt: "The Law of God",
  },
  "the-sabbath": {
    image: "/images/bible-study/sabbath.jpg",
    alt: "The Sabbath",
  },
  standards: {
    image: "/images/bible-study/standards.jpg",
    alt: "Christian Living and Standards",
  },
};
export const DEFAULT_BIBLE_STUDY_IMAGE = "/images/bible-study/bible-light.jpg";