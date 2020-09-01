import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgControlStatus } from '@angular/forms';
import { CallsService } from '../calls-service';
import { empty } from 'rxjs';
import { Donor } from '../models/donor-model';
import { DonorsList } from '../models/donors-list-model';
import { CallsSummary } from '../models/call-summary-model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Member } from '../models/member-model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-call-summary',
  templateUrl: './call-summary.component.html',
  styleUrls: ['./call-summary.component.css']
})
export class CallSummaryComponent implements OnInit {

  allDonors: DonorsList[]
  private _newCallSummary: CallsSummary
  private _currentMember: Member;
  private _donorName :string;
  private _donorID :string;

  CallSummaryForm: FormGroup = new FormGroup({
    charity: new FormControl(""),
    location: new FormControl(""),
    dID: new FormControl(""),
    dFullName: new FormControl("", [Validators.required]),
    fID: new FormControl(),
    fFullName: new FormControl(""),
    callRating: new FormControl(),
    donation: new FormControl("", [Validators.required]),
    other: new FormControl(""),
  });

  setDonorsFullName(donorsID: string) {
    this.CallSummaryForm.get('dFullName').setValue(this.allDonors.find(d => d.donorsID == donorsID).donorsFullName);

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  }
  showPosition(position) {
    sessionStorage.setItem("Location","Latitude: " + position.coords.latitude +
    "Longitude: " + position.coords.longitude);
  }


  submit() {
    this._newCallSummary = this.CallSummaryForm.value;
    if (this._newCallSummary.callRating) {
      this._newCallSummary.callRating = (this._newCallSummary.callRating).toString();
    }
    else {
      this._newCallSummary.callRating = "0";
    }
    this._newCallSummary.location = sessionStorage.getItem("Location");
    this._newCallSummary.fID = this._currentMember.id;
    this._newCallSummary.fFullName = this._currentMember.fullName;
    this._donorID=JSON.parse(sessionStorage.getItem("dID"))
    this._newCallSummary.dID = this._donorID;
    this._callsService.saveCall(this._newCallSummary).subscribe();
    alert("Call submitted. Thank you!!! 😊🤩😄")
    this.CallSummaryForm.reset();
    this._router.navigate(["/CallSessionComponent"])

  }

  constructor(private _callsService: CallsService, private _acr :ActivatedRoute,private _router: Router) {
   }

  ngOnInit() {
  //  if(sessionStorage.getItem("dName"))
  //  {
  //    debugger
  //   this._currentMember = JSON.parse(sessionStorage.getItem("currentMember"));
  //   this._donorName=JSON.parse(sessionStorage.getItem("dName"))
  //   this.CallSummaryForm.get('dFullName').setValue(this._donorName)
  //   debugger
  //  }
  //  else
   {
     debugger
    this._currentMember = JSON.parse(sessionStorage.getItem("currentMember"));
    this._acr.params.forEach((urlParams) => { this._donorName= urlParams['name']; this._donorID=urlParams['dID']; });
    this.CallSummaryForm.get('dFullName').setValue(this._donorName)
    sessionStorage.setItem("dName", JSON.stringify(this._donorName))
    sessionStorage.setItem("dID", JSON.stringify(this._donorID))

  }
    // this._callsService.getDonors().subscribe((data) => {
    //   debugger
    //   this.allDonors = data;
    //   debugger
    // }, err => {
    //   alert("We are having difficulties reveiving the list of donors. Please try again later.");
    // })
  }
}
