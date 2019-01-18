import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  //Inyectamos el FireBaseData
  constructor(private angularFireDataBase: AngularFireDatabase) { }

  createConversation(conversation) {
    // Insertando dentro de firebase
    return this.angularFireDataBase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation)
  }

  getConversation(uid) {
    // console.log(uid)
    return this.angularFireDataBase.list('conversations/' + uid);
  }
  editConversation(conversation) {
    return this.angularFireDataBase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation)
  }
}
