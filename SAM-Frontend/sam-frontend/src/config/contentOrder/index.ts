// src/config/contentOrder/index.ts

import { lawOrder } from "./bibleStudy/law";
import { redemptionOrder } from "./bibleStudy/redemption";
import { sabbathOrder } from "./bibleStudy/sabbath";
import { standardOrder } from "./bibleStudy/standards";


export const contentOrder = {
  "bible-study": {
    redemption: redemptionOrder,
    law: lawOrder,
    sabbath: sabbathOrder,
    standards: standardOrder,
  },


} as const;