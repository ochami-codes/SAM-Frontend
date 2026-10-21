import type { ReactNode } from "react";

export type ContentCategoryTheme = "bible" | "health" | "family";

export interface ContentCategoryMetadata {
  title: string;
  heroImage?: string;
  theme: ContentCategoryTheme;
  heroQuote?: ReactNode;
}

type CategoryMetadataMap = Record<string, Record<string, ContentCategoryMetadata>>;

export const contentCategoryMetadata: CategoryMetadataMap = {
  "bible-study": {
    redemption: {
      title: "The Story of Redemption",
      heroImage: "/images/bible-study/redemption~2.jpg",
      theme: "bible",
      heroQuote: (
        <>
          “And I will put enmity between thee and the woman... it shall bruise thy head, and thou
          shalt bruise his heel.” <br />
          <strong>— Genesis 3:15</strong>
        </>
      ),
    },
    standards: {
      title: "The Christian Living Standards",
      heroImage: "/images/bible-study/standards.jpg",
      theme: "bible",
      heroQuote: (
        <>
          “Be not conformed to this world: but be ye transformed by the renewing of your mind...”
          <br />
          <strong>— Romans 12:2</strong>
        </>
      ),
    },
    "the-law": {
      title: "The Law of God",
      heroImage: "/images/bible-study/law.jpg",
      theme: "bible",
      heroQuote: (
        <>
          “Here is the patience of the saints: here are they that keep the commandments of God,
          and the faith of Jesus.” <br />
          <strong>— Revelation 14:12</strong>
        </>
      ),
    },
    "the-sabbath": {
      title: "The Sabbath",
      heroImage: "/images/bible-study/sabbath.jpg",
      theme: "bible",
      heroQuote: (
        <>
          “If thou turn away thy foot from the sabbath, to do thy pleasure on my holy day; then
          shalt thou delight thyself in the LORD.” <br />
          <strong>— Isaiah 58:13</strong>
        </>
      ),
    },
  },

  health: {
    "bible-sop": {
      title: "The Bible and the Spirit of Prophecy",
      heroImage: "/images/health/bsop.png",
      theme: "health",
      heroQuote: (
        <>
          “I will put none of these diseases upon thee... for I am the LORD that healeth thee.”{" "}
          <br />
          <strong>— Exodus 15:26</strong>
        </>
      ),
    },
    "junk-foods": {
      title: "Junk and Harmful Food Articles",
      heroImage: "/images/health/junk.jpg",
      theme: "health",
      heroQuote: (
        <>
          “Wherefore do ye spend money for that which is not bread? and your labour for that which
          satisfieth not? hearken diligently unto me, and eat ye that which is good, and let your
          soul delight itself in fatness.” <br />
          <strong>— Isaiah 55:2</strong>
        </>
      ),
    },
    "lifestyle-diseases": {
      title: "Lifestyle Diseases",
      heroImage: "/images/health/glucometer.jpg",
      theme: "health",
      heroQuote: (
        <>
          “Behold, I have set before you this day a blessing and a curse: If thou hearken to the
          voice of the LORD thy God, to keep his commandments and his statutes which are written
          in this book of the law; then shalt thou live and be happy.” <br />
          <strong>— Deuteronomy 11:26-28</strong>
        </>
      ),
    },
    truth: {
      title: "The Truth About Proteins, Fats and Carbohydrates",
      heroImage: "/images/health/research.png",
      theme: "health",
      heroQuote: (
        <>
          “I will put none of these diseases upon thee... for I am the LORD that healeth thee.”{" "}
          <br />
          <strong>— Exodus 15:26</strong>
        </>
      ),
    },
  },

  family: {
    "dating-courting": {
      title: "Dating Vs Courting",
      heroImage: "/images/family/courting.jpg",
      theme: "family",
      heroQuote: (
        <>
          “As for me and my house, we will serve the LORD.” <br />
          <strong>— Joshua 24:15</strong>
        </>
      ),
    },
    immorality: {
      title: "Sexual Immorality",
      heroImage: "/images/family/purity.jpg",
      theme: "family",
      heroQuote: (
        <>
          “As for me and my house, we will serve the LORD.” <br />
          <strong>— Joshua 24:15</strong>
        </>
      ),
    },
    "marriage-purpose": {
      title: "The Purpose of Marriage",
      heroImage: "/images/family/why_marriage.png",
      theme: "family",
      heroQuote: (
        <>
          “As for me and my house, we will serve the LORD.” <br />
          <strong>— Joshua 24:15</strong>
        </>
      ),
    },
    relationships: {
      title: "Common Relationships Questions",
      heroImage: "/images/family/relationship.jpg",
      theme: "family",
      heroQuote: (
        <>
          “As for me and my house, we will serve the LORD.” <br />
          <strong>— Joshua 24:15</strong>
        </>
      ),
    },
  },
};