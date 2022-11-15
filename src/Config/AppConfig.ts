const { REACT_APP_BASE_API_URL, NODE_ENV } = process.env;

export let baseApiUrl = REACT_APP_BASE_API_URL || 'https://api.dzap.io/';
// let baseApiUrl = REACT_APP_BASE_API_URL || 'https://dezap-backend.herokuapp.com/';

if (NODE_ENV === 'development') {
  //   baseApiUrl = 'https://dezap-backend.herokuapp.com/';
  baseApiUrl = 'https://api.dzap.io/';
  //   baseApiUrl = 'http://127.0.0.1:8080/';
}

export const dcaVersion = +parseFloat(
  process.env.REACT_APP_DE_ZAP_VERSION || '1',
);

export const defaultChainId = 80001;

export const GRAPH_API: { [key: number]: string } = {
  [defaultChainId]:
    'https://api.thegraph.com/subgraphs/name/dante055/dcatestmumbai',
  137: 'https://api.thegraph.com/subgraphs/name/dante055/zelato-polygon-tesnet-v1',
};
