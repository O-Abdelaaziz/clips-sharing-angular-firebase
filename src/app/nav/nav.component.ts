import {Component, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {AuthService} from "../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

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
    await this._angularFireAuth.signOut();
  }
}
