export type Formatter = (number: number) => string;

export const formatEth: Formatter = (number) =>
  number.toLocaleString(undefined, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });

export const formatDollars: Formatter = (number) =>
  number.toLocaleString(undefined, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

export const formatCents: Formatter = (number) =>
  number.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export const formatMomentum = (
  formatter: Formatter,
  number?: number,
  lastNumber?: number
): string => {
  if (!number || !lastNumber) {
    return "→";
  }
  if (number == lastNumber) {
    return "→";
  }

  const updown = lastNumber < number ? "↗" : "↘";
  return `${updown}${formatter(Math.abs(lastNumber - number))}`;
};
