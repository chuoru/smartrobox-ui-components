export const useNumberFormat = () => {
  const formatLocaleNumber = (value: number, lang: string) => {
    return new Intl.NumberFormat(lang, {
      maximumFractionDigits: 6, // default maximumFractionDigits is 3.
    }).format(value);
  };

  const formatLocaleNumberWithDigits = (
    value: number,
    lang: string,
    digits: number,
    removeTrailingZero: boolean = false,
  ) => {
    if (removeTrailingZero) {
      const rounded = Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits);
      const hasDecimal = rounded % 1 !== 0;
      return new Intl.NumberFormat(lang, {
        minimumFractionDigits: hasDecimal ? digits : 0,
        maximumFractionDigits: digits,
      }).format(rounded);
    } else {
      return new Intl.NumberFormat(lang, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(value);
    }
  };

  return {
    formatLocaleNumber,
    formatLocaleNumberWithDigits,
  };
};
