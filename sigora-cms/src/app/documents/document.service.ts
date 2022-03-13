import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  private documents: Document[] = [];
  maxDocumentId!: number;
  knocksperanswer!: number;
  knocksperhour!:number;
  answersperset!: number;
  setsperhour!: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
    this.getDocumentsHttp();
   }

   getDocuments(){
    // this.documents = MOCKDOCUMENTS;
     return this.documents.slice();
   }

   getDocumentsHttp(){
     console.log('documents http entered');
    return this.http
     .get<Document[]>('https://sigora-stats-default-rtdb.firebaseio.com/knocking.json')
     .subscribe(
       //success method
       (documents:Document[] = []) => {
         this.documents = documents;
         this.maxDocumentId = this.getMaxId();
         documents.sort((a, b) => {
           if(a.name > b.name){ return 1; }
           if(a.name < b.name){ return -1; }
           else { return 0; }
          });
            let documentsListClone = this.documents.slice();
            this.documentListChangedEvent.next(documentsListClone);
       }
       //error method
       ,(error: any)=> {
         console.log(error.message)
       }
     );
   }

   getDocument(id:string){
    this.getKnocksPerAnswer();
    this.getKnocksPerHour();
    this.getAnswersPerSet();
    this.getSetsPerHour();
    for(let document of this.documents){
      if(id == document.id){
        return document;
      }
    }
    return null!;
   }


  getMaxId(): number {
    let maxId = 0;
    for(let document of this.documents){
        if(parseInt(document.id, 10) > maxId){
          maxId = parseInt(document.id, 10);
        }
    }
    return maxId;
  }

   storeDocuments(){
    const documents = JSON.stringify(this.getDocuments())
     this.http
     .put(
       'https://sigora-stats-default-rtdb.firebaseio.com/knocking.json',
     documents,
     {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }
     )
     .subscribe(()=>{
        // this.documentChangedEvent.emit(this.documents.slice()); //if something is wrong, try removing this line
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
     })
   }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    // this.documentChangedEvent.emit(this.documents.slice());
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
 }

  addDocument(newDocument: Document){
    if(!newDocument){
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId + "";
    this.documents.push(newDocument);
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(!(originalDocument || newDocument)){
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if(pos < 0){
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  getKnocksPerAnswer():number{
    this.knocksperanswer = 0;
    for(let document of this.documents){
      document.knocksperanswer = document.knocks / document.answers;
    }
    return this.knocksperanswer;
  }

  getKnocksPerHour():number{
    this.knocksperhour = 0;
    for(let document of this.documents){
      document.knocksperhour = document.knocks / document.totalTime;
    }
    return this.knocksperhour;
  }

  getAnswersPerSet():number{
    this.answersperset = 0;
    for(let document of this.documents){
      document.answersperset = document.answers / document.sets;
    }
    return this.answersperset;
  }

  getSetsPerHour():number{
    this.setsperhour = 0;
    for(let document of this.documents){
      document.setsperhour = document.sets / document.totalTime;
    }
    return this.setsperhour;
  }


}
