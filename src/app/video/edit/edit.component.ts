import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import IClip from "../../models/clip";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public activeClip: IClip | null = null;
  public clipId: FormControl = new FormControl('');
  public title: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public editFormGroup: FormGroup = new FormGroup({
    id: this.clipId,
    title: this.title,
  });

  constructor(private _modelService: ModalService) {
  }

  ngOnInit(): void {
    this._modelService.register("editClip");
  }

  ngOnDestroy() {
    this._modelService.unregister("editClip");
  }

  ngOnChanges() {
    if (!this.activeClip) {
      return;
    }
    this.clipId.setValue(this.activeClip.docId);
    this.title.setValue(this.activeClip.title);
  }

}
