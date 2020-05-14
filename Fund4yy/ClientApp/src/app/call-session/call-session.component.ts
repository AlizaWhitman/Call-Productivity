import { Component, OnInit } from '@angular/core';
import { CallSessionService } from '../call-session.service';
import { Session } from 'protractor';
import { Donor } from '../models/donor-model';

@Component({
  selector: 'app-call-session',
  templateUrl: './call-session.component.html',
  styleUrls: ['./call-session.component.css']
})
export class CallSessionComponent implements OnInit {
 
  listOfDonor: Donor[];

  constructor(private _callSessionService: CallSessionService) { }

  ngOnInit() {
    sessionStorage.setItem( "listOfDonors",  JSON.stringify(this._callSessionService.getDonors()));
  }

  GetDonorToCall(){
    this.listOfDonor = JSON.parse(sessionStorage.getItem("listOfDonors"));
    return this.listOfDonor[0];
  }

}
