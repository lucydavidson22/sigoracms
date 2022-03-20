import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commission } from '../commission.model';
import { CommissionService } from '../commission.service';

@Component({
  selector: 'app-commission-input',
  templateUrl: './commission-input.component.html',
  styleUrls: ['./commission-input.component.css']
})
export class CommissionInputComponent implements OnInit {

  constructor(private commissionService: CommissionService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
  const value = form.value;
    const commission = new Commission(
      value.systemSize,
      value.totalCustomerCost,
      value.dealerFee,
      value.adders,
      value.commissionEarned
      );
      this.commissionService.getCommission(commission);
      // this.router.navigate(['commission']);
  }

}
