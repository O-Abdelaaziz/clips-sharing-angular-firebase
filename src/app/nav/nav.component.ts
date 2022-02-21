import {Component, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private _modalService: ModalService,
    public _authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  onOpenModal($event: Event) {
    $event.preventDefault();
    this._modalService.toggleModal('auth');
  }

}
