import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Commission } from './commission.model';
import { CommissionService } from './commission.service';

@Component({
  selector: 'app-commission-calculator',
  templateUrl: './commission-calculator.component.html',
  styleUrls: ['./commission-calculator.component.css']
})
export class CommissionCalculatorComponent implements OnInit {
  commissionCalced!: Commission;

  constructor(private commissionService: CommissionService) { }

  ngOnInit(): void {
    this.commissionService.commissionCalculated.subscribe(
      (commission:Commission) => {
        this.commissionCalced = commission;
      }
    )
  }
}
