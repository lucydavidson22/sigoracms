import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CalculatedCommission } from '../calc-commission.model';
import { CommissionService } from '../calc-commission.service';

@Component({
  selector: 'commission-detail',
  templateUrl: './commission-detail.component.html',
  styleUrls: ['./commission-detail.component.css']
})
export class CommissionsDetailComponent implements OnInit {
  commission!: CalculatedCommission;
  id!: string;
  nativeWindow: any;

  constructor(private commissionService: CommissionService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        // let parseId = parseInt(this.id);
        this.commission = this.commissionService.getCommission(this.id);
      }
    );
  }

  onEditCommission(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.commissionService.deleteCommission(this.commission);
    this.router.navigate(['calcCommission']);
  }

}
