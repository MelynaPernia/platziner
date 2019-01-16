import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDataBase: AngularFireDatabase) { }
  createConversation(conversation){
    return this.angularFireDataBase.object('conversations/' + conversation.uid+'/'+conversation.timesLamp).set(conversation)

  }
  getConversation(uid){
    return this.angularFireDataBase.list('conversations/'+uid);
  }
}
