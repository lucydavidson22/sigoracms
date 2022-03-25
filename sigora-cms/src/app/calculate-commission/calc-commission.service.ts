import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalculatedCommission } from './calc-commission.model';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  commissionListChangedEvent = new Subject<CalculatedCommission[]>();
  commissionSelectedEvent = new EventEmitter<CalculatedCommission>();
  commissionChangedEvent = new EventEmitter<CalculatedCommission[]>();
  private commissions: CalculatedCommission[] = [];
  maxCommissionId!: number;
  commissionEarned!: number;

  constructor(private http: HttpClient) {
    this.getCommissionsHttp();
   }

   getCommissions(){
     return this.commissions.slice();
   }

   getCommissionsHttp(){
     console.log('commission http entered');
    return this.http
    //  .get<Commission[]>('https://lucyd-cms-default-rtdb.firebaseio.com/commissions.json')
     .get<CalculatedCommission[]>('http://localhost:3000/commissions')
     .subscribe(
       //success method
       (commissions:CalculatedCommission[]) => {
         console.log('commissions', commissions);
         this.commissions = commissions;    //Assign the array of commissions received to the commissions property.
         this.maxCommissionId = this.getMaxId();  //get the maximum value used for the id property in the commission list, assign the value returned to the maxCommissionId
         commissions.sort((a, b) => {    //Sort the list of commissions by name using the sort() JavaScript array method.
           if(a.id > b.id){ return 1; }
           if(a.id < b.id){ return -1; }
           else { return 0; }
          });
            // this.commissionChangedEvent.emit(this.commissions.slice());   //emit the next commission list change event
            let commissionsListClone = this.commissions.slice();
            this.commissionListChangedEvent.next(commissionsListClone);
       }
       //error method
       ,(error: any)=> {
         console.log(error.message)
       }
     );
   }

   getCommission(id:string){
     this.getCommissionEarned();
    for(let commission of this.commissions){
      if(id == commission.id){
        return commission;
      }
    }
    return null!;
   }

  getMaxId(): number {
    let maxId = 0;
    for(let commission of this.commissions){
        if(parseInt(commission.id, 10) > maxId){
          maxId = parseInt(commission.id, 10);
        }
    }
    return maxId;
  }

  addCommission(commission: CalculatedCommission) {
    if (!commission) {
      return;
    }
    console.log("Add another commission");

    // make sure id of the new Commission is empty
    commission.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, commission: CalculatedCommission }>('http://localhost:3000/commissions',
      commission,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new commission to commissions
          console.log('Push new data');
          this.commissions.push(responseData.commission);
          this.commissionListChangedEvent.next(this.commissions.slice());
          // this.sortAndSend();
        }
      );

  }

  updateCommission(originalCommission: CalculatedCommission, newCommission: CalculatedCommission) {
    if (!originalCommission || !newCommission) {
      return;
    }
    const pos = this.commissions.findIndex(d => d.id === originalCommission.id);
    if (pos < 0) {
      return;
    }
    // set the id of the new Commission to the id of the old Commission
    newCommission.id = originalCommission.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/commissions/' + originalCommission.id,
      newCommission, { headers: headers })
      .subscribe(
        () => {
          this.commissions[pos] = newCommission;
          this.commissionListChangedEvent.next(this.commissions.slice());
          // this.sortAndSend();
        }
      );

  }

  deleteCommission(commission: CalculatedCommission) {
    if (!commission) {
      return;
    }

    const pos = this.commissions.findIndex(d => d.id === commission.id);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/commissions/' + commission.id)
      .subscribe(
        () => {
          this.commissions.splice(pos, 1);
          this.commissionListChangedEvent.next(this.commissions.slice());
          // this.sortAndSend();
        }
      );
  }

  calculateCommissionEarned():number{
    this.commissionEarned = 0;
    for(let commission of this.commissions){
      let redline = commission?.systemSize * 3000;
      let dealerFee = (commission?.dealerFee / 100) * commission?.totalCustomerCost;
      commission.commissionEarned = ((commission?.totalCustomerCost - redline) - dealerFee) - commission?.adders;
      // console.log("are we getting  commission?");
      // console.log(this.commissionEarned);
    }
    return this.commissionEarned;
  }

  getCommissionEarned():number{
    this.commissionEarned = 0;
    for(let commission of this.commissions){
      if(commission.systemSize > 0){
      commission.commissionEarned = this.calculateCommissionEarned();
      }else {
        commission.commissionEarned = 0;
      }
    }
    return this.commissionEarned;
  }

}
