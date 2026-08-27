// src/config/contentOrder/index.ts

import { lawOrder } from "./bibleStudy/law";
import { redemptionOrder } from "./bibleStudy/redemption";
import { sabbathOrder } from "./bibleStudy/sabbath";
import { standardOrder } from "./bibleStudy/standards";
import { datingOrder } from "./family/dating-courting";
import { immoralityOrder } from "./family/immorality";
import { marriageOrder } from "./family/marriage-purpose";
import { relationshipOrder } from "./family/relationships";
import { biblesopOrder } from "./health/bible-sop";
import { junkOrder } from "./health/junk-foods";
import { diseaseOrder } from "./health/lifestyle-diseases";
import { truthOrder } from "./health/truth";

export const contentOrder = {
  "bible-study": {
    redemption: redemptionOrder,
    law: lawOrder,
    sabbath: sabbathOrder,
    standards: standardOrder,
  },
health: {
  "bible-sop": biblesopOrder,
  "junk-foods": junkOrder,
  "lifestyle-diseases": diseaseOrder,
  truth: truthOrder

},
family: {
  "dating-courting": datingOrder,
  immorality: immoralityOrder,
  "marriage-purpose": marriageOrder,
  relationships: relationshipOrder,

}

} as const;