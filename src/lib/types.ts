export type CategorySlug =
  | "finance"
  | "math"
  | "health-fitness"
  | "conversion"
  | "date-time"
  | "everyday-life"
  | "science-engineering"
  | "business"
  | "education"
  | "statistics"
  | "commodities";

export type FieldType = "number" | "select" | "date" | "text" | "textarea";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  defaultValue?: string | number;
  options?: FieldOption[];
  min?: number;
  max?: number;
  step?: number | string;
  suffix?: string;
  prefix?: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  /** Marks a money input — prefix tracks display currency. */
  money?: boolean;
  /**
   * Show this field only when another field's value is one of `in`.
   * Used for mode-aware forms (solve-for-X, converters, etc.).
   */
  visibleWhen?: { field: string; in: string[] };
}

export interface ResultTable {
  headers: string[];
  rows: string[][];
}

export interface ResultChartBar {
  label: string;
  value: number;
}

export interface ResultLineSeries {
  key: string;
  label: string;
  color?: string;
}

export interface ResultLineChart {
  xKey: string;
  series: ResultLineSeries[];
  points: Array<Record<string, string | number>>;
}

export interface ResultItem {
  label: string;
  value: string;
  emphasize?: boolean;
  hint?: string;
  table?: ResultTable;
  chart?: ResultChartBar[];
  lineChart?: ResultLineChart;
}

export type ComputeFn = (
  values: Record<string, string>
) => ResultItem[] | { error: string };

export type CalculatorKind = "form" | "custom";

export interface CalculatorMeta {
  slug: string;
  category: CategorySlug;
  name: string;
  shortName?: string;
  description: string;
  keywords: string[];
  featured?: boolean;
  popular?: boolean;
  kind: CalculatorKind;
  /** For form-driven calculators */
  fields?: FieldDef[];
  compute?: ComputeFn;
  /** Custom component key for special UIs */
  customKey?: string;
  formulaNote?: string;
  related?: string[];
  /** When true, form recalculates live as fields change (default true). */
  liveCalc?: boolean;
  /** Show currency picker and format money with selected currency. */
  usesMoney?: boolean;
}

export interface CategoryMeta {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WorkedExample {
  title: string;
  steps: string[];
  result: string;
}

export interface CalculatorSeoContent {
  /** Longer on-page explainer (flagship pages). */
  overview?: string;
  /** Situations / audiences that benefit from this tool. */
  whenToUse?: string[];
  /** Common input/interpretation gotchas for this tool. */
  commonMistakes?: string[];
  /** Short numbered steps shown as “How to use”. */
  howToUse?: string[];
  /** Guidance on reading the outputs. */
  howToInterpret?: string[];
  /** Concrete worked example with steps + result. */
  workedExample?: WorkedExample;
  /** 4–8 FAQ pairs for FAQPage JSON-LD + on-page accordion. */
  faqs?: FaqItem[];
  /** Overrides or fills formulaNote when the registry entry lacks one. */
  formulaNote?: string;
  /** Unique <title> override (without site suffix). */
  seoTitle?: string;
  /** Unique meta description override. */
  seoDescription?: string;
}
