import { baseApiUrl } from "./AppConfig";

const token = 'token/';

const urls = {
  // Token API's
  getAllBalanceOf: `${baseApiUrl}${token}balance-of`,
  getTokenDetails: `${baseApiUrl}${token}get-details`,
  getTokensPrice: `${baseApiUrl}${token}get-price`,
  getAllTokens: `${baseApiUrl}${token}get-all`,
};
export default urls;
