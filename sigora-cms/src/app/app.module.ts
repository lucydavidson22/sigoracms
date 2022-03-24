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
// import { CommissionCalculatorComponent } from './commission-calculator/commission-calculator.component';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { CommissionInputComponent } from './commission-calculator/commission-input/commission-input.component';
// import { CommissionDetailComponent } from './commission-calculator/commission-detail/commission-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GoalsComponent } from './goals/goals.component';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'
import { CalcCommissionComponent } from './calculate-commission/calc-commissions.component';
import { CommissionsListComponent } from './calculate-commission/commission-list/commission-list.component';
import { CommissionEditComponent } from './calculate-commission/commission-edit/commission-edit.component';
import { CommissionsItemComponent } from './calculate-commission/commission-item/commission-item.component';
import { CommissionsDetailComponent } from './calculate-commission/commission-detail/commission-detail.component';
import { RouterModule } from '@angular/router';


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
    // CommissionCalculatorComponent,
    // CommissionInputComponent,
    // CommissionDetailComponent,
    LoginComponent,
    SignupComponent,
    GoalsComponent,
    CalcCommissionComponent,
    CommissionsListComponent,
    CommissionEditComponent,
    CommissionsItemComponent,
    CommissionsDetailComponent
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
    // MatCardModule,
    // MatButtonModule,
    // MatToolbarModule,
    // MatExpansionModule,
    // MatProgressSpinnerModule,
    // MatPaginatorModule,
    // MatSelectModule,
    // MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
