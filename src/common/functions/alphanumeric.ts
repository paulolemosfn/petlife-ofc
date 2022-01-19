interface AlphanumericProps {
  initials: string;
  limit?: number;
  totalQuantity: number;
}

function generateAlphaNumeric({
  initials,
  totalQuantity,
  limit = 6,
}: AlphanumericProps): string {
  const currentValue = Number(totalQuantity) + 1;

  let alphanumeric = initials
    .padEnd(limit - 1, '0')
    .concat(String(currentValue));

  if (alphanumeric.length > limit) {
    do {
      alphanumeric = alphanumeric.replace('0', '');
    } while (alphanumeric.length > limit);
  }

  return alphanumeric;
}

export { generateAlphaNumeric };
