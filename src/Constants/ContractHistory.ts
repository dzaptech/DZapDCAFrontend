export interface DCAContract {
  [key: string]: {
    abi: string;
    [key: number]: string;
  };
}
export const DCA_CONTRACTS: DCAContract = {
  1: {
    137: '0x49965F251B9Fab7FfAE9C15b863F9188E5131B87',
    80001: '0xf11d9c1F4495B860AD1af996Ba370f8f810BFf7d',
    abi: 'DCA/v1/DZapDCA.json',
  },
};
