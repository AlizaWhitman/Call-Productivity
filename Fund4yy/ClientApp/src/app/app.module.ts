import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CallSummaryComponent } from './call-summary/call-summary.component';
import { DonorNewComponent } from './donor-new/donor-new.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberNewComponent } from './member-new/member-new.component';
import { MemberLoginComponent } from './member-login/member-login.component';
import { AppRoutingModule } from './app-routing.module';
import { DonorsService } from './donors.service';
import { CallsService } from './calls-service';
import { MembersService } from './members.service';
import { CallSessionComponent } from './call-session/call-session.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CallSessionService } from './call-session.service';

@NgModule({
  declarations: [
    AppComponent,
    CallSummaryComponent,
    DonorNewComponent,
    MemberDetailsComponent,
    MemberNewComponent,
    MemberLoginComponent,
    CallSessionComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [MembersService, DonorsService, CallsService, CallSessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
