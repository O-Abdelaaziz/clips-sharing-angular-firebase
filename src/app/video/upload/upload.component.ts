import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public isHovering: boolean = false;
  public file: File | null = null;
  public nextStep: boolean = false;
  public title: FormControl = new FormControl('');
  public uploadFormGroup: FormGroup = new FormGroup({
    title: this.title,
  });

  public showAlert: boolean = false;
  public alertColor: string = 'blue';
  public alertContent: string = 'Please wait! Your clip is being uploaded...';
  public inSubmission: boolean = false;

  constructor(private _angularFireStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  onStoreFile(event: DragEvent) {
    this.isHovering = false
    this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }
    this.nextStep = true;
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    console.log(this.title)
  }

  onUploadFile() {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertContent = 'Please wait! Your clip is being uploaded...';
    this.inSubmission = true;
    const clipFileName = this.getUniqueId(4);
    const clipPath = `clips/${clipFileName}.mp4`;
    this._angularFireStorage.upload(clipPath, this.file);
  }

  /**
   * generate groups of 4 random characters
   * @example getUniqueId(1) : 607f
   * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
   */
  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}
