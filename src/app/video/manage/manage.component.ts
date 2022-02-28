import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ClipService} from "../../services/clip.service";
import IClip from "../../models/clip";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public videoOrder: string = '1';

  constructor(
    private _clipService: ClipService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap
      .subscribe(
        (response: Params) => {
          const params = response['params']
          this.videoOrder = params['sort'] === '2' ? params['sort'] : '1';
        }
      )
  }

  onSortItems(event: Event) {
    const {value} = (event.target as HTMLSelectElement);
    // this._router.navigateByUrl(`/manage?sort=${value}`);
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        sort: value
      }
    })
  }
}
