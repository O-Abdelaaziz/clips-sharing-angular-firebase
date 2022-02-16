import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public fullName = new FormControl('', [
    Validators.required,
    Validators.minLength(3)]
  );
  public email = new FormControl('');
  public age = new FormControl('');
  public password = new FormControl('');
  public confirmPassword = new FormControl('');
  public phoneNumber = new FormControl('');
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
