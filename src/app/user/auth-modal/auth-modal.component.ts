import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy {

  constructor(private _modalService: ModalService) {
  }

  ngOnInit(): void {
    this._modalService.register('auth');
  }

  ngOnDestroy() {
    this._modalService.unregister('auth');
  }

}
