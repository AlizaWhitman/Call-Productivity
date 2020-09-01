import { Component, OnInit } from '@angular/core';
import { Donor } from '../models/donor-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DonorsService } from '../donors.service';


@Component({
  selector: 'app-donor-new',
  templateUrl: './donor-new.component.html',
  styleUrls: ['./donor-new.component.css']
})
export class DonorNewComponent implements OnInit {
  private _newDonor: Donor;

  newDonorForm: FormGroup = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    connectionID: new FormControl(JSON.parse(sessionStorage.getItem("currentMember")).id),
    gender: new FormControl(""),
    ageGroup: new FormControl(),
    email: new FormControl("",[Validators.required,Validators.email]),
    phoneNumber: new FormControl("",[Validators.minLength(9)]),
    country: new FormControl(""),
    city: new FormControl(""),
    nativeLanguage: new FormControl(""),
    totalDonation: new FormControl(0),
    lastDonation: new FormControl(0),
    vip: new FormControl(),
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
    other: new FormControl(""),
  });

  saveNewDonor() {
    this._newDonor = this.newDonorForm.value;
    this._newDonor.vip = false;
    this._newDonor.fullName = this._newDonor.firstName.concat(this._newDonor.lastName);
    this._DonorsService.saveDonor(this._newDonor).subscribe((save)=>
{
    if(save) {
      alert("The donor was added succesfully. Thank you!😊");
    }
    else
    alert("Unfortunately we had trouble saving your details. Please try again later.");
  }, err => {
    alert("Unfortunately we had trouble saving your details. Please try again later.");
  });;
  }
  constructor(private _DonorsService: DonorsService) { }

  ngOnInit() {
  }

}
