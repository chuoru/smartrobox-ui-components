const MAC_REGEX = /^([0-9A-Fa-f]{2}[:\-]){5}[0-9A-Fa-f]{2}$|^([0-9A-Fa-f]{4}\.){2}[0-9A-Fa-f]{4}$|^[0-9A-Fa-f]{12}$/;

export const useMacAddress = () => {
  const isValid = (value: string) => MAC_REGEX.test(value);

  return {
    isValid,
  };
};
