import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Target } from '../target.model';
import { TargetService } from '../target.service';

@Component({
  selector: 'cms-targets-list',
  templateUrl: './targets-list.component.html',
  styleUrls: ['./targets-list.component.css']
})
export class TargetsListComponent implements OnInit {
  targets: Target[] = [];
  private subscription!: Subscription;

  constructor(private targetService: TargetService) { }

  ngOnInit(): void {
    this.targetService.targetChangedEvent.subscribe(
      (target:Target[]) => {
        this.targets = target;
      }
    )
    this.targets = this.targetService.getTargets();
    this.subscription = this.targetService.targetListChangedEvent.subscribe(targetList => {
      this.targets = targetList;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
