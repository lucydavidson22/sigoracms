import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [ ];
  maxContactId!: number;

  constructor(private http: HttpClient) {
    this.getContactsHttp();
   }

   getContacts():Contact[]{
     return this.contacts.slice();
   }

   getContactsHttp(){
    return this.http
    // .get<Contact[]>('https://sigora-stats-default-rtdb.firebaseio.com/clientnames.json')
    .get<Contact[]>('http://localhost:3000/customers')
    .subscribe(
      //success method
      (contacts:Contact[] = []) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        contacts.sort((a, b) => {
          if(a.dateclosed > b.dateclosed){ return -1; }
          if(a.dateclosed < b.dateclosed){ return 1; }
          else { return 0; }
         });
         this.contactListChangedEvent.next(this.contacts.slice());
      }
      //error method
      ,(error: any)=> {
        console.log(error.message)
      }
    );
   }

   getContact(id:string){
    for(let contact of this.contacts){
      if(id == contact.id){
        return contact;
      }
    }
    return null!;
   }


   getMaxId(): number {
      let maxId = 0;
      for(let contact of this.contacts){
          if(parseInt(contact.id, 10) > maxId){
            maxId = parseInt(contact.id, 10);
          }
      }
      return maxId
    }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    console.log('try to create a customer');
    // make sure id of the new Contact is empty
    contact.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/customers/',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.contactListChangedEvent.next(this.contacts.slice());
          // this.sortAndSend();
        }
      );
      console.log('create customer try 2');
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/customers/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        () => {
          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
          // this.sortAndSend();
        }
      );
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/customers/' + contact.id)
      .subscribe(
        () => {
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
          // this.sortAndSend();
        }
      );
    }
  }
