export function formatMoney(amountInCents) {
  return (amountInCents / 100).toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function joinWithAnd(arr) {
  if (arr.length === 0) {
    return '';
  }
  if (arr.length === 1) {
    return arr[0];
  }
  const joined = arr.join(', ');
  const lastCommaIndex = joined.lastIndexOf(',');
  if (lastCommaIndex === -1) {
    return joined;
  }
  return `${joined.slice(0, lastCommaIndex)} and ${joined.slice(lastCommaIndex + 2)}`;
}

export function pluralize(count, singular, plural) {
  return count > 1 ? plural : singular;
}
