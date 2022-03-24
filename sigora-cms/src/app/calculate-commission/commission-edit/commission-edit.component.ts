import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommissionService } from '../calc-commission.service';
import { CalculatedCommission } from '../calc-commission.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commission-edit',
  templateUrl: './commission-edit.component.html',
  styleUrls: ['./commission-edit.component.css']
})
export class CommissionEditComponent implements OnInit, OnDestroy {
  // @ViewChild('f') docForm: NgForm;
  subscription!: Subscription;
  originalCommission!: CalculatedCommission;
  commission!: CalculatedCommission;
  editMode: boolean = false;
  id!: string;

  constructor(private commissionService: CommissionService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(!this.id){
          this.editMode = false;
          return;
        }
        this.originalCommission = this.commissionService.getCommission(this.id);
        if(!this.originalCommission){
          return;
        }
        this.editMode = true;
        this.commission = JSON.parse(JSON.stringify(this.originalCommission));
      })
  }

  onCancel(){
    this.router.navigate(['/calcCommission']);
  }

  onSubmit(form: NgForm){
    const value = form.value;
    // console.log(value.name, value.id);
    const newCommission = new CalculatedCommission(
      '0',
      value.systemSize,
      value.totalCustomerCost,
      value.dealerFee,
      value.adders,
      value.commissionEarned);
    if(this.editMode){
      this.commissionService.updateCommission(this.originalCommission, newCommission)
    } else{
      this.commissionService.addCommission(newCommission)
    }
    this.router.navigate(['calcCommission']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
