import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RegisterValidators} from "../validators/register-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public fullName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public age = new FormControl('', [Validators.required, Validators.min(18), Validators.max(50)]);
  public password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  public confirmPassword = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  public phoneNumber = new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]);
  public registerFromGroup: FormGroup = new FormGroup({
    fullName: this.fullName,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  }, RegisterValidators.match('password', 'confirmPassword'));

  public showAlert: boolean = false;
  public alertColor: string = 'blue';
  public alertContent: string = 'Please wait! Your account is being created.';

  public inSubmission: boolean = false;

  constructor(
    private _authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  async onRegister() {
    this.showAlert = true;
    this.alertContent = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this._authService.createUser(this.registerFromGroup.value);
    } catch (e) {
      console.error(e);
      this.alertContent = "An unexpected error occurred. Please try again later."
      this.alertColor = "red";
      this.inSubmission = false;
      return;
    }

    this.alertContent = "Success! Your account has been created";
    this.alertColor = "green";
  }
}
