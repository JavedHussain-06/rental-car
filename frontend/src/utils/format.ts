export const formatCurrency = (value: number, currency = "INR"): string =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(value);

export const formatDate = (date: string | Date): string =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(date));

export const formatDateRange = (start: string | Date, end: string | Date): string =>
  `${formatDate(start)} – ${formatDate(end)}`;

export const calcDays = (start: string | Date, end: string | Date): number => {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
};

export const calcRentalTotal = (pricePerDay: number, start: string | Date, end: string | Date): number =>
  pricePerDay * calcDays(start, end);
