import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularDatabase: AngularFireDatabase) { }
  createRequest(request) {

    const cleanEmail = request.reciver_email.replace('.', ',')
    return this.angularDatabase.object('requests/' + cleanEmail + '/' + request.sender).set(request)
  }

  setRequestStatus(request, status) {
    const cleanEmail = request.reciver_email.replace('.', ',')
    return this.angularDatabase.object('requests/' + cleanEmail + '/' + request.sender + '/status').set(status)
  }
  getRequestForEmail(email) {
    const cleanEmail = email.replace('.', ',')
    return this.angularDatabase.list('requests/' + cleanEmail)
  }
}
