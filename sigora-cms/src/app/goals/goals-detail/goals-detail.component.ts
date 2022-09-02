import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Goal } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'cms-goals-detail',
  templateUrl: './goals-detail.component.html',
  styleUrls: ['./goals-detail.component.css']
})
export class GoalsDetailComponent implements OnInit {
  goal!: Goal;
  id!: string;

  constructor(private goalService: GoalService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.goal = this.goalService.getGoal(this.id);
      }
    )
  }

  onEditGoal(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.goalService.deleteGoal(this.goal);
    this.router.navigate(['goals']);
  }

}
