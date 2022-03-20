import { Injectable } from '@angular/core';
import { Commission } from './commission.model';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  commissionEarned!: number;
  constructor() {

   }

   getCommission(commission: Commission){
    let redline = commission.systemSize * 3000;
    let dealerFee = (commission.dealerFee / 100) * commission.totalCustomerCost;
    this.commissionEarned = ((commission.totalCustomerCost - redline) - dealerFee) - commission.adders;
    console.log("are we getting  commission?");
    console.log(this.commissionEarned);
    return this.commissionEarned;
   }

}