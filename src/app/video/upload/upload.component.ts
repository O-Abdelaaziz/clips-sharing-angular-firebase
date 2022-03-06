import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {switchMap} from 'rxjs/operators';
import {combineLatest, forkJoin} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {ClipService} from "../../services/clip.service";
import {Router} from "@angular/router";
import {FfmpegService} from "../../services/ffmpeg.service";
import {TranslateService} from "@ngx-translate/core";

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
  public alertContent: string = '';
  public inSubmission: boolean = false;
  public showProgress: boolean = false;
  public percentage: number = 0;

  public user: firebase.User | null = null;
  public task?: AngularFireUploadTask;
  public screenshots: string[] = [];
  public selectedScreenshots: string = '';
  public screenshotTask?: AngularFireUploadTask;


  constructor(
    private _angularFireStorage: AngularFireStorage,
    private _angularFireAuth: AngularFireAuth,
    private _clipService: ClipService,
    public _ffmpegService: FfmpegService,
    private _translateService: TranslateService,
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
    if (this._ffmpegService.isRunning) {
      return
    }
    this.isHovering = false
    this.file = (event as DragEvent).dataTransfer ?
      (event as DragEvent).dataTransfer?.files.item(0) ?? null :
      (event.target as HTMLInputElement).files?.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.screenshots = await this._ffmpegService.getScreenshots(this.file);
    this.selectedScreenshots = this.screenshots[0];

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));

    this.nextStep = true;
  }

  async onUploadFile() {
    this.uploadFormGroup.disable();
    this.showAlert = true;
    this.showProgress = true;
    this.alertColor = 'blue';
    this.alertContent = this._translateService.instant('upload.video.default.text');

    this.inSubmission = true;
    const clipFileName = this.getUniqueId(4);
    const clipPath = `clips/${clipFileName}.mp4`;

    const screenshotBlob = await this._ffmpegService.blobFromUrl(this.selectedScreenshots);
    const screenshotPath = `screenshots/${clipFileName}.png`;

    this.task = this._angularFireStorage.upload(clipPath, this.file);
    const clipReference = this._angularFireStorage.ref(clipPath);

    this.screenshotTask = this._angularFireStorage.upload(screenshotPath, screenshotBlob);

    const screenshotReference = this._angularFireStorage.ref(screenshotPath);


    combineLatest(
      [this.task.percentageChanges(),
        this.screenshotTask.percentageChanges()
      ]).subscribe(
      (progress) => {
        const [clipProgress, screenshotProgress] = progress;

        if (!clipProgress || !screenshotProgress) {
          return;
        }
        const total = clipProgress + screenshotProgress;
        this.percentage = total as number / 200;
      }
    );

    forkJoin([this.task.snapshotChanges(), this.screenshotTask]).pipe(
      switchMap(() => forkJoin([clipReference.getDownloadURL(), screenshotReference.getDownloadURL()]))
    ).subscribe(
      {
        next: async (urls) => {
          const [clipUrl, screenshotUrl] = urls;
          const clip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.title.value,
            fileName: `${clipFileName}.mp4`,
            clipUrl,
            screenshotUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          }
          const clipDocumentRef = await this._clipService.createClip(clip);
          this.alertColor = 'green';
          this.alertContent = this._translateService.instant('upload.video.success.text');

          this.showProgress = false;
          setTimeout(() => {
            this._router.navigate(['/clip', clipDocumentRef.id]);
          }, 1000)
        },
        error: (error) => {
          this.uploadFormGroup.enable();
          this.alertColor = 'red';
          this.alertContent = this._translateService.instant('upload.video.error.text');
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

  //Updating_the_Firebase_Storage_Rules
  //request.resource.contentType == 'video/mp4' || request.resource.contentType == 'image/png'
}
