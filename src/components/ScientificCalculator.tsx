"use client";

import { useState } from "react";

const BUTTONS: string[][] = [
  ["C", "←", "(", ")"],
  ["sin", "cos", "tan", "√"],
  ["log", "ln", "π", "^"],
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "−"],
  ["0", ".", "=", "+"],
];

function evaluateExpression(raw: string): number {
  const expr = raw
    .replace(/π/g, `(${Math.PI})`)
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/−/g, "-")
    .replace(/√\(/g, "Math.sqrt(")
    .replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/\^/g, "**");

  // Convert bare trig calls like sin30 → sin(30) not supported; require parentheses via UI.
  const fn = new Function(`"use strict"; return (${expr});`);
  const result = fn();
  if (typeof result !== "number" || !Number.isFinite(result)) {
    throw new Error("Invalid");
  }
  return result;
}

export function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [error, setError] = useState<string | null>(null);

  function press(key: string) {
    setError(null);
    if (key === "C") {
      setDisplay("0");
      return;
    }
    if (key === "←") {
      setDisplay((d) => (d.length <= 1 ? "0" : d.slice(0, -1)));
      return;
    }
    if (key === "=") {
      try {
        const value = evaluateExpression(display);
        setDisplay(String(Number(value.toPrecision(12))));
      } catch {
        setError("Could not evaluate expression. Use parentheses for functions, e.g. sin(0.5).");
      }
      return;
    }
    if (["sin", "cos", "tan", "log", "ln", "√"].includes(key)) {
      setDisplay((d) => (d === "0" ? `${key}(` : `${d}${key}(`));
      return;
    }
    setDisplay((d) => (d === "0" && /[0-9π]/.test(key) ? key : d + key));
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 rounded-xl bg-slate-900 px-4 py-4 text-right font-mono text-2xl text-teal-300 break-all min-h-[3.5rem]">
        {display}
      </div>
      {error && <p className="mb-2 text-xs text-rose-600">{error}</p>}
      <div className="grid grid-cols-4 gap-2">
        {BUTTONS.flat().map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => press(key)}
            className={`rounded-xl py-3 text-sm font-semibold transition ${
              key === "="
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : ["C", "←"].includes(key)
                  ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
                  : "bg-slate-100 text-slate-800 hover:bg-slate-200"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Trig functions use radians. Example: sin(1), log(100), √(16), 2^10.
      </p>
    </div>
  );
}
