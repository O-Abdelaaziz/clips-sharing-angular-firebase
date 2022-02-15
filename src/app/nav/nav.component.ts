import {Component, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  onOpenModal($event: Event) {
    $event.preventDefault();
    this._modalService.toggleModal();
  }

}
