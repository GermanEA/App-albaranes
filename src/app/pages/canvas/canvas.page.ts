import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.page.html',
  styleUrls: ['./canvas.page.scss'],
})
export class CanvasPage implements AfterViewInit {

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;

  drawing: boolean = false;

  selecterColor: string = '#000000';
  lineWidth: number = 2;

  constructor( private plt: Platform ) { }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 200;
  }

  startDrawing(ev) {
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }

  startDrawingTouch(ev){
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();    

    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }

  moved(ev) {
    if (!this.drawing) return;
    const canvasPosition = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');

    let currentX = ev.pageX - canvasPosition.x;
    let currentY = ev.pageY - canvasPosition.y;  

    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.selecterColor;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  touchMoved(ev){
    if (!this.drawing) return;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX - canvasPosition.x;
    let currentY = ev.touches[0].pageY - canvasPosition.y;

    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.selecterColor;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();       

    this.saveX = currentX;
    this.saveY = currentY;

  }

  endDrawing() {
    this.drawing = false;
  }

  clearCanvas() {
    const ctx = this.canvasElement.getContext('2d');
    ctx.clearRect( 0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  exportCanvasImage() {
    const dataUrl = this.canvasElement.toDataURL();
    console.log('image', dataUrl);
  }
}
