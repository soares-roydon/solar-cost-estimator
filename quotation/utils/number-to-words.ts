const ONES = [
  '',
  'One ',
  'Two ',
  'Three ',
  'Four ',
  'Five ',
  'Six ',
  'Seven ',
  'Eight ',
  'Nine ',
  'Ten ',
  'Eleven ',
  'Twelve ',
  'Thirteen ',
  'Fourteen ',
  'Fifteen ',
  'Sixteen ',
  'Seventeen ',
  'Eighteen ',
  'Nineteen ',
];

const TENS = [
  '',
  '',
  'Twenty ',
  'Thirty ',
  'Forty ',
  'Fifty ',
  'Sixty ',
  'Seventy ',
  'Eighty ',
  'Ninety ',
];

function convertTwoDigits(n: number): string {
  if (n < 20) return ONES[n];
  return TENS[Math.floor(n / 10)] + ONES[n % 10];
}

function convertThreeDigits(n: number): string {
  let str = '';
  if (n >= 100) {
    str += ONES[Math.floor(n / 100)] + 'Hundred ';
    n %= 100;
  }
  if (n > 0) {
    str += convertTwoDigits(n);
  }
  return str;
}

/**
 * Converts a numeric amount into Indian currency words.
 * Example: 811850 -> "Eight Lakh Eleven Thousand Eight Hundred Fifty Rupees Only."
 */
export function numberToWordsIndian(value: number): string {
  let num = Math.round(Math.abs(value));
  if (num === 0) return 'Zero Rupees Only.';

  let result = '';

  const crore = Math.floor(num / 10000000);
  num %= 10000000;

  const lakh = Math.floor(num / 100000);
  num %= 100000;

  const thousand = Math.floor(num / 1000);
  num %= 1000;

  const remainder = num;

  if (crore > 0) {
    result += (crore < 100 ? convertTwoDigits(crore) : convertThreeDigits(crore)) + 'Crore ';
  }
  if (lakh > 0) {
    result += convertTwoDigits(lakh) + 'Lakh ';
  }
  if (thousand > 0) {
    result += convertTwoDigits(thousand) + 'Thousand ';
  }
  if (remainder > 0) {
    result += convertThreeDigits(remainder);
  }

  return result.trim() + ' Rupees Only.';
}
