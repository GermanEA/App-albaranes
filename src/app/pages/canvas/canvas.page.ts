import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Platform, ToastController, NavController } from '@ionic/angular';

//Para capturar el parámetro pasado por ruta
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.page.html',
  styleUrls: ['./canvas.page.scss'],
})
export class CanvasPage implements AfterViewInit {

  inputAlbaran: {};

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;

  drawing: boolean = false;

  selecterColor: string = '#000000';
  lineWidth: number = 2;

  constructor(private plt: Platform,
              private route: ActivatedRoute,
              private storage: AngularFireStorage,
              private toastController: ToastController,
              private navCtrl: NavController,
              private dataService: DataService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.inputAlbaran = data;
    });
  }

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

  async exportCanvasImage() {
    
    if(this.isCanvasBlank(this.canvasElement)){
      this.presentToast('Es necesario una firma.', 'danger');
    } else {
      const dataUrl = this.canvasElement.toDataURL();
      const base64Response = await fetch(dataUrl);
      const blob = await base64Response.blob();
    
      var uploadTask = this.storage.storage.ref().child('images/' + this.inputAlbaran['numero'] + '.pdf').put(blob);
      
      this.dataService.setData(this.inputAlbaran['id']);
      this.presentToast('Su firma se ha guardado.', 'success');
      this.navCtrl.navigateForward('/albaranes');
    }  
  }

  isCanvasBlank(canvas) {
    return !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data
      .some(channel => channel !== 0);
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      position: 'middle',
      color: color,
      cssClass: 'my-toast',
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
