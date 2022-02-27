import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import IClip from "../models/clip";

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollections: AngularFirestoreCollection<IClip>;

  constructor(private _angularFirestore: AngularFirestore) {
    this.clipsCollections = this._angularFirestore.collection('clips');
  }

  async createClip(data: IClip) {
    // set allow you to set a custom uid for your document.
    // add will instruct firebase to generate auto uid fro your document
    await this.clipsCollections.add(data);
  }

}
