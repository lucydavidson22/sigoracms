import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommissionCalculatorComponent } from "./commission-calculator/commission-calculator.component";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentsDetailComponent } from "./documents/documents-detail/documents-detail.component";
import { DocumentsComponent } from "./documents/documents.component";
// import { MessageListComponent } from "./messages/message-list/message-list.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/documents', pathMatch: 'full'},
  {path: 'documents', component: DocumentsComponent, children: [
    {path: 'new', component: DocumentEditComponent},
    {path: ':id', component: DocumentsDetailComponent},
    {path: ':id/edit', component: DocumentEditComponent}
  ]},
  {path: 'contacts', component: ContactsComponent, children: [
    {path: 'new', component: ContactEditComponent},
    {path: ':id', component: ContactDetailComponent},
    {path: ':id/edit', component: ContactEditComponent}
  ]},
  {path: 'commissionCalculator', component: CommissionCalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
