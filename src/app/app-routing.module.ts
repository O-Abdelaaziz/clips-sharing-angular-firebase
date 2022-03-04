import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ClipComponent} from "./clip/clip.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ClipService} from "./services/clip.service";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'clip/:id', component: ClipComponent, resolve: {clip: ClipService}},
  {path: '', loadChildren: async () => (await import('./video/video.module')).VideoModule}, // dashboard/manage, dashboard/upload
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
