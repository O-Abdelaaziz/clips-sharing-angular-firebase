import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ClipService} from "../../services/clip.service";
import IClip from "../../models/clip";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public videoOrder: string = '1';
  public clips: IClip[] = [];
  public activeClip: IClip | null = null;

  constructor(
    private _clipService: ClipService,
    private _modalService: ModalService,
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
      );

    this.onGetCLips();
  }

  onGetCLips() {
    this._clipService.getUserClips().subscribe(
      (docs) => {
        this.clips = [];
        docs.forEach(doc => {
          this.clips.push({
            docId: doc.id,
            ...doc.data()
          });
        })
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


  openEditModal($event: Event, clip: IClip) {
    $event.preventDefault();
    this.activeClip = clip;
    this._modalService.toggleModal('editClip');

  }

  onUpdate($event: IClip) {
    this.clips.forEach((element, index) => {
      if (element.docId == $event.docId) {
        this.clips[index].title = $event.title;
      }
    })
  }
}
