import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import videojs from "video.js";
import {DatePipe} from "@angular/common";
import IClip from "../models/clip";

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
  public target?: ElementRef;

  public player?: videojs.Player;

  public clip?: IClip;

  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this._activatedRoute.params.subscribe(
    //   (params: Params) => {
    //     this.clipId = params['id'];
    //   }
    // );

    this.player = videojs(this.target?.nativeElement);

    this._activatedRoute.data.subscribe(
      data => {
        this.clip = data['clip'] as IClip;
        this.player?.src({
          src: this.clip.clipUrl,
          type: 'video/mp4'
        })
      }
    )
  }
}
