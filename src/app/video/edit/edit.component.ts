import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import IClip from "../../models/clip";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClipService} from "../../services/clip.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public activeClip: IClip | null = null;
  @Output()
  public update: EventEmitter<any> = new EventEmitter();
  public clipId: FormControl = new FormControl('');
  public title: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public editFormGroup: FormGroup = new FormGroup({
    id: this.clipId,
    title: this.title,
  });
  alertColor: string = 'blue';
  showAlert: boolean = false;
  alertContent: string = '';
  inSubmission: boolean = false;

  constructor(
    private _modelService: ModalService,
    private _clipService: ClipService,
    private _translateService: TranslateService,
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
    this.showAlert = false;
    this.inSubmission = false;
    this.clipId.setValue(this.activeClip.docId);
    this.title.setValue(this.activeClip.title);
  }

  async onEdit() {
    if (!this.activeClip) {
      return;
    }
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertContent = this._translateService.instant('manage.alert.default.text');
    this.inSubmission = true;

    try {
      await this._clipService.updateClip(this.clipId.value, this.title.value);
    } catch (e) {
      this.alertColor = 'red';
      this.alertContent = this._translateService.instant('manage.alert.error.text');
      this.inSubmission = false;
      return;
    }
    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip);
    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertContent = this._translateService.instant('manage.alert.success.text');

  }
}
