import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TranslateService} from "@ngx-translate/core";

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
  public alertContent: string = '';
  public inSubmission: boolean = false;

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  async onLogin() {
    this.showAlert = true;
    this.alertContent = this._translateService.instant('login.alert.default.text');

    this.alertColor = 'blue';
    this.inSubmission = true;


    try {
      await this._angularFireAuth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      );
    } catch (e) {
      this.inSubmission = false;
      console.log(e)
      this.alertContent = this._translateService.instant('login.alert.error.text');
    }
    this.alertContent = this._translateService.instant('login.alert.success.text');

    this.alertColor = "green";
  }
}
