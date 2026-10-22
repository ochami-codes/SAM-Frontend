"use client";

import type {
ManagedContentSection,
ManagedContentStatus,
} from "@/src/lib/api/managedContent";

import type { ContentSection } from "@/src/config/contentMetadata";

import { ContentHeroImageField } from "./metadata/ContentHeroImageField";
import { ContentOrderField } from "./metadata/ContentOrderField";
import { ContentSectionField } from "./metadata/ContentSectionField";
import { ContentCategoryField } from "./metadata/ContentCategoryField";
import { ContentSlugField } from "./metadata/ContentSlugField";
import { ContentStatusField } from "./metadata/ContentStatusField";
import { ContentTitleField } from "./metadata/ContentTitleField";

export interface ManagedContentMetadataValues {
title: string;
slug: string;
section: ManagedContentSection;
category: string;
heroImage: string;
order?: number;
status: ManagedContentStatus;
}

interface ManagedContentMetadataProps {
values: ManagedContentMetadataValues;
sections: ContentSection[];
mode: "create" | "edit";
onChange: <K extends keyof ManagedContentMetadataValues>(
field: K,
value: ManagedContentMetadataValues[K]
) => void;
}

export function ManagedContentMetadata({
values,
sections,
mode,
onChange,
}: ManagedContentMetadataProps) {
return ( <div className="rounded-lg border border-gray-200 bg-white"> <div className="border-b border-gray-200 px-5 py-4"> <h2 className="font-semibold text-gray-900">
Content Details </h2>

    <p className="mt-1 text-sm text-gray-500">
      Configure the metadata for this content.
    </p>
  </div>

  <div className="space-y-5 p-5">
    <ContentTitleField
      value={values.title}
      onChange={(value: string) => onChange("title", value)}
    />

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <ContentSectionField
        value={values.section}
        sections={sections}
        onChange={(value: string) =>
          onChange("section", value as ManagedContentSection)
        }
        onResetCategory={() => onChange("category", "")}
      />
<ContentCategoryField
  key={values.section}
  section={values.section}
  value={values.category}
  sections={sections}
  onChange={(value: string) => onChange("category", value)}
/>
    </div>

    <ContentSlugField
      value={values.slug}
      onChange={(value: string) => onChange("slug", value)}
    />

    <ContentHeroImageField
      value={values.heroImage}
      onChange={(value: string) => onChange("heroImage", value)}
    />

    <ContentOrderField
      value={values.order}
      onChange={(value: number | undefined) =>
        onChange("order", value)
      }
    />

    {mode === "create" && (
      <ContentStatusField
        value={values.status}
        onChange={(value: ManagedContentStatus) =>
          onChange("status", value)
        }
      />
    )}
  </div>
</div>
);
}
