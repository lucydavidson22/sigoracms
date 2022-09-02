import { Component, Input, OnInit } from '@angular/core';
import { Goal } from '../goal.model';

@Component({
  selector: 'cms-goals-item',
  templateUrl: './goals-item.component.html',
  styleUrls: ['./goals-item.component.css']
})
export class GoalsItemComponent implements OnInit {
  @Input() goal!: Goal;

  constructor() { }

  ngOnInit(): void {
  }

}
