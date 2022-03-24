import { Component, Input, OnInit, Output } from '@angular/core';
import { CalculatedCommission } from '../calc-commission.model';

@Component({
  selector: 'commission-item',
  templateUrl: './commission-item.component.html',
  styleUrls: ['./commission-item.component.css']
})
export class CommissionsItemComponent implements OnInit {
  @Input() commission!: CalculatedCommission;

  constructor() { }

  ngOnInit(): void {
  }

}
