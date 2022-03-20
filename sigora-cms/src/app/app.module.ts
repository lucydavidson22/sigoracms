import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list.component';
import { DocumentsItemComponent } from './documents/documents-item/documents-item.component';
import { DocumentsDetailComponent } from './documents/documents-detail/documents-detail.component';
import { DropdownDirective } from './dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DndModule } from 'ng2-dnd';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { CommissionCalculatorComponent } from './commission-calculator/commission-calculator.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommissionInputComponent } from './commission-calculator/commission-input/commission-input.component';
import { CommissionDetailComponent } from './commission-calculator/commission-detail/commission-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GoalsComponent } from './goals/goals.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentsListComponent,
    DocumentsItemComponent,
    DocumentsDetailComponent,
    DropdownDirective,
    DocumentEditComponent,
    ContactEditComponent,
    ContactsFilterPipe,
    CommissionCalculatorComponent,
    CommissionInputComponent,
    CommissionDetailComponent,
    LoginComponent,
    SignupComponent,
    GoalsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
