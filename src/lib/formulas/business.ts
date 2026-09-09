export function marginFromCostPrice(
  cost: number,
  price: number
): { marginPct: number; markupPct: number; profit: number } {
  const profit = price - cost;
  const marginPct = price === 0 ? NaN : (profit / price) * 100;
  const markupPct = cost === 0 ? NaN : (profit / cost) * 100;
  return { marginPct, markupPct, profit };
}

export function priceFromMargin(cost: number, marginPct: number): number {
  if (marginPct >= 100) return NaN;
  return cost / (1 - marginPct / 100);
}

export function priceFromMarkup(cost: number, markupPct: number): number {
  return cost * (1 + markupPct / 100);
}

export function hourlyToSalary(
  hourly: number,
  hoursPerWeek: number,
  weeksPerYear = 52
): { weekly: number; monthly: number; yearly: number } {
  const weekly = hourly * hoursPerWeek;
  const yearly = weekly * weeksPerYear;
  return { weekly, monthly: yearly / 12, yearly };
}

export function salaryToHourly(
  yearly: number,
  hoursPerWeek: number,
  weeksPerYear = 52
): number {
  return yearly / (hoursPerWeek * weeksPerYear);
}
