export class Commission{
  constructor(
    public id: string,
    public systemSize:number,
      public totalCustomerCost:number,
      public dealerFee:number,
      public adders:number,
      public commissionEarned:number
      ){}
}
