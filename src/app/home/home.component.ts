import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'
import { UserService } from '../services/user.service';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';
// import { networkInterfaces } from 'os';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  closeResult: string;
  friendEmail: string = '';
  user: User;
  constructor(private userService: UserService,
    private authenticationService: AuthentificationService,
    private router: Router,
    private modalService: NgbModal,
    private requestService: RequestsService) {

    this.userService.getUsers().valueChanges()
      .subscribe((data: User[]) => {
        // console.log(data)
        this.friends = data
      }, (error) => { console.log(error) });
    this.authenticationService.getStatus().subscribe(
      (status) => {
        this.userService.getUserById(status.uid).valueChanges()
          .subscribe(
            (data: User) => {
              // console.log(typeof data)
              this.user = data
              if (this.user.friends) {
                console.log(this.user.friends)
                this.user.friends = Object.values(this.user.friends)
                console.log(this.user.friends)

              }
            }
          )
      }
    )
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any) {
    if (reason === ModalDismissReasons.ESC) {
      // return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      // return 'by clicking on a backdrop';
    } else {
      // return `with: ${reason}`;
    }
  }
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      reciver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'

    }
    console.log(request)
    this.requestService.createRequest(request)
      .then(() =>
        alert('Solicitud Enviada')
      ).catch(
        (error) => {
          alert('Hubo un error')
          console.log(error)
        }
      )

  }
}
