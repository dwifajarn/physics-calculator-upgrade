/** Round to a given number of decimals (default 2), avoiding float noise. */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Format a numeric result for display: integers stay clean, otherwise
 * up to `decimals` significant decimals with trailing zeros trimmed.
 */
export function formatNumber(value: number, decimals = 4): string {
  if (!Number.isFinite(value)) return "";
  if (Number.isInteger(value)) return value.toString();
  const rounded = round(value, decimals);
  // toFixed then trim trailing zeros / dots.
  return rounded
    .toFixed(decimals)
    .replace(/\.?0+$/, "");
}

/** Parse a user-entered string to a finite number. Comma decimals allowed. */
export function parseInput(raw: string): number {
  const normalized = raw.trim().replace(",", ".");
  if (normalized === "") return NaN;
  return Number(normalized);
}
