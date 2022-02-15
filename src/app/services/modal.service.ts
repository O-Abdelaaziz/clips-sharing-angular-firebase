import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public isVisible: boolean = false;

  constructor() {
  }

  isModalOpen() {
    return this.isVisible;
  }

  toggleModal() {
    this.isVisible = !this.isVisible
  }
}
