
// utils/formatPrice.ts
export const formatPrice = (price: number, currency: string = 'BDT') => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    }).format(price);
  };
  