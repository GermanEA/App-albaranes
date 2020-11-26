import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private firestore: AngularFirestore ) {}

  getData() {
    return this.firestore.collection('/albaranes/').snapshotChanges();
  }

  getDataOne(num){
    return this.firestore.collection('albaranes', ref => ref.where('numero', '==', num)).snapshotChanges();
  }
    
}
