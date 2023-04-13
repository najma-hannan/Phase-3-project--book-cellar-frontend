export function formatMoney(amountInCents) {
    return (amountInCents/100).toLocaleString("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
}
