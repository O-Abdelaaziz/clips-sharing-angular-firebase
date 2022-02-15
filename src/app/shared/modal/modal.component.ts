import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  public modalId: string = '';

  constructor(public _modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  onCloseModal() {
    this._modalService.toggleModal(this.modalId);
  }
}
