export function formatAmount (amount: string, fraction = 4): string {
    const formattedAmount = amount.padStart(19, '0')
    const fractionPart = formattedAmount.substr(formattedAmount.length - 18).substr(0, fraction)
    const intPart = formattedAmount.substr(0, formattedAmount.length - 18)

    return `${intPart}.${fractionPart}`
}

// Prevent breakchanges
export function formatAmountTwoFraction (amount: string, fraction = 2): string {
    const formattedAmount = amount.padStart(19, '0')
    const fractionPart = formattedAmount.substr(formattedAmount.length - 18).substr(0, fraction)
    const intPart = formattedAmount.substr(0, formattedAmount.length - 18)
    
    return `${intPart}.${fractionPart}`
}

// CAPs/REME conversion formulas
export function calculateCapsAvailable(totalCapsEarned: number, capsConverted: number) {
  return totalCapsEarned - capsConverted;
}

export function calculateUnconvertedCapsValue(capsAvailable: number, exchangeRate: number, remePrice: number) {
  // Value = (CAPs available / exchange rate) * REME price
  return (capsAvailable / exchangeRate) * remePrice;
}

export function calculateConvertedRemeValue(remeHeld: number, remePrice: number) {
  return remeHeld * remePrice;
}

export function calculateRemeFromCaps(capsToConvert: number, exchangeRate: number) {
  return capsToConvert / exchangeRate;
}

export function calculateTotalRemeAvailable(remeHeld: number, remeSpent: number) {
  return remeHeld - remeSpent;
}

