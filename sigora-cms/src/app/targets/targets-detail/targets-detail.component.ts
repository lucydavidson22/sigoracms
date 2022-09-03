import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Target } from '../target.model';
import { TargetService } from '../target.service';

@Component({
  selector: 'cms-targets-detail',
  templateUrl: './targets-detail.component.html',
  styleUrls: ['./targets-detail.component.css']
})
export class TargetsDetailComponent implements OnInit {
  target!: Target;
  id!:string;

  constructor(private targetService: TargetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.target = this.targetService.getTarget(this.id);
      }
    )
  }

  onEditTarget(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.targetService.deleteTarget(this.target);
    this.router.navigate(['targets']);
  }

}
