import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import IClip from "../../models/clip";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClipService} from "../../services/clip.service";

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
  alertColor: string = 'blue';
  showAlert: boolean = false;
  alertContent: string = 'Please wait! Updating clip.';
  inSubmission: boolean = false;

  constructor(
    private _modelService: ModalService,
    private _clipService: ClipService,
  ) {
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

  async onEdit() {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertContent = 'Please wait! Updating clip.';
    this.inSubmission = true;

    try {
      await this._clipService.updateClip(this.clipId.value, this.title.value);
    } catch (e) {
      this.alertColor = 'red';
      this.alertContent = 'Something went wrong. try again later';
      this.inSubmission = false;
      return;
    }
    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertContent = 'Success! your clip was updated successfully.';
  }
}
