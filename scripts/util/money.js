export function formatCurrency(priceCents) {
    // Convert cents to dollars and format as currency string
    return (Math.round(priceCents) / 100).toFixed(2);
}