import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {last, switchMap} from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {ClipService} from "../../services/clip.service";
import IClip from "../../models/clip";
import {Router} from "@angular/router";
import {FfmpegService} from "../../services/ffmpeg.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  public isHovering: boolean = false;
  public file: File | null = null;
  public nextStep: boolean = false;
  public title: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public uploadFormGroup: FormGroup = new FormGroup({
    title: this.title,
  });

  public showAlert: boolean = false;
  public alertColor: string = 'blue';
  public alertContent: string = 'Please wait! Your clip is being uploaded...';
  public inSubmission: boolean = false;
  public showProgress: boolean = false;
  public percentage: number = 0;

  public user: firebase.User | null = null;
  public task?: AngularFireUploadTask;

  constructor(
    private _angularFireStorage: AngularFireStorage,
    private _angularFireAuth: AngularFireAuth,
    private _clipService: ClipService,
    public _ffmpegService: FfmpegService,
    private _router: Router,
  ) {
    _angularFireAuth.user.subscribe(
      (user) => {
        this.user = user;
      }
    );
    this._ffmpegService.init();
  }


  async onStoreFile(event: Event) {
    this.isHovering = false
    this.file = (event as DragEvent).dataTransfer ?
      (event as DragEvent).dataTransfer?.files.item(0) ?? null :
      (event.target as HTMLInputElement).files?.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    await  this._ffmpegService.getScreenshots(this.file);

    this.nextStep = true;
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    console.log(this.title)
  }

  onUploadFile() {
    this.uploadFormGroup.disable();
    this.showAlert = true;
    this.showProgress = true;
    this.alertColor = 'blue';
    this.alertContent = 'Please wait! Your clip is being uploaded...';
    this.inSubmission = true;
    const clipFileName = this.getUniqueId(4);
    const clipPath = `clips/${clipFileName}.mp4`;
    this.task = this._angularFireStorage.upload(clipPath, this.file);
    const clipReference = this._angularFireStorage.ref(clipPath);
    this.task.percentageChanges().subscribe(
      (progress) => {
        this.percentage = progress as number / 100;
      }
    );
    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipReference.getDownloadURL())
    ).subscribe(
      {
        next: async (url) => {
          const clip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.title.value,
            fileName: `${clipFileName}.mp4`,
            clipUrl: url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          }
          const clipDocumentRef = await this._clipService.createClip(clip);
          this.alertColor = 'green';
          this.alertContent = 'Success! Your clip is now ready to share with the world.';
          this.showProgress = false;
          setTimeout(() => {
            this._router.navigate(['/clip', clipDocumentRef.id]);
          }, 1000)
        },
        error: (error) => {
          this.uploadFormGroup.enable();
          this.alertColor = 'red';
          this.alertContent = 'Upload Failed! Please try again later.';
          this.inSubmission = true;
          this.showProgress = false;
        }
      }
    );
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

  ngOnDestroy(): void {
    this.task?.cancel();
  }
}
