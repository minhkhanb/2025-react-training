export const rounded = (value: number) => {
  if (!value && value !== 0) {
    return '';
  }

  return (Math.round(value * 100) / 100).toString();
};

export const camelCase = (value: string) => {
  return value
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');
};
