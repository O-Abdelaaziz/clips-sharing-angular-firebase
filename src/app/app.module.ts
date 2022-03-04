import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserModule} from "./user/user.module";
import {NavComponent} from './nav/nav.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {VideoModule} from "./video/video.module";
import {ClipComponent} from './clip/clip.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ClipsListComponent} from './clips-list/clips-list.component';
import {SharedModule} from "./shared/shared.module";
import {FirebaseTimestampPipe} from './pipes/firebase-timestamp.pipe';
import {NotifierModule} from "angular-notifier";
import {customNotifierOption} from "./config/customNotifierOption";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    NotFoundComponent,
    ClipsListComponent,
    FirebaseTimestampPipe,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.env.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    UserModule,
    VideoModule,
    SharedModule,
    AppRoutingModule,
    NotifierModule.withConfig(customNotifierOption),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
