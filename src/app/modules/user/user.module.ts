import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserService } from './services/user.service';
import { UserProfileImagesComponent } from './components/user-profile-images/user-profile-images.component';
import { UserProfileFavouritesComponent } from './components/user-profile-favourites/user-profile-favourites.component';
import { UserProfileFollowsComponent } from './components/user-profile-follows/user-profile-follows.component';
import { PhotoViewModalModule } from '../photo-view-modal/photo-view-modal.module';
import { UploadPhotosModalModule } from '../upload-photos-modal/upload-photos-modal.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileImagesComponent,
    UserProfileFavouritesComponent,
    UserProfileFollowsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PhotoViewModalModule,
    UploadPhotosModalModule
  ],
  providers: [UserService]
})
export class UserModule { }
