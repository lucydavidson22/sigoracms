import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalculatedCommission } from '../calc-commission.model';
import { CommissionService } from '../calc-commission.service';

@Component({
  selector: 'cms-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.css']
})
export class CommissionsListComponent implements OnInit, OnDestroy {
  commissions: CalculatedCommission[] = [];
  private subscription!: Subscription;

  constructor(private commissionService: CommissionService,
              ) { }

  ngOnInit(): void {
    this.commissionService.commissionChangedEvent.subscribe(
      (commission:CalculatedCommission[]) => {
        this.commissions = commission;
      }
    )
    this.commissions = this.commissionService.getCommissions();
    this.subscription = this.commissionService.commissionListChangedEvent.subscribe(commissionList => {
      this.commissions = commissionList;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
