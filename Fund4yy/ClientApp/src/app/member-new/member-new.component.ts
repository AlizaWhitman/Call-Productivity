import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Member } from '../models/member-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembersService } from '../members.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-new',
  templateUrl: './member-new.component.html',
  styleUrls: ['./member-new.component.css']
})
export class MemberNewComponent implements OnInit {
  private _newMember: Member;

  newMemberForm: FormGroup = new FormGroup({
    id: new FormControl(""),
    fullName: new FormControl(""),
    password: new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    confirmed: new FormControl(false),
    ageGroup: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.email]),
    phoneNumber: new FormControl("", [Validators.minLength(9)]),
    country: new FormControl(""),
    city: new FormControl(""),
    fluentHebrew: new FormControl(false),
    fluentRussian: new FormControl(false),
    fluentEnglish: new FormControl(false),
    anashIsrael: new FormControl(false),
    anashUSA: new FormControl(false),
    pinskSchoolGraduate: new FormControl(false),
    kievSchoolGraduate: new FormControl(false),
    yeshivaGraduate: new FormControl(false),
    inPinsk: new FormControl(false),
    businessAssociate: new FormControl(false),
    boysCounselor: new FormControl(false),
    girlsCounselor: new FormControl(false),
    helpedByPinsk: new FormControl(false),
    generalSupporter: new FormControl(false),
    mhsg: new FormControl(false),
    belarusAnsectors: new FormControl(false),
    belarusTourism: new FormControl(false),
    yyFundraiser: new FormControl(false),
    yyFamily: new FormControl(false),
    yyStaff: new FormControl(false),
    rShteiermanFamily: new FormControl(false),
    rFimaFamily: new FormControl(false),
    marriedAYYGraduate: new FormControl(false),
    yearsInYadYisroel: new FormControl(0),
    yearsIAsFundraiser: new FormControl(0),
    operationRoom: new FormControl(""),
    other: new FormControl(""),
  });

  saveNewMember() {
    this.newMemberForm.get('email').setValue(this._newMember.email);
    this._newMember = this.newMemberForm.value;
    this._newMember.fullName = this._newMember.firstName.concat(this._newMember.lastName);
    this._membersService.saveMember(this._newMember).subscribe(newMember => {
      if (newMember) {
        sessionStorage.setItem("currentMember", JSON.stringify(newMember));
        alert("Welcome " + this._newMember.firstName + "!!! 😄🤗😉 Thank you for joining Yad Yisroel Family ♥");
      }
      else
        alert("Unfortunately we had trouble saving your information. Please sign up later.");
    }, err => {
      alert("Unfortunately we had trouble saving your information. Please sign up later.");
    });
    this._router.navigate(["/HomePage", { name: this._newMember.firstName }])
  }

  constructor(private _membersService: MembersService,private _router: Router) { }

  ngOnInit() {
    this._newMember = JSON.parse(sessionStorage.getItem("currentMember"));
  }

}
