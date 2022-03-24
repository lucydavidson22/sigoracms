import { Component, OnInit } from '@angular/core';
import { CalculatedCommission } from './calc-commission.model';
// import { Commission } from './commission.model';
import { CommissionService } from './calc-commission.service';

@Component({
  selector: 'cms-calc-commmissions',
  templateUrl: './calc-commissions.component.html',
  styleUrls: ['./calc-commissions.component.css']
})
export class CalcCommissionComponent implements OnInit {
  selectedCommission!: CalculatedCommission;

  constructor(private commissionService:CommissionService) { }

  ngOnInit(): void {
    this.commissionService.commissionSelectedEvent.subscribe(
      (commission:CalculatedCommission) => {
        this.selectedCommission = commission;
      }
    )
  }

}
