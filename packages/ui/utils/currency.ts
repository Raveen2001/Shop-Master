const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});
export function formatCurrency(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}
