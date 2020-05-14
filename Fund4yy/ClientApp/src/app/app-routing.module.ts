import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberNewComponent } from './member-new/member-new.component';
import { MemberLoginComponent } from './member-login/member-login.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { CallSummaryComponent } from './call-summary/call-summary.component';
import { DonorNewComponent } from './donor-new/donor-new.component';
import { CallSessionComponent } from './call-session/call-session.component';
import { AppPage } from 'e2e/src/app.po';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'MemberLoginComponent', pathMatch: 'full' }, 
  { path: 'MemberNewComponent', component: MemberNewComponent },
  { path: 'MemberLoginComponent', component: MemberLoginComponent },
  { path: 'MemberDetailsComponent', component: MemberDetailsComponent },
  { path: 'CallSummaryComponent', component: CallSummaryComponent },
  { path: 'DonorNewComponent', component: DonorNewComponent },
  { path:'CallSessionComponent', component: CallSessionComponent},
  {path: 'HomePage', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
