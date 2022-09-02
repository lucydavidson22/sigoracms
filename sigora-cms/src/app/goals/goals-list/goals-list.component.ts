import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Goal } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'cms-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css']
})
export class GoalsListComponent implements OnInit, OnDestroy {
  goals: Goal[] = [];
  private subscription!: Subscription;

  constructor(private goalService: GoalService) { }

  ngOnInit(): void {
    this.goalService.goalChangedEvent.subscribe(
      (goal:Goal[]) => {
        this.goals = goal;
      }
    )
    this.goals = this.goalService.getGoals();
    this.subscription = this.goalService.goalListChangedEvent.subscribe(goalList => {
      this.goals = goalList;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
