import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import videojs from "video.js";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class ClipComponent implements OnInit {
  public clipId: string = '';

  @ViewChild('videoPlayer', {static: true})
  public target?: ElementRef

  public player?: videojs.Player;

  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.clipId = params['id'];
      }
    );

    this.player = videojs(this.target?.nativeElement);
  }
}
