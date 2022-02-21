import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credentials: { email: string, password: string } = {
    email: '',
    password: ''
  };

  public showAlert: boolean = false;
  public alertColor: string = 'blue';
  public alertContent: string = 'Please wait! we are logging you in...';
  public inSubmission: boolean = false;

  constructor(private _angularFireAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
  }

  async onLogin() {
    this.showAlert = true;
    this.alertContent = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;


    try {
      await this._angularFireAuth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      );
    } catch (e) {
      console.log(e)
      this.inSubmission = false;

    }
    this.alertContent = "Success! Your hav been connected successfully";
    this.alertColor = "green";
  }
}
