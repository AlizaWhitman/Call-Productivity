import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'
  ]
})
export class HomePageComponent implements OnInit {

  private _donorName :string;
  
  homePageForm: FormGroup = new FormGroup({
    donorName: new FormControl(""),
  });

  constructor( private _acr :ActivatedRoute) { }

  ngOnInit() {
    this._acr.params.forEach((urlParams) => { this._donorName= urlParams['name']; });
    this.homePageForm.get('donorName').setValue(this._donorName)
  }

}
