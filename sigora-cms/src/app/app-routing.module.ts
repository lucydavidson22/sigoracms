import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";
import { DocumentsDetailComponent } from "./documents/documents-detail/documents-detail.component";
import { DocumentsComponent } from "./documents/documents.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { CalcCommissionComponent } from "./calculate-commission/calc-commissions.component";
import { CommissionEditComponent } from "./calculate-commission/commission-edit/commission-edit.component";
import { CommissionsDetailComponent } from "./calculate-commission/commission-detail/commission-detail.component";
import { GoalsComponent } from "./goals/goals.component";
import { GoalsEditComponent } from "./goals/goals-edit/goals-edit.component";
import { GoalsDetailComponent } from "./goals/goals-detail/goals-detail.component";
import { TargetsComponent } from "./targets/targets.component";
import { TargetsDetailComponent } from "./targets/targets-detail/targets-detail.component";
import { TargetEditComponent } from "./targets/target-edit/target-edit.component";

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
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'targets', component: TargetsComponent, children: [
    {path: 'new', component: TargetEditComponent},
    {path: ':id', component: TargetsDetailComponent},
    {path: ':id/edit', component: TargetEditComponent}
  ]},
  // {path: 'goals', component: GoalsComponent, children: [
  //   {path: 'new', component: GoalsEditComponent},
  //   {path: ':id', component: GoalsDetailComponent},
  //   {path: ':id/edit', component: GoalsEditComponent}
  // ]},
  {path: 'calcCommission', component: CalcCommissionComponent, children: [
    {path: 'new', component: CommissionEditComponent},
    {path: ':id', component: CommissionsDetailComponent},
    {path: ':id/edit', component: CommissionEditComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
