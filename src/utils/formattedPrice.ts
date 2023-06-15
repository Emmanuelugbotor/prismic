function formattedPrice(price: number): string {
  let locale = "en-US";
  let currency = "USD";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
}

export default formattedPrice;
