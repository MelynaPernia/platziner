import { Injectable } from '@angular/core';
import { User } from '../interfaces/user'
import { AngularFireDatabase } from '../../../node_modules/@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends: User[];
  // Inyectando el angular Fire DataBase
  // DataBaseModule es para inyectar en el .module
  // Database es para hacer la conexion
  constructor(private angularFireDataBase: AngularFireDatabase) {


    // this.friends = [myUser1, myUser2, myUser3, myUser4]
  }

  getUsers() {
    return this.angularFireDataBase.list('/users');
  }
  getUserById(uid) {
    return this.angularFireDataBase.object('/users/' + uid)
  }
  createUser(user) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }
  editUser(user) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }
  getFriends() {
    return this.friends;
  }
  //metodo q se encarga de gusradar la propiedad
  setAvatar(avatar, uid) {
    return this.angularFireDataBase.object('/users/' + uid + '/avatar').set(avatar)
  }
}

