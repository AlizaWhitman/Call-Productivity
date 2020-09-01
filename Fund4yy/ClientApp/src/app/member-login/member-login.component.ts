import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Member } from '../models/member-model';

import { Router, RouterLink } from '@angular/router';
import { MembersService } from '../members.service';
import { ConfirmationCode, Status } from '../models/confirmation-code-model';

@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.css']
})
export class MemberLoginComponent implements OnInit {

  private _loginMember: Member;
  private _emailForConfirmation: string;
  private _confirmationCode: ConfirmationCode;
  private _confirmationCodeEntered: String;
  private _currentMember: Member;


  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.minLength(3)]),
    password: new FormControl("")
  });


  SendPassword() {
    this._currentMember = new Member();
    this._currentMember.email = this.loginForm.value.email;
    if (this._currentMember.email){
      this._membersService.sendPassword(this._currentMember.email, 0).subscribe((status) => {
     
        switch (status.emailStatus) {
          case 1:
            alert("Please check your inbox for your password");
            break;
          case 2:
            alert("We have encountered a problem while sending the email. Please make sure the email is correct.");
            break;
          case 3:
            alert("Unfortunately we could not find your email. Please Sign Up as a new member.");
            break;
          case 4:
            alert("The email entered is incorrect. Please try again!");
            break;
        }
      })
    }
    else{
      alert("Please fill in your email address where neccessary.");
    }
   

  }


  SendConfirmation() {
    this._currentMember = new Member();
    this._currentMember.email = this._emailForConfirmation;
    this._membersService.sendPassword(this._currentMember.email, 1).subscribe((status) => {
      switch (status.emailStatus) {
        case 1:// EMAIL SENT SUCCESSFULLY
          alert("Please check your inbox for your confirmation code");
          this._confirmationCode = new ConfirmationCode();
          this._confirmationCode.code = status.code;
          sessionStorage.setItem("currentMember", JSON.stringify(this._currentMember));
          document.getElementById("send-confirmation").style.visibility = "hidden";
          document.getElementById("confirmation-code").style.visibility = "visible";
          break;
        case 2:
          alert("We have encountered a problem while sending the email. Please make sure the email is correct.");
          break;
        case 4: // INCORRECT FORMAT
          alert("The email entered is incorrect. Please try again!");
          document.getElementById("member-new-email").innerText = "";
          break;
      }
    });
  }


  Confirmation() {
    if (this._confirmationCode.code == this._confirmationCodeEntered) {
      this._router.navigate(['/MemberNewComponent']);

    }
    else {
      alert("The confirmation code entered did not match the one sent. Please try again.")
      document.getElementById("confirmation-code").style.visibility = "hidden";
      document.getElementById("send-confirmation").style.visibility = "visible";
    }
  }

  Login() {
    this._loginMember = new Member();
    this._loginMember.email = this.loginForm.value.email;
    this._loginMember.password = this.loginForm.value.password;
    this._membersService.getMemberByEmailAndPassword(this._loginMember).subscribe(data => {
      if (data) {
        sessionStorage.setItem("currentMember", JSON.stringify(data));
        this._currentMember = JSON.parse(sessionStorage.getItem("currentMember"));
        this._router.navigate(["/HomePage", { name: this._currentMember.firstName}])
        alert("Welcome back " + data.firstName + " 😊");
      }
      else {
        alert("Unfortunately were unable to retrieve your information. Please make sure the details you`ve entered are correct. If the problem precedes, please sign up as a new member, thank you");
      }
    },
      err => {
        alert("Unfortunately we are currently unable to sign in. Please try again later.");
      }
    )
  }

  constructor(private _membersService: MembersService, private _router: Router) { }

  ngOnInit() {
  }

}


