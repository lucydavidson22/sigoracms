import { Component, OnInit } from '@angular/core';
import { Goal } from './goal.model';
import { GoalService } from './goal.service';

@Component({
  selector: 'cms-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  selectedGoal!: Goal;

  constructor(private goalService: GoalService) { }

  ngOnInit(): void {
    this.goalService.goalSelectedEvent.subscribe(
      (goal:Goal) => {
        this.selectedGoal = goal;
      }
    )
  }

}
