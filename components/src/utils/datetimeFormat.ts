export const dateShortFormat = (date: number | string | Date, lang: string) => {
  if (!date) {
    return null;
  }
  return Intl.DateTimeFormat(lang, { dateStyle: 'short' }).format(new Date(date));
};

export const datetimeShortFormat = (date: number | string | Date, lang: string) => {
  if (!date) {
    return null;
  }
  return Intl.DateTimeFormat(lang, { dateStyle: 'short', timeStyle: 'medium' }).format(new Date(date));
};

export const durationFormat = (duration: number) => {
  if (duration === undefined || duration === null) {
    return null;
  }
  const totalSeconds = Math.trunc(duration);
  const minutes = Math.trunc(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const pad02 = (n: number) => n.toString().padStart(2, '0');
  return `${pad02(minutes)}:${pad02(seconds)}`;
};

export const fractionFormat = (value: number | bigint, lang: string, digits: number) => {
  if (!digits) return null;

  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
};
