import { MDXRemote } from "next-mdx-remote/rsc";

import Quote from "@/src/components/ui/Quote";
import PrayerRequestForm from "@/src/components/forms/PrayerRequestForm";
import { ManagedContentSection } from "@/src/lib/api/managedContent";

interface ManagedContentMdxRendererProps {
  title: string;
  heroImage: string;
  section: ManagedContentSection;
  category?: string;
  content: string;
}

export function ManagedContentMdxRenderer({
  content,
}: ManagedContentMdxRendererProps) {
  return (
    <MDXRemote
      source={content}
      components={{
        Quote,
        PrayerRequestForm,
      }}
    />
  );
}