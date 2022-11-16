export interface DCAContract {
  [key: string]: {
    abi: string;
    [key: number]: string;
  };
}
export const DCA_CONTRACTS: DCAContract = {
  1: {
    137: '0x04966d412E1f9F39DEAB462F59F8eF10Efba11a4',
    80001: '0xf11d9c1F4495B860AD1af996Ba370f8f810BFf7d',
    abi: 'DCA/v1/DZapDCA.json',
  },
};
