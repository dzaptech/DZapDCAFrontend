import _ from 'lodash';
import { TokenTypes } from '../Types';
import { currencyFormatter, truncateDecimals } from './GeneralUtils';

export const filterBalance = (list: any) => {
  const filterredTokens = list.filter(
    (item: TokenTypes) =>
      +truncateDecimals(currencyFormatter(item.balance, item.decimals)) > 0,
  );
  return _.orderBy(
    filterredTokens.filter(({ quote_rate, balance, decimals }: TokenTypes) => {
      const formattedBalance = +currencyFormatter(balance, decimals);
      return +formattedBalance * quote_rate;
    }, 'desc'),
  );
};

export const trsh = () => {};
