import { APP_DATA } from '../Constants/AppConstants';
import { TokenTypes } from '../Types';

export const getSlippage = (app: string, chainId: number) =>
  chainId ? APP_DATA[app]?.[chainId]?.slippage : 1;

export const getDefaultToken = (app: string, chainId: number) =>
  chainId ? APP_DATA[app]?.[chainId]?.defaultToken : ({} as TokenTypes);

export const getQuoteExpiry = (app: string, chainId: number) =>
  chainId ? APP_DATA[app]?.[chainId]?.quoteExpiry : 10;

export const getGasMultiplier = (
  app: string,
  chainId: number,
): [number, number] =>
  chainId ? APP_DATA[app]?.[chainId]?.gasMultiplier : [1, 1];
