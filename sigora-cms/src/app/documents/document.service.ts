import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
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
  totalKnocks!: number;

  constructor(private http: HttpClient) {
    this.getDocumentsHttp();
   }

   getDocuments(){
     return this.documents.slice();
   }

   getDocumentsHttp(){
     console.log('documents http entered');
    return this.http
    //  .get<Document[]>('https://sigora-stats-default-rtdb.firebaseio.com/knocking.json')
     .get<Document[]>('http://localhost:3000/dailydata')
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
    console.log("Max document Id",maxId);
    return maxId;
  }

addDocument(document: Document) {
  if (!document) {
    return;
  }
  console.log("Add another document");

  // make sure id of the new Document is empty
  document.id = '';
  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Document }>('http://localhost:3000/dailydata',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        console.log('Push new data');
        this.documents.push(responseData.document);
        this.documentListChangedEvent.next(this.documents.slice());
        // this.sortAndSend();
      }
    );

}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }
  const pos = this.documents.findIndex(d => d.id === originalDocument.id);
  if (pos < 0) {
    return;
  }
  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/dailydata/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      () => {
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
        // this.sortAndSend();
      }
    );

}

deleteDocument(document: Document) {
  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);
  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/dailydata/' + document.id)
    .subscribe(
      () => {
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents.slice());
        // this.sortAndSend();
      }
    );
}

  // This is the math being calculated for daily data.
  getKnocksPerAnswer():number{
    this.knocksperanswer = 0;
    for(let document of this.documents){
      if(document.answers > 0){
        document.knocksperanswer = document.knocks / document.answers;
        }else{
          document.knocksperanswer = 0;
        }
    }
    return this.knocksperanswer;
  }

  getKnocksPerHour():number{
    this.knocksperhour = 0;
    for(let document of this.documents){
      if(document.totalTime > 0){
      document.knocksperhour = document.knocks / document.totalTime;
      }else{
        document.knocksperhour = 0;
      }
    }
    return this.knocksperhour;
  }

  getAnswersPerSet():number{
    this.answersperset = 0;
    for(let document of this.documents){
      if(document.sets > 0){
        document.answersperset = document.answers / document.sets;
      }else {
        document.answersperset = 0;
      }
    }
    return this.answersperset;
  }

  getSetsPerHour():number{
    this.setsperhour = 0;
    for(let document of this.documents){
      if(document.totalTime > 0){
      document.setsperhour = document.sets / document.totalTime;
      }else {
        document.setsperhour = 0;
      }
    }
    return this.setsperhour;
  }


}
