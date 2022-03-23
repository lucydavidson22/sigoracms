import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Commission } from '../commission.model';
import { CommissionService } from '../commission.service';

@Component({
  selector: 'app-commission-detail',
  templateUrl: './commission-detail.component.html',
  styleUrls: ['./commission-detail.component.css']
})
export class CommissionDetailComponent implements OnInit {
  commission!: Commission;
  id!:string

  constructor(private commissionService: CommissionService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

  }

}

