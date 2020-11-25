import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(private navCtrl: NavController,
              private authService: AuthenticateService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Debes introducir tu correo.' },
      { type: 'pattern', message: 'Inserta un correo válido.' }
    ],
    'password': [
      { type: 'required', message: 'Debes introducir la contraseña.' },
      { type: 'minlength', message: 'La contraseña debe ser al menos de 5 caracteres.' }
    ]
  };

  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/albaranes');
      }, err => {
        this.errorMessage = err.message;
      })
  }

}
