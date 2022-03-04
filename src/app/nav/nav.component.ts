import {Component, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {AuthService} from "../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public _authService: AuthService,
    private _angularFireAuth: AngularFireAuth,
    private _modalService: ModalService,
    private _translateService: TranslateService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  onOpenModal($event: Event) {
    $event.preventDefault();
    this._modalService.toggleModal('auth');
  }

  async onLogout($event: Event) {
    $event.preventDefault();
    await this._authService.onLogout($event)
  }

  useLanguage(language: string): void {
    console.log('click');
    this._translateService.use(language);
  }
}
