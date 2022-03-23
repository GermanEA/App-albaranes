import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService
  ) { }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

}
