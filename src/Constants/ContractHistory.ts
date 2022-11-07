export interface DCAContract {
  [key: string]: {
    abi: string;
    [key: number]: string;
  };
}
export const DCA_CONTRACTS: DCAContract = {
  1: {
    137: '0xaD41FB612932930a96C756e9a6b49aBeeeC433dE',
    abi: 'DCA/v1/DZapDCA.json',
  },
};
