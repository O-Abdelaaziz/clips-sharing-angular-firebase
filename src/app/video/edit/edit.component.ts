import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import IClip from "../../models/clip";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  @Input()
  public activeClip: IClip | null = null;

  constructor(private _modelService: ModalService) {
  }

  ngOnInit(): void {
    this._modelService.register("editClip");
  }

  ngOnDestroy() {
    this._modelService.unregister("editClip");
  }

}
