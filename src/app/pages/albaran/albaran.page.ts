import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

//Para capturar el parámetro pasado por ruta
import { ActivatedRoute } from '@angular/router';

interface Albaranes {
  id: string;
  idtransp: number;
  fecha: string;
  numero: string;
  firma: boolean;
}

@Component({
  selector: 'app-albaran',
  templateUrl: './albaran.page.html',
  styleUrls: ['./albaran.page.scss'],
})
export class AlbaranPage implements OnInit {

  numeroAlbaran: {};
  idAlbaran: {};
  albaranes: Albaranes[];

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.numeroAlbaran = data;
    });

    this.dataService.getDataOne(this.numeroAlbaran['numero']).subscribe(data => {
      if(data){

        this.albaranes = data.map (e => {
          return{
            id: e.payload.doc.id,
            idtransp: e.payload.doc.data()['id transportista'],
            fecha: e.payload.doc.data()['fecha'],
            numero: e.payload.doc.data()['numero'],
            firma: e.payload.doc.data()['firma']
          }
        })
      }
    })

    console.log(this.idAlbaran);
  }

}
