import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-albaranes',
  templateUrl: './albaranes.page.html',
  styleUrls: ['./albaranes.page.scss'],
})
export class AlbaranesPage implements OnInit {  

  records;

  constructor( private dataService: DataService  ) {}
  
  ngOnInit() {
    this.records = this.dataService.getData();

    console.log(this.records);
  }

}
