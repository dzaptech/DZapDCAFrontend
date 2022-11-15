export interface DCAContract {
  [key: string]: {
    abi: string;
    [key: number]: string;
  };
}
export const DCA_CONTRACTS: DCAContract = {
  1: {
    137: '0x42c21cc2CEB757B0c675966c7801F153a4f405f3',
    80001: '0xf11d9c1F4495B860AD1af996Ba370f8f810BFf7d',
    abi: 'DCA/v1/DZapDCA.json',
  },
};
