import {Component, OnInit} from '@angular/core';
import {ModalService} from "./services/modal.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clip';

  constructor(public _authService: AuthService) {
  }
}
