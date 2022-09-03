import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Target } from "./target.model";

@Injectable({
  providedIn: 'root'
})

export class TargetService {
  targetListChangedEvent = new Subject<Target[]>();
  targetSelectedEvent = new EventEmitter<Target>();
  targetChangedEvent = new EventEmitter<Target[]>();
  private targets: Target[] = [];
  maxTargetId!: number;

  constructor(private http: HttpClient){
    this.getTargetsHttp();
  }

  getTargets(){
    return this.targets.slice();
   }

  getTargetsHttp(){
    console.log('targets http entered');
    return this.http
     .get<Target[]>('http://localhost:3000/targets')
     .subscribe(
       //success method
       (targets:Target[] = []) => {
         this.targets = targets;
         this.maxTargetId = this.getMaxId();
         targets.sort((a, b) => {
           if(a.startDate < b.startDate){ return 1; }
           if(a.startDate > b.startDate){ return -1; }
           else { return 0; }
          });
        let targetsListClone = this.targets.slice();
        this.targetListChangedEvent.next(targetsListClone);
       }
       //error method
       ,(error: any)=> {
         console.log(error.message)
       }
     );
   }

  getTarget(id:string){
    for(let target of this.targets){
      if(id == target.id){
        return target;
      }
    }
    return null!;
   }

  getMaxId(): number{
    let maxId = 0;
    for(let target of this.targets){
      if(parseInt(target.id, 10) > maxId){
        maxId = parseInt(target.id, 10);
      }
    }
    console.log("Max target Id", maxId);
    return maxId;
  }

  addTarget(target:Target){
    if(!target){
      return;
    }
    console.log("add a new target goal");
    //ensure the id of the target is empty
    target.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //add data to the database
    this.http.post<{message: string, target: Target}>('http://localhost:3000/targets',
    target,
    { headers: headers }).subscribe(
      (responseData) => {
        //adding a new goal to the goal list
        console.log('Push new target');
        this.targets.push(responseData.target);
        this.targetListChangedEvent.next(this.targets.slice());
      }
    );
  }

  updateTarget(){  }

  deleteTarget(target: Target){
    if(!target){
      return;
    }
    const pos = this.targets.findIndex(d => d.id === target.id);
    if(pos < 0){ return; }

    this.http.delete('http://localhost:3000/targets/' + target.id)
    .subscribe(
      () => {
        this.targets.splice(pos, 1);
        this.targetListChangedEvent.next(this.targets.slice());
      }
    );
  }


}
