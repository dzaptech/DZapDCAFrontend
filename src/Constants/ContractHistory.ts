export interface DCAContract {
  [key: string]: {
    abi: string;
    [key: number]: string;
  };
}
export const DE_ZAP_CONTRACTS: DCAContract = {
  1: {
    80001: '0x3EB3c44004f874b0594c55E785ED55b192FD26E6',
    abi: 'DCA/v1/DZapDCA.json',
  },
};
