export interface DCAContract {
  [key: string]: {
    abi: string;
    [key: number]: string;
  };
}
export const DCA_CONTRACTS: DCAContract = {
  1: {
    137: '0x4C0145d647d6836fD07CD728304b3eB446b4f620',
    // 80001: '0xf11d9c1F4495B860AD1af996Ba370f8f810BFf7d',
    abi: 'DCA/v1/DZapDCA.json',
  },
};
