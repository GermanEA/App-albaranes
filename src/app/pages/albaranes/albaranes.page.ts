import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-albaranes',
  templateUrl: './albaranes.page.html',
  styleUrls: ['./albaranes.page.scss'],
})
export class AlbaranesPage implements OnInit {  

  doc: any;
  records: { id: string, idtransp: string, fecha: string, numero: string }[];

  constructor( private firestore: AngularFirestore ) {}
  
  ngOnInit() {
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
