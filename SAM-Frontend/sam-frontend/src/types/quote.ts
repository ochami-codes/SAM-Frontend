export type QuoteCategory =
  | "bible"
  | "sop"
  | "science"
  | "general";

export interface QuoteData {
  text: string;
  author?: string;
  source?: string;
  category: QuoteCategory;
  reference?: string;
}