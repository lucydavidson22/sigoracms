import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Target } from '../target.model';
import { TargetService } from '../target.service';

@Component({
  selector: 'cms-target-edit',
  templateUrl: './target-edit.component.html',
  styleUrls: ['./target-edit.component.css']
})
export class TargetEditComponent implements OnInit {
  @ViewChild('f') docForm!: NgForm;
  subscription!: Subscription;
  originalTarget!: Target;
  target!: Target;
  editMode: boolean = false;
  id!: string;

  constructor(private targetService: TargetService,
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
        this.originalTarget = this.targetService.getTarget(this.id);
        if(!this.originalTarget){
          return;
        }
        this.editMode = true;
        this.target = JSON.parse(JSON.stringify(this.originalTarget));
      }
    )
  }

  onCancel(){}

  onSubmit(form: NgForm){
    const value = form.value;
    console.log(value.startDate, value.id);
    const newTarget = new Target(
      '0',
      value.startDate,
      value.endDate,
      value.commissGoal
    );
    if(this.editMode){
      this.targetService.updateTarget()
    }else {
      console.log("are we getting to here?")
      this.targetService.addTarget(newTarget)
    }
    this.router.navigate(['targets']);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
