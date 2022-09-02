import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Goal } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'cms-goals-edit',
  templateUrl: './goals-edit.component.html',
  styleUrls: ['./goals-edit.component.css']
})
export class GoalsEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') docForm!: NgForm;
  subscription!: Subscription;
  originalGoal!: Goal;
  goal!: Goal;
  editMode: boolean = false;
  id!: string;

  constructor(private goalService: GoalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        if(!this.id){
          this.editMode = false;
          return;
        }
        this.originalGoal = this.goalService.getGoal(this.id);
        if(!this.originalGoal){
          return;
        }
        this.editMode = true;
        this.goal = JSON.parse(JSON.stringify(this.originalGoal));
      })
  }

  onCancel(){
    this.router.navigate(['/goals']);
  }

  onSubmit(form: NgForm){
    console.log("submitting form");
    const value = form.value;
    const newGoal = new Goal(
      '0',
      value.startDate,
      value.endDate,
      value.comGoal
    );
    if(this.editMode){
      this.goalService.updateGoal(this.originalGoal, newGoal)
    } else {
      this.goalService.addGoal(newGoal)
    }
    this.router.navigate(['goals']);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
