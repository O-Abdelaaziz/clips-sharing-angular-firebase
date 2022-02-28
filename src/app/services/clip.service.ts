import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot
} from "@angular/fire/compat/firestore";
import IClip from "../models/clip";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {switchMap, map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollections: AngularFirestoreCollection<IClip>;

  constructor(
    private _angularFirestore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth) {
    this.clipsCollections = this._angularFirestore.collection('clips');
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    // set allow you to set a custom uid for your document.
    // add will instruct firebase to generate auto uid fro your document
    return this.clipsCollections.add(data);
  }

  getUserClips() {
    return this._angularFireAuth.user.pipe(
      switchMap(user => {
        if (!user) {
          return of([])
        }
        const query = this.clipsCollections.ref.where('uid', '==', user.uid);
        return query.get();
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    );
  }


}
