export type Formatter = (number: number) => string;

export const formatEth: Formatter = (number) =>
  number.toLocaleString(undefined, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });

export const formatWhole: Formatter = (number) =>
  number.toLocaleString(undefined, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

export const formatDollars: Formatter = (number) =>
  Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);

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

export const formatCentsMomentum = (last: number, current: number): string => {
  const momentum = formatMomentum(formatCents, last, current);
  return `\$${formatCents(current)} ${momentum}`;
};

export const formatUsdMomentum = (last: number, current: number): string => {
  const momentum = formatMomentum(formatDollars, last, current);
  return `\$${formatDollars(current)} ${momentum}`;
};

export const formatEthMomentum = (last: number, current: number): string => {
  const momentum = formatMomentum(formatEth, last, current);
  return `Ξ${formatEth(current)} ${momentum}`;
};
