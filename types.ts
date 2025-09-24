
export interface VocabularyItem {
  id: number;
  term: string;
  parts: Array<{
    label: string;
    content: string | string[];
  }>;
}
