import { Component, OnInit } from '@angular/core';
import { Target } from './target.model';
import { TargetService } from './target.service';

@Component({
  selector: 'cms-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css']
})
export class TargetsComponent implements OnInit {
  selectedTarget!: Target;

  constructor(private targetService: TargetService) { }

  ngOnInit(): void {
    this.targetService.targetSelectedEvent.subscribe(
      (target:Target) => {
        this.selectedTarget = target;
      }
    )
  }

}
