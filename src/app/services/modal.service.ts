import {Injectable} from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() {
  }

  isModalOpen(id: string): boolean {
    return !!this.modals.find(element => element.id === id)?.visible;
  }

  toggleModal(id: string) {
    const model = this.modals.find(element => element.id === id)
    if (model) {
      model.visible = !model.visible;
    }
  }

  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
    console.log("Modal Service :: register :: Modals-: ", this.modals)
  }
}
