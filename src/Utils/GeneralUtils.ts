import { BigNumber, ethers } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import logoAlternateToken from '../Assets/Icons/ethereum.svg';
import { dissolveExponentialNotation } from './NumberUtils';

export const camelCaseToSpaces = (str: string): string =>
  str
    .replace(/([A-Z][a-z0-9]+)/g, ' $1 ')
    .replace(/\s{2}/g, ' ')
    .trim();

export const stringValidation = {
  isNotEmpty(str: string) {
    const pattern = /\S+/;
    return pattern.test(str);
  },
  isNumber(str: string) {
    const pattern = /^\d+\.?\d*$/;
    return pattern.test(str);
  },
  isSame(str1: string, str2: string) {
    return str1 === str2;
  },
};
export const formatDecimalsUpto = (number: number, decimals: number) => {
  let formattedNumber = number;
  const newDecimal = 10 ** decimals;
  const numArray = formattedNumber.toString().split('.');
  let decimalPlaces = 0;
  if (typeof numArray[1] !== 'undefined') {
    decimalPlaces = numArray[1].length;
  }
  if (decimalPlaces > decimals) {
    formattedNumber *= newDecimal;
    formattedNumber = Math.trunc(number);
    formattedNumber /= newDecimal;
    return formattedNumber;
  }
  return formattedNumber;
};

export const truncateDecimals = (value: number | string, index: number = 4) => {
  const number = dissolveExponentialNotation(value);
  return number.toString().indexOf('.') > 0
    ? number.toString().slice(0, number.toString().indexOf('.') + (index + 1))
    : number;
};

export const abbreviateNumber = (num: number, digits = 4) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((data) => num >= data.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : truncateDecimals(num);
};

// Converts small unit to big unit => Like WEI to ETH -> 1000000 => 1 USDT, returns a String
export const currencyFormatter = (
  value: number | string | BigNumber,
  decimal: number,
) =>
  truncateDecimals(
    ethers.utils.formatUnits(ethers.BigNumber.from(value.toString()), decimal),
    6,
  );

// Converts small unit to big unit => Like WEI to ETH -> 1000000 => 1 USDT, returns a String
export const abbreviateCurrency = (
  value: number | string | BigNumber,
  decimals: number,
) => abbreviateNumber(+currencyFormatter(value, decimals), 4);

export const parseCurrencyToBigNumber = (
  valueString: string | number,
  decimal: number,
) => ethers.utils.parseUnits(valueString.toString(), decimal);

export const isNumber = (input: string) => /^-?[\d.]+(?:e-?\d+)?$/.test(input);

export const getAlternateTokenIcon = () => logoAlternateToken;

export const getAddressChecksum = (address: string) => getAddress(address);

export const parseJsonString = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
};

export const formatSecondsToDHM = (seconds: number) => {
  const day = Math.floor(seconds / (3600 * 24));
  const hour = Math.floor((seconds % (3600 * 24)) / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const dDisplay = day > 0 ? day + (day === 1 ? ' Day, ' : ' Days, ') : '';
  const hDisplay = hour > 0 ? hour + (hour === 1 ? ' hr, ' : ' hrs, ') : '';
  const mDisplay = minute > 0 ? minute + (minute === 1 ? ' min, ' : ' min, ') : '';
  const outForDisplay = dDisplay + hDisplay + mDisplay;
  return outForDisplay.slice(0, -2);
};

export const getTimestampInSeconds = () =>
  Math.floor(new Date().getTime() / 1000);
