import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../models/member-model';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {


  private _memberForForm: Member;


  updateMember() {
    this._memberForForm = this.memberDetailsForm.value;
    this._membersService.updateMember(this._memberForForm).subscribe(success => {
      if (success) {
        sessionStorage.setItem("currentMember", JSON.stringify(this._memberForForm));
        alert("Your changes were saved. Thank you! 😊");

      }
      else
        alert("Sorry, but we had trouble saving your details. Please try again later.");
    }, err => {
      alert("Sorry, but we had trouble saving your details. Please try again later.");
    });
  }

  constructor(private _membersService: MembersService) {
    this._memberForForm = JSON.parse(sessionStorage.getItem("currentMember"));
    this.InitializeForm();
  }

  memberDetailsForm: FormGroup = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    confirmed: new FormControl(),
    ageGroup: new FormControl(),
    email: new FormControl("",[Validators.required,Validators.email]),
    phoneNumber: new FormControl("",[Validators.minLength(9)]),
    country: new FormControl(""),
    city: new FormControl(""),
    fluentHebrew: new FormControl(""),
    fluentRussian: new FormControl(""),
    fluentEnglish: new FormControl(""),
    anashIsrael: new FormControl(""),
    anashUSA: new FormControl(""),
    pinskSchoolGraduate: new FormControl(""),
    kievSchoolGraduate: new FormControl(""),
    yeshivaGraduate: new FormControl(""),
    inPinsk: new FormControl(""),
    businessAssociate: new FormControl(""),
    boysCounselor: new FormControl(""),
    girlsCounselor: new FormControl(""),
    helpedByPinsk: new FormControl(""),
    generalSupporter: new FormControl(""),
    mhsg: new FormControl(""),
    belarusAnsectors: new FormControl(""),
    belarusTourism: new FormControl(""),
    yyFundraiser: new FormControl(""),
    yyFamily: new FormControl(""),
    yyStaff: new FormControl(""),
    rShteiermanFamily: new FormControl(""),
    rFimaFamily: new FormControl(""),
    marriedAYYGraduate: new FormControl(""),
    yearsInYadYisroel: new FormControl(""),
    yearsIAsFundraiser: new FormControl(""),
    operationRoom: new FormControl(""),
    other: new FormControl(""),
  });

  InitializeForm() {
    this.memberDetailsForm.get('id').setValue(this._memberForForm.id),
      this.memberDetailsForm.get('fullName').setValue(this._memberForForm.fullName),
      this.memberDetailsForm.get('password').setValue(this._memberForForm.password),
      this.memberDetailsForm.get('firstName').setValue(this._memberForForm.firstName),
      this.memberDetailsForm.get('lastName').setValue(this._memberForForm.lastName),
      this.memberDetailsForm.get('confirmed').setValue(this._memberForForm.confirmed),
      this.memberDetailsForm.get('ageGroup').setValue(this._memberForForm.ageGroup),
      this.memberDetailsForm.get('email').setValue(this._memberForForm.email);
    this.memberDetailsForm.get('phoneNumber').setValue(this._memberForForm.phoneNumber),
      this.memberDetailsForm.get('country').setValue(this._memberForForm.country),
      this.memberDetailsForm.get('city').setValue(this._memberForForm.city),
      this.memberDetailsForm.get('fluentHebrew').setValue(this._memberForForm.fluentHebrew),
      this.memberDetailsForm.get('fluentRussian').setValue(this._memberForForm.fluentRussian),
      this.memberDetailsForm.get('fluentEnglish').setValue(this._memberForForm.fluentEnglish),
      this.memberDetailsForm.get('anashIsrael').setValue(this._memberForForm.anashIsrael),
      this.memberDetailsForm.get('anashUSA').setValue(this._memberForForm.anashUSA),
      this.memberDetailsForm.get('pinskSchoolGraduate').setValue(this._memberForForm.pinskSchoolGraduate),
      this.memberDetailsForm.get('kievSchoolGraduate').setValue(this._memberForForm.kievSchoolGraduate),
      this.memberDetailsForm.get('yeshivaGraduate').setValue(this._memberForForm.yeshivaGraduate),
      this.memberDetailsForm.get('inPinsk').setValue(this._memberForForm.inPinsk),
      this.memberDetailsForm.get('businessAssociate').setValue(this._memberForForm.businessAssociate),
      this.memberDetailsForm.get('boysCounselor').setValue(this._memberForForm.boysCounselor),
      this.memberDetailsForm.get('girlsCounselor').setValue(this._memberForForm.girlsCounselor),
      this.memberDetailsForm.get('helpedByPinsk').setValue(this._memberForForm.helpedByPinsk),
      this.memberDetailsForm.get('generalSupporter').setValue(this._memberForForm.generalSupporter),
      this.memberDetailsForm.get('mhsg').setValue(this._memberForForm.mhsg),
      this.memberDetailsForm.get('belarusAnsectors').setValue(this._memberForForm.belarusAnsectors),
      this.memberDetailsForm.get('belarusTourism').setValue(this._memberForForm.belarusTourism),
      this.memberDetailsForm.get('yyFundraiser').setValue(this._memberForForm.yyFundraiser),
      this.memberDetailsForm.get('yyFamily').setValue(this._memberForForm.yyFamily),
      this.memberDetailsForm.get('yyStaff').setValue(this._memberForForm.yyStaff),
      this.memberDetailsForm.get('rShteiermanFamily').setValue(this._memberForForm.rShteiermanFamily),
      this.memberDetailsForm.get('rFimaFamily').setValue(this._memberForForm.rFimaFamily),
      this.memberDetailsForm.get('marriedAYYGraduate').setValue(this._memberForForm.marriedAYYGraduate),
      this.memberDetailsForm.get('yearsInYadYisroel').setValue(this._memberForForm.yearsInYadYisroel),
      this.memberDetailsForm.get('yearsIAsFundraiser').setValue(this._memberForForm.yearsIAsFundraiser),
      this.memberDetailsForm.get('operationRoom').setValue(this._memberForForm.operationRoom),
      this.memberDetailsForm.get('other').setValue(this._memberForForm.other);
  };


  ngOnInit() {

  }

}
