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
  | "statistics";

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
}

export interface ResultItem {
  label: string;
  value: string;
  emphasize?: boolean;
  hint?: string;
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
}

export interface CategoryMeta {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
}
