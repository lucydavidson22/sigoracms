import { Component, Input, OnInit } from '@angular/core';
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
  // @Input() commissionCreated!: string;
  // id!:string

  constructor(private commissionService: CommissionService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = params['id'];
    //     this.commissionCreated = this.commissionService.getCommission(this.commission);
    //   }
    // )
  }

}
