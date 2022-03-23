import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';

interface ListaAlbaranes {
  id: string;
  idtransp: number;
  fecha: string;
  numero: string;
  firma: boolean;
}

@Component({
  selector: 'app-albaranes',
  templateUrl: './albaranes.page.html',
  styleUrls: ['./albaranes.page.scss'],
})
export class AlbaranesPage implements OnInit {  

  listaAlbaranes: ListaAlbaranes[];

  constructor( private dataService: DataService  ) {}
  
  ngOnInit() {
    this.dataService.getData().subscribe(data => {
        if(data){
          
          this.listaAlbaranes = data.map (e => {
            return {
              id: e.payload.doc.id,
              idtransp: e.payload.doc.data()['id transportista'],
              fecha: e.payload.doc.data()['fecha'],
              numero: e.payload.doc.data()['numero'],
              firma: e.payload.doc.data()['firma']
            }
          })
        }
    })
  }
  
}
  


