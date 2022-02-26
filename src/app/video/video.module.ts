import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VideoRoutingModule} from './video-routing.module';
import {ManageComponent} from './manage/manage.component';
import {UploadComponent} from './upload/upload.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";


@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    SharedModule
  ]
})
export class VideoModule {
}
