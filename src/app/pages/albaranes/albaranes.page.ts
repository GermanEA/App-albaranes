import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-albaranes',
  templateUrl: './albaranes.page.html',
  styleUrls: ['./albaranes.page.scss'],
})
export class AlbaranesPage implements AfterViewInit {

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;

  drawing: boolean = false;

  selecterColor = '#9e2956';
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3'];
  lineWidth = 5;

  constructor( private plt: Platform ) { }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 200;
    
  }

  startDrawing(ev) {
    console.log('start: ', ev);
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();
    console.log(canvasPosition);

    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }

  endDrawing() {
    console.log('end: ');
    this.drawing = false;
  }

  moved(ev) {
    if (!this.drawing) return;
    console.log('move: ', ev);
    const canvasPosition = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');

    let currentX = ev.pageX - canvasPosition.x;
    let currentY = ev.pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selecterColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

}
