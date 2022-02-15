import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  public modalId: string = '';

  constructor(
    public _modalService: ModalService,
    public _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    document.body.appendChild(this._elementRef.nativeElement);
  }

  onCloseModal() {
    this._modalService.toggleModal(this.modalId);
  }
}
