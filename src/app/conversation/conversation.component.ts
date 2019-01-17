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
  conversation_id: string;
  textMessage: string;
  conversation: any[];
  shake: boolean = false;
  constructor(private activateRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthentificationService) {
    this.friendId = this.activateRoute.snapshot.params['uid'];


    // this.friends = this.userService.getFriends();
    // this.friend = this.friends.find(item => item.uid == this.friendId)
    // console.log(this.friend)
    this.authenticationService.getStatus()
      .subscribe((session) => this.userService.getUserById(session.uid).valueChanges()
        .subscribe((user: User) => {
          this.user = user
          this.userService.getUserById(this.friendId).valueChanges()
            .subscribe((data: User) => {
              this.friend = data
              const idn = [this.user.uid, this.friend.uid].sort();
              this.conversation_id = idn.join('|')
              this.getConversation();
            }, (error) => { console.log(error) })
        }))
  }


  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text',
    }
    this.conversationService.createConversation(message);
    this.textMessage = '';
  }

  sendZumbido() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido',
    }
    this.conversationService.createConversation(message);
    this.doZumbido();
  }
  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 2000)
  }

  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe(
      (data) => {
        this.conversation = data;
        this.conversation.forEach((message) => {
          if (!message.seen) {
            message.seen = true;
            this.conversationService.editConversation(message);
            if (message.type == 'text') {
              // para reproducir el audio
              const audio = new Audio('assets/sound/new_message.m4a');
              // console.log(audio)
              audio.play();
            } else if(message.type == 'zumbido'){
              this.doZumbido();
            }

          }
        })
        console.log(data)
      },
      (error) => {
        console.log(error)
      }
    )
  }
  // editConversation(conversation) {
  //   this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe(
  //     (data) => {
  //       this.conversation = data
  //       console.log(data)
  //     },
  //     (error) => {
  //       console.log(error)
  //     }
  //   )
  // }

  getUserNickById(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick
    }
  }

}
