// Shared formatting utilities for currency and percentages

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (percentage: number): string => {
  return `${Math.round(percentage)}%`;
};
