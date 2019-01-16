import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/User'
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friends: User[];
  friend: User;
  price: number = 78.898989;
  today: any = Date.now();
  user: User;
  constructor(private activateRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthentificationService) {
    this.friendId = this.activateRoute.snapshot.params['uid'];
    this.userService.getUserById(this.friendId).valueChanges()
      .subscribe((data: User) => {
        this.friend = data
      }, (error) => { console.log(error) })

    // this.friends = this.userService.getFriends();
    // this.friend = this.friends.find(item => item.uid == this.friendId)
    // console.log(this.friend)
    this.authenticationService.getStatus()
      .subscribe((session) => this.userService.getUserById(session.uid).valueChanges()
        .subscribe((user: User) => {
          this.user = user
        }))
  }


  ngOnInit() {
  }

  sendMessage() {
    const message = {
      // uid: ,
    }
    this.conversationService.createConversation();
  }

}
