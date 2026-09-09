import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimer — estimates are not professional advice.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Disclaimer</h1>
      <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
        <p>
          All calculators and results on World-Class Calculators are provided for
          general educational and informational purposes only. They are{" "}
          <strong>estimates</strong>, not guarantees.
        </p>
        <p>
          Nothing on this site constitutes professional financial, investment, tax,
          legal, engineering, or medical advice. Always consult a qualified professional
          before making decisions that affect your money, health, or legal rights.
        </p>
        <p>
          Formulas may use simplifying assumptions. Currency conversion uses static
          illustrative rates, not live market data. Health metrics such as BMI and body
          fat estimates are screening tools, not diagnoses.
        </p>
        <p>
          We strive for accuracy but provide the site “as is” without warranties of any
          kind. Use at your own risk.
        </p>
      </div>
    </div>
  );
}
