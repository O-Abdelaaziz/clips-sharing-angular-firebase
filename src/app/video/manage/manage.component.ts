import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  videoOrder: string = '1';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(
      (params: Params) => {
        this.videoOrder = params['sort'] === 2 ? params['sort'] : '1';
      }
    )
  }

  onSortItems(event: Event) {
    const {value} = (event.target as HTMLSelectElement);
    this._router.navigateByUrl(`/manage?sort=${value}`);
  }
}
