import { Component, Input, OnInit } from '@angular/core';
import { Target } from '../target.model';

@Component({
  selector: 'cms-targets-item',
  templateUrl: './targets-item.component.html',
  styleUrls: ['./targets-item.component.css']
})
export class TargetsItemComponent implements OnInit {
  @Input() target!: Target;

  constructor() { }

  ngOnInit(): void {
  }

}
