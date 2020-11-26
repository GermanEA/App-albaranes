import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  doc: any;
  records: { id: string, idtransp: string, fecha: string, numero: string }[];

  constructor( private firestore: AngularFirestore ) {}

  getData() {
    this.firestore.collection('/albaranes/').snapshotChanges().subscribe(res => {
      if(res){
        
        this.records = res.map (e => {
          return {
            id: e.payload.doc.id,
            idtransp: e.payload.doc.data()['id transportista'],
            fecha: e.payload.doc.data()['fecha'],
            numero: e.payload.doc.data()['numero']
          }
        })
      }
    })
  }
}
