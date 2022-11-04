export const fixRoundOffError = (num: number, decimals: number) => {
  const zeros = '0'.repeat(decimals);
  const upto = `1${zeros}`;
  const result = Math.round(num * +upto) / +upto;
  return result;
};

export const dissolveExponentialNotation = (x: any) => {
  let number = x;
  if (Math.abs(number) < 1.0) {
    const e = parseInt(number.toString().split('e-')[1], 10);
    if (e) {
      number *= 10 ** e - 1;
      number = `0.${new Array(e).join('0')}${number.toString().substring(2)}`;
    }
  } else {
    let e = parseInt(number.toString().split('+')[1], 10);
    if (e > 20) {
      e -= 20;
      number /= 10 ** e;
      number += new Array(e + 1).join('0');
    }
  }
  return number;
};
