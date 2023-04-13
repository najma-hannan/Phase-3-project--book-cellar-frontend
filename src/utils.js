export function formatMoney(amountInCents) {
    return (amountInCents/100).toLocaleString("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}
