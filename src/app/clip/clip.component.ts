import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class ClipComponent implements OnInit {
  public clipId: string;

  constructor(private _activatedRoute: ActivatedRoute) {
    this.clipId = this._activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}
