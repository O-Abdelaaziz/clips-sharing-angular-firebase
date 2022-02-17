import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public fullName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public age = new FormControl('',[Validators.required,Validators.min(18),Validators.max(50)]);
  public password = new FormControl('',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  public confirmPassword = new FormControl('',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  public phoneNumber = new FormControl('',[Validators.required,Validators.minLength(13),Validators.maxLength(13)]);
  public registerFromGroup: FormGroup = new FormGroup({
    fullName: this.fullName,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  });

  constructor() {
  }

  ngOnInit(): void {
  }
}
