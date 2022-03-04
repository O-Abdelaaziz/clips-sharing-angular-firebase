import {Component, OnInit} from '@angular/core';
import {ModalService} from "./services/modal.service";
import {AuthService} from "./services/auth.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clip';

  constructor(
    public _authService: AuthService,
    private _translateService: TranslateService
  ) {
    this._translateService.addLangs(['en', 'fr']);
    this._translateService.setDefaultLang('en');
    this._translateService.use('en');
  }
}
