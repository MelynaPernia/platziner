import { Component, OnInit } from '@angular/core';
import { User } from '../../../node_modules/firebase';
import { UserService } from '../services/user.service';
import { AuthentificationService } from '../services/authentification.service';
import { ImageCroppedEvent } from '../../../node_modules/ngx-image-cropper';
import { FirebaseStorage } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  pictures: any;
  constructor(private userService: UserService,
    private authentificationService: AuthentificationService,
    private firebaseStorage: AngularFireStorage) {
    this.authentificationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe(
        (data: User) => {
          this.user = data
          console.log('usuario', this.user)
        },
        (error) => { console.log(error) }
      )
    }, (error) => { console.log(error) })
  }

  ngOnInit() {
  }
  saveSettings() {
    if (this.croppedImage) {
      const currentPictureId= Date.now();
      const pictures = this.firebaseStorage
        .ref('pictures/' + currentPictureId + '.jpg')
        .putString(this.croppedImage, 'data_url');

      pictures.then((result) => {

          this.pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();

          this.pictures.subscribe((p) => {
            console.log(this.user.uid)
            this.userService.setAvatar(p, this.user.uid)
              .then(() => {
                alert('Avatar subido correctamente')
              })
              .catch((error) => {
                alert('Hubo un error al subir la foto')
                console.log(error)
              })
          });
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      this.userService.editUser(this.user).then(() =>
        alert('cambios guardados')
      ).catch((error) => {
        alert('Hubo un error');
        console.log(error)
      })
    }

  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

}
