import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') docForm!: NgForm;
  subscription!: Subscription;
  originalDocument!: Document;
  document!: Document;
  editMode: boolean = false;
  id!: string;
  knocksAnswer!: number;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(!this.id){
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);
        if(!this.originalDocument){
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      })
  }

  onCancel(){
    this.router.navigate(['/dailydata']);
  }

  onSubmit(form: NgForm){
    const value = form.value;
    console.log(value.name, value.id);
    const newDocument = new Document(
      '0',
      value.name,
      value.knocks,
      value.answers,
      value.sets,
      value.totalTime,
      value.propsRun,
      value.knocksperanswer,
      value.knocksperhour,
      value.answersperset,
      value.setsperhour
      );
    if(this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else{
      this.documentService.addDocument(newDocument)
    }
    this.router.navigate(['dailydata']);
    // this.documentService.getKnocksPerAnswer();
    // this.documentService.getKnocksPerHour();
    // this.documentService.getAnswersPerSet();
    // this.documentService.getSetsPerHour();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
