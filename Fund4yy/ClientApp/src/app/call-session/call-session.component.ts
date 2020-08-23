import { Component, OnInit } from '@angular/core';
import { CallSessionService } from '../call-session.service';
import { Session } from 'protractor';
import { Donor } from '../models/donor-model';
import { FormGroup, FormControl } from '@angular/forms';
import { Member } from '../models/member-model';
import { Router, RouterLink } from '@angular/router';
import { INT_TYPE } from '@angular/compiler/src/output/output_ast';
import { interval } from 'rxjs';

@Component({
  selector: 'app-call-session',
  templateUrl: './call-session.component.html',
  styleUrls: ['./call-session.component.css']
})
export class CallSessionComponent implements OnInit {
 
 private listOfDonor: Donor[];
 private _currentMenber : Member;
 private _saveDonor: Donor;
 private _lenList: number;
  
 donerDetailsForm: FormGroup = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl(),
    password: new FormControl(),//
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    connectionID: new FormControl(""),//
    ageGroup: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(""),
    country: new FormControl(""),
    city: new FormControl(""),
    nativeLanguage: new FormControl(""),
    totalDonation:new FormControl(""),
    lastDonation: new FormControl(""),
    vip: new FormControl(""),
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
    other: new FormControl(""),
  });
  

  constructor(private _callSessionService: CallSessionService,private _router: Router) { 

  }

  ngOnInit() {
    if(sessionStorage.getItem("listOfDonors")){
    this.listOfDonor=JSON.parse(sessionStorage.getItem("listOfDonors"));
    this.InitializeForm();
  }
    else{
    this._currentMenber = JSON.parse(sessionStorage.getItem("currentMember"));
    this._callSessionService.getDonorsById(this._currentMenber.fullName).subscribe((data) => {
      this.listOfDonor = data;
      sessionStorage.setItem("listOfDonors", JSON.stringify(this.listOfDonor));
      this.InitializeForm();
    }, err => {
      alert("We are having difficulties reveiving the list of donors. Please try again later.");
    })}
    
  
  }

  // GetDonorToCall(){
  //   this.listOfDonor[0] = JSON.parse(sessionStorage.getItem("listOfDonors"));
  //   return this.listOfDonor[0][0];
  // }

  ReseivedDonation(){
    this._router.navigate(["/CallSummaryComponent",{name : this.listOfDonor[0].fullName ,dID : this.listOfDonor[0].id}])
    //need to reset the page and to initialize with the next call
  }

  NobodyAnswered(){
      this._currentMenber = JSON.parse(sessionStorage.getItem("currentMember"));
      this.listOfDonor.reverse();
      debugger
      this._saveDonor=this.listOfDonor.pop();
      this.listOfDonor.reverse();
      this._callSessionService.postDonor(parseInt(this._saveDonor.id) ,this._currentMenber.fullName).subscribe((save)=>
      {

        debugger
          if(save) {
            sessionStorage.setItem("listOfDonors",JSON.stringify(this.listOfDonor))
            this.donerDetailsForm.reset();
            this.InitializeForm();
            alert("The donor remove to the end of the list.");
          }
          else
          alert("Unfortunately we had trouble.");
        }, err => {
          alert("Unfortunately we had trouble.");
        });
     
    }

  WrongNumber(){
    this._callSessionService.deletePhoneNumber(this.listOfDonor[0].id).subscribe((save)=>
    {
      debugger
      if(save) {
        alert("The donor nuber phone was deleted succesfully!😊");
        sessionStorage.setItem("listOfDonors",JSON.stringify(this.listOfDonor)) 
        if( this.listOfDonor.length==0)
        {
          debugger
          this._currentMenber = JSON.parse(sessionStorage.getItem("currentMember"));
          this._callSessionService.getDonorsById(this._currentMenber.fullName).subscribe((data) => {
            this.listOfDonor = data;
            sessionStorage.setItem("listOfDonors", JSON.stringify(this.listOfDonor));
            this.InitializeForm();
          }, err => {
            alert("We are having difficulties reveiving the list of donors. Please try again later.");
          })
        }else
        {
          this.listOfDonor.splice(0,1);
          this.donerDetailsForm.reset();
          this.InitializeForm();
        }
      }
      else
      alert("Unfortunately we had trouble delete the donor number phone. Please try again later.");
    }, err => {
      alert("Unfortunately we had trouble delete the donor number phone. Please try again later.");
    });;

  }

  CallBack(){
    this._currentMenber = JSON.parse(sessionStorage.getItem("currentMember"));
    this.listOfDonor.reverse();
    debugger
    this._saveDonor=this.listOfDonor.pop();
    this.listOfDonor.reverse();
    this._callSessionService.postDonor(parseInt(this._saveDonor.id) ,this._currentMenber.fullName).subscribe((save)=>
    {

      debugger
        if(save) {
          sessionStorage.setItem("listOfDonors",JSON.stringify(this.listOfDonor))
          this.donerDetailsForm.reset();
          this.InitializeForm();
          alert("The donor remove to the end of the list.");
        }
        else
        alert("Unfortunately we had trouble.");
      }, err => {
        alert("Unfortunately we had trouble.");
      });
  }

  SorryNo(){
   this.listOfDonor.splice(0,1);
   debugger
   alert("The donor remove from the list")
   if( this.listOfDonor.length==0)
   {
     debugger
     this._currentMenber = JSON.parse(sessionStorage.getItem("currentMember"));
     this._callSessionService.getDonorsById(this._currentMenber.fullName).subscribe((data) => {
       this.listOfDonor = data;
       sessionStorage.setItem("listOfDonors", JSON.stringify(this.listOfDonor));
       this.InitializeForm();
     }, err => {
       alert("We are having difficulties reveiving the list of donors. Please try again later.");
     })
   }
   else
   {
     debugger
    sessionStorage.setItem("listOfDonors",JSON.stringify(this.listOfDonor))
    this.InitializeForm();
   }
  }

  NeverAgain(){
  this._callSessionService.deleteDonor(this.listOfDonor[0].id).subscribe((save)=>
  {
    if(save) {
      alert("The donor was deleted succesfully!😊");
    }
    else
    alert("Unfortunately we had trouble delete the donor. Please try again later.");
  }, err => {
    alert("Unfortunately we had trouble delete the donor. Please try again later.");
  });;
  this.listOfDonor.splice(0,1);
  sessionStorage.setItem("listOfDonors",JSON.stringify(this.listOfDonor))
  this.donerDetailsForm.reset();
  this.InitializeForm();
  }

  InitializeForm() {
      this.donerDetailsForm.get('id').setValue(this.listOfDonor[0].id),
      this.donerDetailsForm.get('fullName').setValue(this.listOfDonor[0].fullName),
      this.donerDetailsForm.get('password').setValue(this.listOfDonor[0].password),
      this.donerDetailsForm.get('firstName').setValue(this.listOfDonor[0].firstName),
      this.donerDetailsForm.get('lastName').setValue(this.listOfDonor[0].lastName),
      this.donerDetailsForm.get('connectionID').setValue(this.listOfDonor[0].connectionID),
      this.donerDetailsForm.get('ageGroup').setValue(this.listOfDonor[0].ageGroup),
      this.donerDetailsForm.get('email').setValue(this.listOfDonor[0].email);
      this.donerDetailsForm.get('phoneNumber').setValue(this.listOfDonor[0].phoneNumber),
      this.donerDetailsForm.get('country').setValue(this.listOfDonor[0].country),
      this.donerDetailsForm.get('city').setValue(this.listOfDonor[0].city),
      this.donerDetailsForm.get('nativeLanguage').setValue(this.listOfDonor[0].nativeLanguage),
      this.donerDetailsForm.get('totalDonation').setValue(this.listOfDonor[0].totalDonation),
      this.donerDetailsForm.get('lastDonation').setValue(this.listOfDonor[0].lastDonation),
      this.donerDetailsForm.get('vip').setValue(this.listOfDonor[0].vip),
      this.donerDetailsForm.get('anashIsrael').setValue(this.listOfDonor[0].anashIsrael),
      this.donerDetailsForm.get('anashUSA').setValue(this.listOfDonor[0].anashUSA),
      this.donerDetailsForm.get('pinskSchoolGraduate').setValue(this.listOfDonor[0].pinskSchoolGraduate),
      this.donerDetailsForm.get('kievSchoolGraduate').setValue(this.listOfDonor[0].kievSchoolGraduate),
      this.donerDetailsForm.get('yeshivaGraduate').setValue(this.listOfDonor[0].yeshivaGraduate),
      this.donerDetailsForm.get('inPinsk').setValue(this.listOfDonor[0].inPinsk),
      this.donerDetailsForm.get('businessAssociate').setValue(this.listOfDonor[0].businessAssociate),
      this.donerDetailsForm.get('boysCounselor').setValue(this.listOfDonor[0].boysCounselor),
      this.donerDetailsForm.get('girlsCounselor').setValue(this.listOfDonor[0].girlsCounselor),
      this.donerDetailsForm.get('helpedByPinsk').setValue(this.listOfDonor[0].helpedByPinsk),
      this.donerDetailsForm.get('generalSupporter').setValue(this.listOfDonor[0].generalSupporter),
      this.donerDetailsForm.get('mhsg').setValue(this.listOfDonor[0].mhsg),
      this.donerDetailsForm.get('belarusAnsectors').setValue(this.listOfDonor[0].belarusAnsectors),
      this.donerDetailsForm.get('belarusTourism').setValue(this.listOfDonor[0].belarusTourism),
      this.donerDetailsForm.get('yyFundraiser').setValue(this.listOfDonor[0].yyFundraiser),
      this.donerDetailsForm.get('yyFamily').setValue(this.listOfDonor[0].yyFamily),
      this.donerDetailsForm.get('yyStaff').setValue(this.listOfDonor[0].yyStaff),
      this.donerDetailsForm.get('rShteiermanFamily').setValue(this.listOfDonor[0].rShteiermanFamily),
      this.donerDetailsForm.get('rFimaFamily').setValue(this.listOfDonor[0].rFimaFamily),
      this.donerDetailsForm.get('marriedAYYGraduate').setValue(this.listOfDonor[0].marriedAYYGraduate),
      this.donerDetailsForm.get('yearsInYadYisroel').setValue(this.listOfDonor[0].yearsInYadYisroel),
      this.donerDetailsForm.get('other').setValue(this.listOfDonor[0].other);
  };
}
