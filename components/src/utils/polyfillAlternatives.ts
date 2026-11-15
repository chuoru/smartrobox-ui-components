export const sleep = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export const decodeBase64 = (value: string) => {
  const binaryString = atob(value);
  const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  const customLayoutJson = new TextDecoder().decode(bytes);
  return customLayoutJson;
};
