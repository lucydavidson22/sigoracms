import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Commission } from './commission.model';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  commissionCalculated = new EventEmitter<Commission>();

  commissionEarned!: number;
  constructor() {

   }

   getCommission(commission: Commission){
     if(!commission){
       console.log("There was an error")
     }
    let redline = commission?.systemSize * 3000;
    let dealerFee = (commission?.dealerFee / 100) * commission?.totalCustomerCost;
    this.commissionEarned = ((commission?.totalCustomerCost - redline) - dealerFee) - commission?.adders;
    console.log("are we getting  commission?");
    console.log(this.commissionEarned);
    return this.commissionEarned + "";
   }

}
