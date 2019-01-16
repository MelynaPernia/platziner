import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'
import { UserService } from '../services/user.service';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  constructor(private userService: UserService,
    private authenticationService: AuthentificationService,
    private router: Router) {
    userService.getUsers().valueChanges()
      .subscribe((data: User[]) => {
        console.log(data)
        this.friends = data
      }, (error) => { console.log(error) });
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logOut()
      .then(() => {
        alert('sesión cerrada');
        this.router.navigate(['login'])
      })
      .catch(error => console.log(error))
  }

}
