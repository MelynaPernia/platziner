import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation: string = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;

  constructor(private authenticationService: AuthentificationService, private userServices: UserService, private router: Router) {

  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password)
      .then((item) => {
        alert('Logeado correctamente')
        this.router.navigate(['home']);
      }).catch((error) => {
        alert('Ocurrio un error');
        console.log(error)
      })
  }
  register() {
    this.authenticationService.registerWithEmail(this.email, this.password)
      .then((data) => {
        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        };
        //iyectando al usuario
        this.userServices.createUser(user)
          .then((data1) => {
            alert('Registrado correctamente')

          }).catch((error) => {
            alert('ha ocurrido un error')
          })


      }).catch((error) => {
        alert('Ocurrio un error');
        console.log(error)
      })
  }

}
