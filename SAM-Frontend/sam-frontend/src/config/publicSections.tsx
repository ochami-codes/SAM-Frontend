import type { ReactNode } from "react";

export type PublicSectionTheme =
| "bible"
| "health"
| "family";

export interface PublicSectionFeature {
title: string;
href: string;
image: string;
alt: string;
}

export interface PublicSectionConfig {
title: string;
description: string;
heroImage: string;
theme?: PublicSectionTheme;
subtitle?: ReactNode;
features?: PublicSectionFeature[];
}

export const publicSections: Record<
string,
PublicSectionConfig

> = {
 "bible-study": {
 title: "Bible Study",
 description:
 "Explore biblical teachings, discover present truth, and deepen your understanding of God's Word.",
 heroImage: "/images/bible-study/bible-light.jpg",
 theme: "bible",
 subtitle: ( <em>
 "Search the scriptures; for in them ye think ye have
 eternal life: and they are they which testify of me."
 {" — John 5:39"} </em>
 ),
 },

health: {
title: "Health Corner",
description:
"Discover practical health principles and biblical guidance for a healthier, more balanced life.",
heroImage: "/images/health/eden.png",
theme: "health",
subtitle: ( <em>
"Beloved, I wish above all things that thou mayest
prosper and be in health..." — 3 John 1:2 </em>
),
features: [
{
title: "Health Checker Tools",
href: "/public/health/health-checker",
image: "/images/health/health-tools.jpg",
alt: "Health assessment tools",
},
],
},

family: {
title: "Family Corner",
description:
"Find biblical guidance on relationships, marriage, family life, and building Christ-centered homes.",
heroImage: "/images/family/why_marriage.png",
theme: "family",
subtitle: ( <em> "Except the LORD build the house, they labour in
vain that build it." — Psalm 127:1 </em>
),
},
};
