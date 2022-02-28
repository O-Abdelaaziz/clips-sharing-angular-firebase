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
import {BehaviorSubject, of, combineLatest} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollections: AngularFirestoreCollection<IClip>;

  constructor(
    private _angularFirestore: AngularFirestore,
    private _angularFireStorage: AngularFireStorage,
    private _angularFireAuth: AngularFireAuth) {
    this.clipsCollections = this._angularFirestore.collection('clips');
  }

  getUserClips(sort$: BehaviorSubject<string>) {
    return combineLatest([this._angularFireAuth.user, sort$]).pipe(
      switchMap(values => {
        const [user, sort] = values;
        if (!user) {
          return of([])
        }
        const query = this.clipsCollections.ref.where('uid', '==', user.uid).orderBy('timestamp', sort === '1' ? 'desc' : 'asc');
        return query.get();
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    );
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    // set allow you to set a custom uid for your document.
    // add will instruct firebase to generate auto uid fro your document
    return this.clipsCollections.add(data);
  }

  updateClip(id: string, title: string) {
    return this.clipsCollections.doc(id).update({title});
  }

  async deleteClip(clip: IClip) {
    const clipRef = this._angularFireStorage.ref(`clips/${clip.fileName}`);
    await clipRef.delete();
    await this.clipsCollections.doc(clip.docId).delete();
  }


}
