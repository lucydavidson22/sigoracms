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
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GoalsComponent } from './goals/goals.component';
import { MatInputModule } from "@angular/material/input";
import { CalcCommissionComponent } from './calculate-commission/calc-commissions.component';
import { CommissionsListComponent } from './calculate-commission/commission-list/commission-list.component';
import { CommissionEditComponent } from './calculate-commission/commission-edit/commission-edit.component';
import { CommissionsItemComponent } from './calculate-commission/commission-item/commission-item.component';
import { CommissionsDetailComponent } from './calculate-commission/commission-detail/commission-detail.component';
import { RouterModule } from '@angular/router';
import { GoalsListComponent } from './goals/goals-list/goals-list.component';
import { GoalsItemComponent } from './goals/goals-item/goals-item.component';
import { GoalsDetailComponent } from './goals/goals-detail/goals-detail.component';
import { GoalsEditComponent } from './goals/goals-edit/goals-edit.component';
import { TargetsComponent } from './targets/targets.component';
import { TargetEditComponent } from './targets/target-edit/target-edit.component';
import { TargetsDetailComponent } from './targets/targets-detail/targets-detail.component';
import { TargetsItemComponent } from './targets/targets-item/targets-item.component';
import { TargetsListComponent } from './targets/targets-list/targets-list.component';


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
    LoginComponent,
    SignupComponent,
    GoalsComponent,
    CalcCommissionComponent,
    CommissionsListComponent,
    CommissionEditComponent,
    CommissionsItemComponent,
    CommissionsDetailComponent,
    GoalsListComponent,
    GoalsItemComponent,
    GoalsDetailComponent,
    GoalsEditComponent,
    TargetsComponent,
    TargetEditComponent,
    TargetsDetailComponent,
    TargetsItemComponent,
    TargetsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    FlexLayoutModule,
    MatInputModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
