import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommissionCalculatorComponent } from "./commission-calculator/commission-calculator.component";
import { CommissionDetailComponent } from "./commission-calculator/commission-detail/commission-detail.component";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentsDetailComponent } from "./documents/documents-detail/documents-detail.component";
import { DocumentsComponent } from "./documents/documents.component";
import { GoalsComponent } from "./goals/goals.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/dailydata', pathMatch: 'full'},
  {path: 'dailydata', component: DocumentsComponent, children: [
    {path: 'new', component: DocumentEditComponent},
    {path: ':id', component: DocumentsDetailComponent},
    {path: ':id/edit', component: DocumentEditComponent}
  ]},
  {path: 'customers', component: ContactsComponent, children: [
    {path: 'new', component: ContactEditComponent},
    {path: ':id', component: ContactDetailComponent},
    {path: ':id/edit', component: ContactEditComponent}
  ]},
  {path: 'commissionCalculator', component: CommissionCalculatorComponent, children:[
    {path: 'commission', component: CommissionDetailComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'goals', component: GoalsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
