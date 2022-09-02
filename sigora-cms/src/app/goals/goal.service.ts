import { Injectable, EventEmitter } from '@angular/core';
import { Goal } from './goal.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  goalListChangedEvent = new Subject<Goal[]>();
  goalSelectedEvent = new EventEmitter<Goal>();
  goalChangedEvent = new EventEmitter<Goal[]>();
  private goals: Goal[] = [];
  maxGoalId!: number;

  constructor(private http: HttpClient) {
    this.getGoalsHttp();
   }

   getGoals(){
     return this.goals.slice();
   }

   getGoalsHttp(){
     console.log('goals http entered');
    return this.http
     .get<Goal[]>('http://localhost:3000/goals')
     .subscribe(
       //success method
       (goals:Goal[] = []) => {
         this.goals = goals;
         this.maxGoalId = this.getMaxId();
         goals.sort((a, b) => {
          if(a.startDate > b.startDate){ return 1; }
          if(a.startDate < b.startDate){ return -1; }
          else { return 0; }
         });
         let goalsListClone = this.goals.slice();
         this.goalListChangedEvent.next(goalsListClone);
       },
       //error method
       (error: any)=> {
         console.log(error.message)
       }
     );
   }

   getGoal(id:string){
    for(let goal of this.goals){
      if(id == goal.id){
        return goal;
      }
    }
    return null!;
   }


  getMaxId(): number {
    let maxId = 0;
    for(let goal of this.goals){
        if(parseInt(goal.id, 10) > maxId){
          maxId = parseInt(goal.id, 10);
        }
    }
    console.log("Max goal Id",maxId);
    return maxId;
  }

addGoal(goal: Goal) {
  if (!goal) {
    return;
  }
  console.log("Add another goal");

  // make sure id of the new Goal is empty
  goal.id = '';
  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, goal: Goal }>('http://localhost:3000/goals',
    goal,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new goal to goals
        console.log('Push new data');
        this.goals.push(responseData.goal);
        this.goalListChangedEvent.next(this.goals.slice());
        // this.sortAndSend();
      }
    );

}

updateGoal(originalGoal: Goal, newGoal: Goal) {
  if (!originalGoal || !newGoal) {
    return;
  }
  const pos = this.goals.findIndex(d => d.id === originalGoal.id);
  if (pos < 0) {
    return;
  }
  // set the id of the new Goal to the id of the old Goal
  newGoal.id = originalGoal.id;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/goals/' + originalGoal.id,
    newGoal, { headers: headers })
    .subscribe(
      () => {
        this.goals[pos] = newGoal;
        this.goalListChangedEvent.next(this.goals.slice());
        // this.sortAndSend();
      }
    );

}

deleteGoal(goal: Goal) {
  if (!goal) {
    return;
  }

  const pos = this.goals.findIndex(d => d.id === goal.id);
  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/goals/' + goal.id)
    .subscribe(
      () => {
        this.goals.splice(pos, 1);
        this.goalListChangedEvent.next(this.goals.slice());
        // this.sortAndSend();
      }
    );
}

}
